---
title: Employee Management, Onboarding & Directory
description: Master employee master records, organizational hierarchy, digital onboarding (BGV & e-Sign), and employee lifecycle workflows in Hub HRMS.
---

# Employee Management, Onboarding & Directory

Managing your company's workforce in Hub HRMS is centered around the **Manage Employees** module (`/admin/employees`) and the searchable **Employee Directory** (`/admin/employees-list`). Every team member maintains a single, comprehensive digital record connecting attendance, leaves, payroll, assets, and performance evaluations.

---

## 👥 Live Manage Employees Interface

Below is the live production screen of the **Manage Employees** management console:

![HubHRMS Live Manage Employees Console](../assets/images/hrms_manage_employees.png){ width="100%" }

---

## 🗂️ Employee Master Record Anatomy

Each employee profile in Hub HRMS contains six synchronized operational sections:

```mermaid
graph TB
    Profile["👤 Employee Master Record"]

    subgraph S1["1. Identity & Employment"]
        direction TB
        Personal["Personal Info<br/>• Full Name<br/>• Work Email & Phone<br/>• Blood Group & Emergency"]
        Job["Employment Details<br/>• Employee ID<br/>• Date of Joining<br/>• Branch, Dept & Designation"]
        Manager["Reporting Hierarchy<br/>• Direct Manager<br/>• Department Head (HOD)"]
    end

    subgraph S2["2. Statutory & Banking Compliance"]
        direction TB
        Bank["Bank Account Details<br/>• Bank Name<br/>• Account Number<br/>• IFSC Code"]
        Tax["Statutory & Tax Records<br/>• PAN Card<br/>• UAN / PF Number<br/>• ESI Insurance Number"]
    end

    subgraph S3["3. Operational Attachments &<br/>Assets"]
        direction TB
        Docs["Digital Vault<br/>• Aadhaar / Govt ID<br/>• Educational Certificates<br/>• Signed NDA & Offer Letter"]
        Assets["Assigned Company Assets<br/>• Laptop Serial & Spec<br/>• External Monitor<br/>• Office Access Card"]
    end

    Profile --> S1
    Profile --> S2
    Profile --> S3
```

---

## ➕ Adding New Employees

Company Administrators and HR Specialists can add employees using two methods:

### 1. Manual Form Entry (`+ Add Employee`)
Click the **+ Add Employee** button in the top right to open the interactive creation modal:
1. **Basic Details**: Enter legal first name, last name, corporate email, and phone number.
2. **Organizational Placement**: Select Office Branch, Department, and Designation from your configured company dropdowns.
3. **Reporting Manager**: Assign a designated supervisor. This links their leave approval and attendance regularization workflows automatically.
4. **Compensation Tier**: Assign default salary structure (Basic, HRA, Allowances).
5. **Auto-Invite**: The system automatically dispatches an account activation invite via the SMTP notification engine with secure first-time login instructions.

### 2. Bulk Import via CSV / Excel (`Import Employees`)
For companies onboarding dozens or hundreds of employees at once:
* Download the standard **Hub HRMS Employee Import Template (.csv)**.
* Populate mandatory fields (`employee_id`, `first_name`, `last_name`, `email`, `department`, `designation`, `date_of_joining`).
* Upload the file. The batch processor validates emails, prevents duplicate entries, and provisions accounts in a single transaction.

---

## 🚀 Digital Onboarding, BGV & e-Sign (`/admin/onboarding`)

New hires complete digital onboarding through the self-service onboarding portal:

```mermaid
sequenceDiagram
    autonumber
    actor Candidate as New Hire
    participant Portal as Employee Onboarding (/employee/onboarding)
    participant BGV as Background Verification Engine
    participant Admin as HR / Company Admin (/admin/onboarding)

    Admin->>Candidate: Dispatches Digital Onboarding Checklist
    Candidate->>Portal: 1. Fills Emergency Contact & Statutory Bank/PF Details
    Candidate->>Portal: 2. Uploads Identity Proofs (PAN, Aadhaar/Passport, Degree)
    Candidate->>Portal: 3. Signs Employment Contract & NDA via Digital e-Sign
    Portal->>BGV: Initiates Automated Background Verification (BGV)
    BGV-->>Admin: Verification Report (Identity Match: PASS, Address: PASS)
    Admin->>Portal: Approves Onboarding & Activates Full Employee Status
```

* **Checklist Automation**: Track joining prerequisites (Laptop allocation, email generation, security badge creation).
* **Background Verification (BGV)**: Automated verification flags discrepancies in identity documents or past employment tenure.
* **Digital e-Sign**: Legally binding contract execution without paper printing or scanning.

---

## 🏛️ Searchable Employee Directory (`/admin/employees-list`)

The **Employee Directory** provides an interactive directory view accessible to administrators, managers, and staff:
* **Instant Filtering**: Search by name, department, designation, or branch location.
* **Live Status Badges**: Quickly see who is currently `Active`, `On Probation`, or `On Leave Today`.
* **Quick Actions**: One-click shortcuts to initiate a WebSocket chat message, view full profile, or send an email.

---

## 🚪 Offboarding & Exit Management

When an employee departs the organization:
1. **Notice Period Tracking**: Automated calculation of final working day based on company policy.
2. **Asset Recovery**: Generates a checklist of all assigned company property (laptops, keys, corporate cards) that must be returned to IT/Facilities.
3. **Full & Final Settlement (FnF)**: Automatically calculates unavailed leave encashment, pending reimbursements, and notice period adjustments before releasing final payslips.
4. **Access Revocation**: One-click account deactivation instantly terminates active sessions across the web portal, mobile apps, and desktop client.
