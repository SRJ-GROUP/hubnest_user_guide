---
title: Common Setup Problems & Troubleshooting
description: Diagnostic steps for resolving login failures, microphone/camera permission errors, invitation problems, and network blocks.
---

# Common Setup Problems & Troubleshooting

This guide provides troubleshooting solutions for common errors encountered during initial setup and daily operations in HubNest.

---

## 1. Camera & Microphone Not Working in HubMeet

### Symptoms
* Video preview shows a black screen or a crossed-out camera icon.
* Participants cannot hear your voice in a meeting.
* Error message: *"Media device permission denied"* or *"Cannot access microphone"*.

### Resolution Steps
1. **Windows OS Permissions**:
   * Open Windows **Settings** (`Win + I`) ➔ **Privacy & security** ➔ **Microphone**.
   * Ensure **Microphone access** is turned **ON**.
   * Under **Let desktop apps access your microphone**, verify that **HubNest OS** is allowed.
   * Repeat the exact same verification under the **Camera** privacy tab.
2. **Device Selection in HubMeet**:
   * In the active meeting room, click the **Settings Cog** icon in the bottom control bar.
   * Check the **Microphone** and **Camera** dropdowns to ensure your active headset or webcam is selected, rather than a disabled virtual device.
3. **Restart HubNest OS**:
   * Right-click the HubNest icon in the Windows taskbar tray and click **Quit HubNest OS**.
   * Re-launch the desktop app.

---

## 2. "Not Entitled to Access This Hub" (403 Forbidden)

### Symptoms
* Clicking CRM, HRMS, or Calling Hub displays an access denied screen: *"Not entitled to access this hub"*.

### Cause
Your organization administrator has not assigned a license or role for this specific hub to your account.

### Resolution
1. Contact your company's HubNest Administrator.
2. Have the administrator navigate to **Admin Console** ➔ **Team Management** ➔ **Edit Role**.
3. Check the checkbox for the target hub and click **Save Permissions**.
4. Log out of HubNest OS and log back in to refresh your granted Single Sign-On entitlements.

---

## 3. Team Member Did Not Receive Invitation Email

### Symptoms
* You sent an invitation to an employee, but they report receiving nothing in their inbox.

### Resolution Steps
1. **Check Spam / Junk Folder**: Ask the user to search their spam or junk folder for `no-reply@srjhubnest.com`.
2. **Verify Corporate Firewall / Spam Filters**: In some enterprises, aggressive email gateways block automated invites. Add `srjhubnest.com` to the organization's email allowlist.
3. **Resend Invitation**:
   * Go to **Admin Console** ➔ **Team Management**.
   * Find the user in the pending roster and click **Resend Invite**.

---

## 4. WebView2 Runtime Error on Windows

### Symptoms
* HubNest OS opens with a blank white window, or displays an alert: *"Microsoft Edge WebView2 Runtime is required"*.

### Resolution Steps
HubNest OS relies on the Microsoft Edge WebView2 runtime to render hub web views securely:
1. Windows 10/11 usually includes WebView2 by default. If corrupted or missing, visit the official Microsoft portal: [developer.microsoft.com/en-us/microsoft-edge/webview2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/).
2. Download and run the **Evergreen Bootstrapper**.
3. Restart HubNest OS.

---

## 5. Escalation & Contacting Technical Support

If your issue persists after attempting the diagnostic steps above, escalate the problem to our enterprise support desk:

* 📧 **Email**: `support@srjhubnest.com` (Include a screenshot of the error, user email, and time of occurrence).
* 📞 **Direct Phone Helpline**: `+918031830008`
* ⏰ **Operating Hours**: Monday to Saturday, 10:00 AM to 7:00 PM IST
* 🛠️ **Diagnostics Export**: In HubNest OS, open **Help** ➔ **Export Support Diagnostics** to generate a sanitized log bundle for our engineering team.
