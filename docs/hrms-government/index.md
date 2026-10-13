---
title: Government & Statutory Compliance Portal - Overview
description: Complete user manual, regulatory frameworks, statutory registers, inspection workflows, and compliance auditing in Hub HRMS.
---

# 🏛️ Government & Statutory Compliance Portal

The **Government & Statutory Compliance Portal** (`/government/*`) is the regulatory audit and labor compliance workspace in Hub HRMS. Designed for compliance officers, legal counsels, statutory auditors, and labor department inspectors, this portal guarantees 100% adherence to labor laws, wage standards, social security remissions (PF, ESI), working hour limits, and equal opportunity regulations.

---

## 🏛️ Live Interface Overview

Below is the live console layout of the **Government & Statutory Compliance Console**:

![Government & Statutory Compliance Console Overview](../assets/images/HRMS/Government_/dashboard.png)

---

## 🎯 Role Purpose & Regulatory Mandate

The Government Compliance Auditor role provides read-and-verify authority over workforce records, wage registers, statutory deposits, and workplace safety compliance without modifying operational data:

* **Social Security & Statutory Levies**: Verifying electronic challan filings for Employee Provident Fund (EPF), Employee State Insurance (ESIC), and State Professional Tax (PT).
* **Statutory Labor Registers**: Instant export of government-mandated registers (Form A - Employee Register, Form B - Wage Register, Form D - Attendance Register).
* **Working Hour & Overtime Audits**: Ensuring shifts comply with maximum continuous working hours, mandatory rest intervals, and overtime compensation caps.
* **Contract Labor & Equal Opportunity**: Validating licenses for contract labor agencies, minimum wage compliance, and gender pay equality.

```mermaid
flowchart TD
    GOV["🏛️ Government & Compliance Portal<br/><code>/government</code>"]

    subgraph Mandate["⚖️ Regulatory Compliance & Audit<br/>Scope"]
        direction TB

        subgraph Registers["📋 1. Registers & Attendance Audit"]
            direction TB
            G1["📊 Compliance Command Dashboard<br/>Real-time score & inspection<br/>alerts"]
            G2["📋 Statutory Labor Registers<br/>Form A master & min-wage check"]
            G3["📍 Geofenced Attendance Audit<br/>GPS map & overtime limit checks"]
        end

        subgraph Filings["📜 2. Filings & Regulatory Desk"]
            direction TB
            G4["📋 Compliance Task Pipeline<br/>Statutory filings & annual returns"]
            G5["📜 Challan Vault & Forms<br/>EPF ECR, ESIC returns, Form 25"]
            G6["📢 Official Regulatory Desk<br/>Department inquiries & notices"]
        end

        subgraph Credentials["🛡️ 3. Support & Auditor Security"]
            direction TB
            G7["🎧 Audit Dispute Resolution<br/>Compliance escalations & tickets"]
            G8["🛡️ Auditor Digital Credentials<br/>Digital certificates & 2FA"]
        end
    end

    GOV --> Registers
    GOV --> Filings
    GOV --> Credentials
```

---

## 🧭 Statutory Audit & Inspection Workflow

When government labor inspectors or statutory auditors conduct quarterly or annual reviews, Hub HRMS simplifies verification into a transparent four-stage audit flow:

```mermaid
flowchart TD
    subgraph Stage1["1. Inspection Initiation"]
        direction TB
        I1["Auditor Access Authorization &<br/>Scope Verification"]
        I2["Select Audit Period<br/>(Quarter / Fiscal Year)"]
        I1 --> I2
    end

    subgraph Stage2["2. Automated Register Verification"]
        direction TB
        V1["Validate Form A<br/>Employee Census & Identity"]
        V2["Audit Form B<br/>Wage & Minimum Wage Slabs"]
        V3["Cross-Check Form D<br/>Attendance & Overtime Punches"]
        V1 --> V2 --> V3
    end

    subgraph Stage3["3. Challan & Statutory Reconciliation"]
        direction TB
        C1["Reconcile EPF ECR<br/>Electronic Challan Receipts"]
        C2["Match ESIC Receipts<br/>Monthly contribution filings"]
        C3["Verify Tax Filings<br/>State PT & TDS deductions"]
        C1 --> C2 --> C3
    end

    subgraph Stage4["4. Compliance Certification & Report"]
        direction TB
        R1["Generate Compliance Scorecard<br/>99.8% Compliant index"]
        R2["Digitally Sign Certificate<br/>Official audit attestation"]
        R3["Archive Inspection Dossier<br/>Store in Compliance Vault"]
        R1 --> R2 --> R3
    end

    I2 --> V1
    V3 --> C1
    C3 --> R1
```

---

## 🗂️ Compliance Portal Navigation Directory

| Module # | Chapter Title | Route Path | Core Regulatory Function |
| :--- | :--- | :--- | :--- |
| **01** | [Compliance Dashboard](dashboard.md) | `/government/dashboard` | Executive compliance index, active audit calendar, overdue filings, and regulatory risk heatmaps. |
| **02** | [Statutory Staff Register](staff.md) | `/government/staff` | Government Form A registers, contractor licenses, minimum wage classifications, and diversity metrics. |
| **03** | [Attendance & Field Audit Map](attendance.md) | `/government/attendance` | Geofenced inspector map, biometric punch auditing, rest day verification, and overtime caps. |
| **04** | [Compliance Task Pipeline](tasks.md) | `/government/tasks` | Regulatory deadlines, audit remediation tasks, filing pipelines, and legal notice closures. |
| **05** | [Statutory Filings & Challans](compliance.md) | `/government/compliance` | Monthly EPF ECR, ESIC receipts, Factories Act Form 25, annual bonus returns, and Gratuity records. |
| **06** | [Official Notices & Liaison](messages.md) | `/government/messages` | Statutory communications, government notice responses, and auditor messaging channels. |
| **07** | [Audit Support & Disputes](support.md) | `/government/support` | Legal counsel advisory requests, inspection dispute resolution, and audit clarifications. |
| **08** | [Auditor Credentials & Settings](profile.md) | `/government/profile` | Digital Signature Certificate (DSC) setup, statutory auditor credentials, and security controls. |
