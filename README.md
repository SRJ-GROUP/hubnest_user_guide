# HubNest User Guide

Official Markdown-based user guide and documentation portal for the **HubNest** enterprise platform, built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

---

## 🛠️ Local Development & Preview

### 1. Prerequisites
Ensure you have Python 3.9+ installed.

### 2. Setup Virtual Environment & Install Dependencies
```bash
# Navigate to the user_guide folder
cd user_guide

# (Optional) Create virtual environment
python -m venv .venv
# Activate on Windows:
.venv\Scripts\activate

# Install required packages
pip install -r requirements.txt
```

### 3. Run Live Preview Server
```bash
mkdocs serve
```
Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser. Any edits in the `docs/` folder will automatically hot-reload.

### 4. Build Production HTML Site
```bash
mkdocs build
```
The static site output will be generated inside the `site/` folder, ready for deployment to Cloudflare Pages, AWS S3, or Nginx.

---

## 📁 Repository Structure
```text
user_guide/
├── mkdocs.yml          # Core Material for MkDocs configuration
├── requirements.txt    # Python dependencies
├── .gitignore          # Git ignore rules
└── docs/               # Markdown content files
    ├── index.md        # Home landing page
    ├── getting-started/
    ├── desktop/
    ├── hubmeet/
    ├── hubcrm/
    ├── hrms/
    ├── calling/
    ├── notification/
    ├── billing/
    └── help/
```
