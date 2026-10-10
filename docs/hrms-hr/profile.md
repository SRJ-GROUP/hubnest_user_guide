---
title: HR Profile, Security & Administrative Preferences
description: Managing HR administrative profile credentials, two-factor authentication, notification preferences, and approval delegation.
---

# 13. HR Profile & Settings (`/hr/profile`)

The **HR Profile & Settings** module allows HR Specialists and HR Directors to manage their personal administrator profile, update system security credentials, configure multi-channel notification preferences, and manage pending approval queues.

---

## 📸 Interface Screenshot

<!-- SCREENSHOT_PLACEHOLDER: /hr/profile -->
> *[Screenshot Placeholder: HR Administrative Profile & Settings]*

---

## 🧭 Navigation Workspaces

### 1. 👤 `Personal Profile`
* **Administrative Details**:
  * Profile avatar image upload with real-time crop and preview.
  * Full Legal Name, Official Designation (`HR Specialist` / `HR Director`), Corporate Email, and Direct Extension.
  * Employee ID (`EMP-XXXX`) and assigned primary branch location.
* **Localization & Language**:
  * Set primary interface language (`English`, `Hindi`, etc.).
  * Synchronized with corporate time zones and standard date formats (`DD-MM-YYYY`).

---

### 2. 📋 `Pending Approvals Hub`
Centralized queue summarizing administrative actions requiring immediate sign-off by this HR user:
* **Pending Leave Requests**: Counter and direct review shortcuts for employee time-off requests.
* **Pending Candidate Offers**: Candidate offers awaiting final compensation review and dispatch.
* **Pending Expense Claims**: Submitted employee expense vouchers requiring review.

---

### 3. 🔐 `Account Security & Credentials`
Maintain enterprise account security:
* **Password Revision Modal**:
  * Input current system password.
  * Specify new password complying with security complexity standards (minimum 8 characters, alphanumeric with uppercase and special symbols).
* **Two-Factor Authentication (2FA / MFA)**:
  * Enable time-based one-time password (TOTP) authentication using Google Authenticator, Microsoft Authenticator, or Authy.
* **Active Session Invalidation**:
  * View active browser and mobile device sessions with IP addresses and timestamps.
  * One-click **Sign Out All Other Sessions** to prevent unauthorized access.

---

### 4. 🔔 `Notification Preferences`
Control notification alerts across 3 distinct dispatch channels:
* **Email Notifications**: Toggle notifications for new leave applications, candidate interview acceptances, and monthly payroll completion.
* **In-App Push Alerts**: Real-time bell counter and audio ping notifications for urgent chat messages and critical compliance alerts.
* **SMS Notifications**: Automated SMS dispatch for urgent security alerts or MFA codes.

---

## ❓ Frequently Asked Questions (FAQ)

??? question "How do I delegate approval authority when going on vacation?"
    In **Account Settings**, click **Out-of-Office Delegation**, select a designated peer HR Specialist or Department Director, and set the start and end dates. All approval requests will route automatically to the delegate during this window.

??? question "How do I update my profile photo?"
    Hover over your avatar circle on the **Personal Profile** tab, click the camera icon, select a JPEG or PNG image from your computer, and save. The image will synchronize across company directories.
