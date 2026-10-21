import os
from pathlib import Path
import pypdf

OUTPUT_DIR = Path("d:/hubnest/user_guide/generated_pdfs").resolve()
MASTER_PDF = OUTPUT_DIR / "HubNest_Complete_Enterprise_User_Guide.pdf"

module_files = [
    ("1. HubNest Platform & Enterprise Master Administration", OUTPUT_DIR / "01_HubNest_Platform_Super_Admin_Guide.pdf"),
    ("2. HubHRMS Complete Suite (7 Roles)", OUTPUT_DIR / "02_HubNest_HubHRMS_User_Guide.pdf"),
    ("3. HubCRM Enterprise Suite (7 Roles)", OUTPUT_DIR / "03_HubNest_HubCRM_User_Guide.pdf"),
    ("4. HubNotification Omnichannel Suite (6 Roles)", OUTPUT_DIR / "04_HubNest_HubNotification_User_Guide.pdf"),
    ("5. Calling Hub VoIP & Telephony Suite (4 Roles)", OUTPUT_DIR / "05_HubNest_CallingHub_User_Guide.pdf"),
    ("6. HubMeet Video Conferencing Suite (4 Roles)", OUTPUT_DIR / "06_HubNest_HubMeet_User_Guide.pdf"),
    ("7. HubNest OS Desktop App & IT Administration", OUTPUT_DIR / "07_HubNest_Desktop_App_User_Guide.pdf"),
]

def main():
    print("Merging 7 Module PDFs into Master Enterprise Combined User Guide...")
    merger = pypdf.PdfWriter()

    for title, path in module_files:
        if not path.exists():
            print(f"ERROR: {path} not found!")
            continue
        print(f"Adding {title} ({path.name})...")
        merger.append(str(path), outline_item=title)

    print(f"Writing {MASTER_PDF.name} to disk...")
    with open(MASTER_PDF, "wb") as f_out:
        merger.write(f_out)
    merger.close()

    reader = pypdf.PdfReader(str(MASTER_PDF))
    size_mb = MASTER_PDF.stat().st_size / (1024 * 1024)
    print(f"Successfully generated Master Guide: {len(reader.pages)} pages, {size_mb:.2f} MB!")

if __name__ == "__main__":
    main()
