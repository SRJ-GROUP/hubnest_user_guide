---
title: Supervisor Profile, Banking & Security Settings
description: Comprehensive user guide for Operations Supervisors to update personal credentials, configure dual bank accounts for payroll, upload records to the Document Vault, manage 2FA security, and review RBAC boundaries in Hub HRMS.
---

# 10. Supervisor Profile & Settings (`/supervisor/profile`)

The **Supervisor Profile & Settings** console manages personal identification, official contact numbers, dual bank account disbursement preferences, secure cloud credential storage via the **Document Vault**, and two-factor authentication (2FA). Additionally, it transparently displays the **Supervisor Permission Summary (RBAC)** charter, clarifying frontline authority boundaries within Hub HRMS.

---

## 🏛️ Live Interface Overview

Below is the live console layout of the **Supervisor Profile & Settings** workspace:

<!-- UI SCREENSHOT PLACEHOLDER: supervisor_profile.png (Width 100%) - To be added at the end -->
> 📸 **[UI Screenshot: Supervisor Profile, Banking & Security Console]**  
> *Target Asset Location:* `docs/assets/images/HRMS/Supervisor_/profile.png`  
> *(To be added at the end with live screenshots)*

---

## 🧭 Page Anatomy & Interactive Controls

The table below catalogs every button, input field, modal, and security toggle available on the Supervisor Profile page:

| UI Component / Control | Visual Location | Functional Behavior & Impact |
| :--- | :--- | :--- |
| **Profile Photo Upload Hover** | Top Header Avatar | Hovering reveals an edit pencil overlay; clicking opens a local image selector to update your avatar. Syncs immediately across headers and chat. |
| **Supervisor Role & RBAC Badge** | Top Header Center | Displays employee name, role title (`Supervisor`), employee ID, department, and the amber `Read + Monitor` authority badge. |
| **Personal Info Edit Button** | Personal Information Card Top Right | Toggles personal fields into editable text inputs (**Full Name**, **Mobile Number**, **Employee ID**). Read-only fields include Email, Department, and Role. |
| **Save / Cancel Personal Details** | Personal Information Card Top Right | Validates and dispatches sanitized updates to the backend with instantaneous session synchronization. |
| **Banking Info Edit Button** | Banking & Payroll Info Card Top Right | Toggles banking fields into editable text inputs for dual bank configuration. |
| **Bank Account 1 & 2 Cards** | Banking & Payroll Section | Dual accounts supporting: Account Holder Name, Bank Name, Account Number, IFSC Code, and primary UPI ID (`yourname@upi`). |
| **Set Primary Bank Button** | Bank Account Card Header | Allows supervisor to designate either Bank Account 1 or Bank Account 2 as the active disbursement target for salary credits (`PRIMARY` green badge). |
| **Document Vault Trigger** | Document Vault Card Top Right | File upload trigger accepting PDF, DOC, DOCX, and image formats. Uploads official identity records or certifications to secure cloud storage. |
| **Document Download Links** | Document Vault List | Lists uploaded files with category tags (e.g., *Supervisor Document*) and a direct **Download** icon trigger. |
| **Language Setting Dropdown** | Security Settings (Row 1) | Multi-language localization selector: English (`en`), Spanish (`es`), French (`fr`), German (`de`), Hindi (`hi`), Arabic (`ar`), Chinese (`zh`), Portuguese (`pt`). |
| **Profile Visibility Dropdown** | Security Settings (Row 2) | Privacy toggle allowing selection between `Public (Everyone)` and `Private (Team Only)`. |
| **Two-Factor Authentication (2FA)** | Security Settings (Row 3) | Interactive pill toggle: switches between `Disabled (Click to Enable)` and emerald `Enabled` via OTP verification. |
| **Change Password Accordion** | Security Settings (Row 4) | Expands the secure credential form requiring **Current Password**, **New Password**, and **Confirm New Password**. |
| **Privacy Policy & Terms Button** | Security Settings (Row 5) | Opens the **HubNest Data Privacy Policy Modal** detailing employee data protection, biometric photo retention limits, and transit encryption. |
| **Permission Summary Card** | Bottom Card | High-visibility RBAC matrix displaying green checkmarks (`✓`) for authorized tasks and lock icons (`🔒`) for restricted operations. |

