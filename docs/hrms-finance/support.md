---
title: Finance Technical Support & Banking Coordination
description: Complete user guide for Finance Officers to raise banking support tickets, report payroll calculation discrepancies, and coordinate IT assistance in Hub HRMS.
---

# 11. Finance Support Desk (`/finance/support`)

The **Finance Support Desk** is the specialized technical assistance portal for finance officers to report banking portal integration issues, payroll formula questions, and ERP synchronization tickets.

---

## 🏛️ Live Interface Overview

Below is the live console layout of the **Finance Support & Ticket Management** desk:

![Finance Technical Support Desk](../assets/images/HRMS/Finance_/support.png)

---

## 🗂️ Support Views & Ticket Actions

The `/finance/support` portal provides finance officers with focused channels to track operational issues:

* **Support Tickets Tab**: Displays all operational tickets raised by the finance team with real-time status badges (e.g., `MEDIUM`, `URGENT`), creation date, and assignee details.
* **Reported Errors Tab**: Dedicated view for technical error logs and batch processing failures.
* **+ New Ticket Button**: Quick modal trigger allowing finance officers to submit priority tickets directly to technical support with attachments and description.

---

## 🧭 Support Ticket Resolution Flow

The flowchart below demonstrates the progression of a financial technical support ticket:

```mermaid
graph TB
    subgraph IssueReport["1. Ticket Submission"]
        direction TB
        T1["Bank Disbursal File Rejection /<br/>Format Mismatch"]
        T2["Tax Deduction Calculation Query"]
        T3["Payment Gateway / Ledger<br/>Synchronization Stoppage"]
    end

    subgraph SupportTriage["2. Technical Triage & Escalation"]
        direction TB
        L1["Finance Officer Submits Ticket<br/>with Error Log"]
        L2{"Determine Priority"}
        L2 -- "Payroll Day Blocker" --> P1["🚨 Priority 1 - Immediate<br/>Resolution (< 1h)"]
        L2 -- "Standard Query" --> P2["🔵 Priority 2 - Standard Support (<<br/>12h)"]
    end

    subgraph Resolution["3. Resolution & Fix Verification"]
        direction TB
        R1["Banking Specialist / Engineer<br/>Deploys Fix"]
        R2["Finance Officer Re-runs Batch &<br/>Validates"]
        R3["Ticket Verified & Closed"]
    end

    IssueReport --> SupportTriage
    P1 --> Resolution
    P2 --> Resolution
```

---

## 🎟️ Common Finance Support Categories

* **Bank Payout File Format Mismatch:** Issues with bank-specific NEFT/RTGS batch file layouts.
* **Tax Bracket & Surcharge Updates:** Updating statutory tax percentage changes announced in national budgets.
* **Accounting Software Sync:** Troubleshooting ledger exports to QuickBooks, Tally, or SAP.

---

## 💡 Best Practices

> [!TIP]
> **Attach Bank Error Files:** When opening a ticket for rejected bank payment files, attach the encrypted response file received from the banking portal so the technical team can instantly identify the rejected column.
