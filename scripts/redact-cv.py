#!/usr/bin/env python3
"""Remove the private phone number from the downloadable CV PDF.

The number is private and must never be published, so it is not stored in
`data/nidhi-patel.json` (which is committed). Supply it at run time through
`PRIVATE_PHONE` instead. The PDF in `public/` was produced elsewhere from the
full CV, so this script rewrites the text object that draws the number, leaving
the rest of the document untouched. Re-run it whenever the CV is regenerated.

Usage:
    PRIVATE_PHONE='+49 …' /home/projekt-jain/anaconda3/bin/python -I scripts/redact-cv.py
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import DecodedStreamObject, NameObject

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "nidhi-patel.json"
PDF = ROOT / "public" / "Nidhi_Patel_CV.pdf"

# One absolute-positioned text block: outer q/Q wraps a cm offset and the
# inner text object. Removing the whole block removes the glyphs, so the
# number cannot be copied out of the file — unlike painting over it.
BLOCK = re.compile(
    rb"q\n1 0 0 1 [-0-9.]+ [-0-9.]+ cm\nq\nBT.*?ET\nQ\nQ\n", re.DOTALL
)


def main() -> int:
    data = json.loads(DATA.read_text(encoding="utf-8"))
    if data["contact"].get("phonePublic"):
        print("phonePublic is true — nothing to redact.")
        return 0
    phone = os.environ.get("PRIVATE_PHONE", "").strip()
    if not phone:
        print("PRIVATE_PHONE is not set — nothing to redact.")
        return 0

    number = phone.encode("ascii")
    reader = PdfReader(PDF)
    writer = PdfWriter()
    writer.append_pages_from_reader(reader)
    writer.add_metadata(reader.metadata or {})

    removed = 0
    for page in writer.pages:
        stream = page.get_contents().get_data()
        pieces, last = [], 0
        for match in BLOCK.finditer(stream):
            block = match.group(0)
            if number not in block:
                continue
            pieces.append(stream[last : match.start()])
            last = match.end()
            removed += 1
        if not pieces:
            continue
        pieces.append(stream[last:])
        replacement = DecodedStreamObject()
        replacement.set_data(b"".join(pieces))
        page[NameObject("/Contents")] = writer._add_object(replacement)

    if removed == 0:
        print("No text block drawing the number was found — nothing changed.")
        return 1

    writer.write(PDF)
    print(f"Removed {removed} text block(s) drawing {phone}.")

    # Confirm the bytes are gone everywhere, not just from the text layer.
    for page_no, page in enumerate(PdfReader(PDF).pages, 1):
        text = page.extract_text() or ""
        if phone in text or number.decode() in text:
            print(f"FAIL: number still extractable on page {page_no}")
            return 1
    raw = PDF.read_bytes()
    if number in raw:
        print("FAIL: number still present in the raw file bytes")
        return 1
    print("OK: number no longer appears in the PDF text layer or raw bytes.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