---

## 🛡️ Supervisor Role-Based Permissions (RBAC Matrix)

Hub HRMS explicitly details operational limits directly inside the profile workspace:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      SUPERVISOR PERMISSION SUMMARY                     │
├─────────────────────────────────────────────────┬──────────────────────┤
│ Operational Capability                          │ Authorization Status │
├─────────────────────────────────────────────────┼──────────────────────┤
│ Edit Own Profile & Banking Details              │  ✓ AUTHORIZED        │
│ Approve Team Leave Requests                     │  ✓ AUTHORIZED        │
│ Monitor Team Attendance & Shifts                │  ✓ AUTHORIZED        │
│ View & Track Team Tasks                         │  ✓ AUTHORIZED        │
│ Change Enterprise System Settings               │  🔒 RESTRICTED       │
│ Create or Manage Other Supervisors              │  🔒 RESTRICTED       │
│ View Executive Company-Wide Reports             │  🔒 RESTRICTED       │
└─────────────────────────────────────────────────┴──────────────────────┘
```

---

## ⚙️ Step-by-Step Configuration Workflows

### 1. Updating Personal Contact Details
1. Navigate to **Supervisor Portal > Profile** (`/supervisor/profile`).
2. In the **Personal Information** card, click the **Edit** button.
3. Update your **Full Name**, **Mobile Number**, or **Employee ID**.
4. Click **Save**. Your profile updates immediately and syncs with your active session.

### 2. Configuring Dual Bank Accounts for Payroll
Hub HRMS allows supervisors to maintain two verified bank accounts with flexible primary disbursement routing:
1. In the **Banking & Payroll Info** card, click **Edit**.
2. Under **Bank Account 1**, enter:
   - Account Holder Name (as per bank passbook)
   - Bank Name (e.g., *HDFC Bank*)
   - Account Number & IFSC Code
   - Primary UPI ID (e.g., *ayush@okhdfcbank*)
3. Under **Bank Account 2**, enter secondary backup banking details (e.g., *ICICI Bank*).
4. Click **Set Primary** on the specific account you want payroll funds deposited into.
5. Click **Save** to lock in your payout routing.

### 3. Uploading Records to the Document Vault
1. Scroll down to the **Document Vault** section.
2. Click the **Upload Document** trigger.
3. Select your document file (PDF, DOC, DOCX, or JPG/PNG up to 25 MB).
4. The system securely encrypts and stores the file in cloud storage, listing it in your vault with a download trigger.

### 4. Updating Security Credentials & 2FA
1. To change your login password:
   - In **Security Settings**, click **Update** next to *Change Password*.
   - Enter your **Current Password**, followed by your **New Password** and confirmation.
   - Click **Save Password**.
2. To enable Two-Factor Authentication:
   - Click the 2FA pill toggle (`Disabled (Click to Enable)`).
   - Once confirmed, the badge turns emerald green displaying `Enabled`.

---

## 💡 Best Practices for Supervisors

> [!TIP] **Keep IFSC Codes Valid**  
> Ensure your IFSC code matches the exact branch code shown on your bank statement. Invalid IFSC formats will cause payroll processing failures during monthly bank reconciliation.

> [!IMPORTANT] **Requesting Elevated Privileges**  
> If your operational duties require cross-departmental reporting, creating supervisors, or adjusting shift policy templates, contact your Department Manager or HR Admin to upgrade your role to **Manager**.

---

## ❓ Frequently Asked Questions (FAQs)

??? question "Can I change my official email address or department from this page?"
    No. Official email addresses and department designations are managed by HR Administration to maintain organizational data integrity. If your email or department changes, contact HR via the Help & Support desk.

??? question "Are documents uploaded to the Document Vault visible to team members?"
    No. The Document Vault is strictly confidential. Only you and authorized HR administrators possess cryptographic permissions to download and view your vault files.
