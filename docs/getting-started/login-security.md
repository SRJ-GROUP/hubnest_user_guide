---
title: Login and Account Security
description: Comprehensive security guide covering Single Sign-On, MFA/2FA setup, session security, password recovery, and troubleshooting authentication.
---

# Login & Account Security

HubNest incorporates enterprise-grade identity controls powered by Keycloak Central IAM, ensuring strict data privacy, tokenized sessions, and protection against unauthorized account access.

---

## 1. Login Procedure

### Standard Email & Password Authentication
1. Launch **HubNest OS** or visit [srjhubnest.com](https://srjhubnest.com).
2. Enter your registered corporate email and password.
3. Click **Sign In**.
4. If Multi-Factor Authentication (MFA) is enabled on your organization, enter the 6-digit TOTP code from your authenticator app.

---

## 2. Multi-Factor Authentication (MFA / 2FA)

MFA adds an essential second layer of protection to your corporate credentials.

### Enabling MFA on Your Account
1. Go to **My Profile** ➔ **Security Settings**.
2. Under **Two-Factor Authentication (2FA)**, click **Enable MFA**.
3. Open an authenticator application on your smartphone (Google Authenticator, Microsoft Authenticator, or Authy).
4. Scan the QR code displayed on the screen.
5. Enter the 6-digit code shown in your app to confirm pairing.
6. **Download Recovery Codes**: Save your emergency one-time recovery codes in a secure password manager.

!!! warning "Mandatory MFA Enforcement"
    Organization administrators can enforce mandatory 2FA across all company accounts. When enabled, users without 2FA will be prompted to set it up before accessing CRM or HRMS data.

---

## 3. Password Reset & Account Recovery

If you lose or forget your password:

1. On the login screen, click **Forgot Password?**.
2. Enter your registered email address and click **Send Recovery Email**.
3. Check your inbox for the password reset email from `auth@srjhubnest.com`.
4. Click the secure link (valid for 15 minutes).
5. Enter a new password matching company complexity rules:
   * Minimum 8 characters.
   * At least one uppercase letter (`A-Z`).
   * At least one numeric digit (`0-9`).
   * At least one special symbol (`!@#$%^&*`).
6. Click **Confirm Reset**. All existing active sessions on other devices will be automatically invalidated.

---

## 4. Session Security & Auto-Logout

HubNest OS employs short-lived, encrypted access tokens and cryptographic refresh rotation:

* **Inactivity Timeout**: Sessions automatically lock after 30 minutes of inactivity to protect workstations in shared environments.
* **Remote Session Invalidation**: If you suspect your account has been compromised, navigate to **My Profile** ➔ **Active Sessions** and click **Log Out of All Devices**.
* **Device Fingerprinting**: Login attempts from unrecognized IP addresses or geographical locations trigger instant email verification alerts.

---

## 5. Common Authentication Issues & Solutions

| Error Message | Probable Cause | Recommended Action |
| :--- | :--- | :--- |
| **"Invalid username or password"** | Typo in email or incorrect password. | Verify Caps Lock is off; use the **Forgot Password?** link to reset. |
| **"Account is inactive or suspended"** | Administrator has disabled access or subscription lapsed. | Contact your internal HubNest company administrator to verify account status. |
| **"Invalid 2FA Code"** | Clock desynchronization on mobile device. | Go to your phone settings and ensure date & time are set to **Automatic (Network Time)**. |
| **"Session Expired (401)"** | Access token exceeded validity window. | Click **Log In Again** to refresh your session tokens. |
