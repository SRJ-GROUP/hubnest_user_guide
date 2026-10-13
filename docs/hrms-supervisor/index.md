---
title: Operations Supervisor Portal - Overview & Workflows
description: Comprehensive user manual, shift operational flows, crew coordination guidelines, and complete console walkthrough for Operations Supervisors in Hub HRMS.
---

# 🏭 Operations Supervisor Comprehensive Guide

The **Operations Supervisor Portal** (`/supervisor/*`) is the mission-critical operational command center designed specifically for frontline shift leads, department supervisors, and unit coordinators in Hub HRMS. Acting as the operational linchpin between senior department management and frontline execution, supervisors maintain real-time oversight over team headcount, biometric punch audits, rotational shift assignments, task distribution, leave adjudication, and team analytics.

---

## 🏛️ Live Interface Overview

Below is the live console layout of the **Operations Supervisor Command Console**:

![Operations Supervisor Command Console](../assets/images/HRMS/Supervisor_/dashboard.png)

---

## 🎯 Role Purpose & Operational Scope

An Operations Supervisor is responsible for ensuring continuous, safe, compliant, and productive operations across designated teams and production units:

* **Real-Time Staffing & Attendance**: Monitoring live clock-ins, verifying facial snapshots, geofence radius checks, and auditing physical terminal punches.
* **Shift Roster Management**: Administering multi-tier rotational shift templates, assigning custom employee overrides, and approving peer-to-peer shift swaps.
* **Team Task Distribution**: Assigning line tasks, tracking deliverable lifecycle stages across List, Kanban, and Calendar layouts, and reviewing deliverables in the Task Review Drawer.
* **Leave & Exception Adjudication**: Approving pending leave requests, enforcing mandatory rejection notes, and managing minimum shift coverage.
* **Department Analytics & Exports**: Evaluating team payroll spend, attendance rates, and task completion metrics, and exporting comprehensive reports in PDF, CSV, Excel, and Word.

```mermaid
flowchart TD
    SUP["🏭 Operations Supervisor Portal<br/><code>/supervisor</code>"]

    subgraph Scope["⚙️ Front-Line Operational Command<br/>Scope"]
        direction TB

        subgraph Crew["👥 1. Crew & Dashboard"]
            direction TB
            S1["📊 Real-Time Ops Dashboard<br/>8 KPI cards, queue & AI insights"]
            S2["👥 Crew & Team Management<br/>Team roster & member dossiers"]
        end

        subgraph Rosters["⏰ 2. Rosters & Timekeeping"]
            direction TB
            S3["🔄 Shift Rosters & Templates<br/>Day/Night shifts & swap approvals"]
            S4["⏰ Attendance & Punch Audit<br/>Biometric photo preview & geocode"]
            S6["🏖️ Shift Coverage Leaves<br/>Leave approvals & quota guards"]
        end

        subgraph TasksReports["📋 3. Tasks & Reporting"]
            direction TB
            S5["📋 Team Task Workspace<br/>Kanban, priority & review drawer"]
            S7["📈 Team Reports & Analytics<br/>Attendance & productivity charts"]
            S8["💬 Messaging & Profile<br/>E2EE chat, calls & bank settings"]
        end
    end

    SUP --> Crew
    SUP --> Rosters
    SUP --> TasksReports
```

---

## 🧭 Daily Operational Cycle of a Supervisor

A standard shift lifecycle for an Operations Supervisor consists of four structured operational milestones:

```mermaid
flowchart TD
    subgraph Phase1["1. Pre-Shift Readiness (T-30 Min)"]
        direction TB
        P1["Log into Supervisor Portal &<br/>Perform Self Check-In"]
        P2["Review Daily Shift Roster &<br/>Template Coverage"]
        P3["Verify Floor Readiness & Open Work<br/>Orders"]
        P1 --> P2 --> P3
    end

    subgraph Phase2["2. Shift Start & Roll Call (T+00 Min)"]
        direction TB
        R1["Audit Live Team Clock-Ins via<br/>Attendance Terminal"]
        R2["Inspect Reverse Geocoded Addresses<br/>& Webcams"]
        R3["Execute Standby Reassignments or<br/>Bulk Marking"]
        R1 --> R2 --> R3
    end

    subgraph Phase3["3. Mid-Shift Production Tracking"]
        direction TB
        M1["Monitor Task Kanban & Update<br/>Priority Bumpers"]
        M2["Adjudicate Pending Leave &<br/>Attendance Requests"]
        M3["Communicate via Encrypted Chat or<br/>Instant HubMeet"]
        M1 --> M2 --> M3
    end

    subgraph Phase4["4. Shift Close & Analytics (T+End)"]
        direction TB
        E1["Inspect Task Deliverables in Task<br/>Review Drawer"]
        E2["Audit Overtime & Weekly Attendance<br/>BarCharts"]
        E3["Export Executive Shift Report (PDF<br/>/ Excel / CSV / Word)"]
        E1 --> E2 --> E3
    end

    P3 --> R1
    R3 --> M1
    M3 --> E1
```

---

## 🗂️ Supervisor Portal Navigation Directory

| Module # | Chapter Title | Route Path | Core Operational Function |
| :--- | :--- | :--- | :--- |
| **01** | [Operations Dashboard](dashboard.md) | `/supervisor/dashboard` | Live floor staffing headcount, active shift status, urgent alerts, and operational KPIs. |
| **02** | [Crew & Team Management](team.md) | `/supervisor/team` | Worker profiles, station assignments, skill certifications, and team contact lists. |
| **03** | [Shift Rosters & Rotations](shifts.md) | `/supervisor/shifts` | Planning rotational rosters, multi-shift scheduling, and managing peer shift swaps. |
| **04** | [Attendance & Punch Verification](attendance.md) | `/supervisor/attendance` | Verifying biometric punches, approving missed clock-ins, and auditing overtime hours. |
| **05** | [Work Orders & Task Pipeline](tasks.md) | `/supervisor/tasks` | Floor assignment, pipeline stages, throughput tracking, and deliverable sign-offs. |
| **06** | [Shift Coverage Leave Approvals](leaves.md) | `/supervisor/leaves` | Evaluating time-off requests against minimum floor staffing requirements. |
| **07** | [Team Reports & Analytics](reports.md) | `/supervisor/reports` | Shift throughput metrics, machine downtime analysis, and digital shift logs. |
| **08** | [Real-Time Messages & Collaboration](messages.md) | `/supervisor/messages` | Instant shift announcements, team channels, and direct supervisor chat. |
| **09** | [Help & Support Desk](support.md) | `/supervisor/support` | Logging safety tickets, facilities issues, and machine maintenance requests. |
| **10** | [Supervisor Profile & Settings](profile.md) | `/supervisor/profile` | Personal account credentials, emergency contacts, and plant certifications. |

---

## 🔒 Supervisor Role-Based Permissions Summary (RBAC)

Hub HRMS explicitly enforces frontline authority boundaries for the Supervisor role:

| Operational Scope | Supervisor Authorization | Scope Boundaries & Governance |
| :--- | :--- | :--- |
| **Self Profile & Banking** | ✅ **Full Authority** | Edit personal contact details, configure primary/secondary bank accounts, manage 2FA. |
| **Team Roster & Dossiers** | ✅ **Authorized** | View team members, monitor skill efficiency, trigger Quick Add Employee within own department. |
| **Shift Management** | ✅ **Authorized** | Define shift templates (Day/Night), reassign daily rosters, approve/reject shift swaps. |
| **Attendance Verification** | ✅ **Authorized** | Review geofencing and photos, perform single/bulk manual marking, edit/delete logs. |
| **Task Pipeline** | ✅ **Authorized** | Create and assign team tasks, change Kanban states, review deliverables via drawer. |
| **Leave Adjudication** | ✅ **Authorized** | Approve pending team leaves, enforce mandatory rejection notes, inspect leave history. |
| **Department Reports** | ✅ **Authorized** | View team stats, analyze payroll distributions, export in PDF, CSV, Excel, and Word. |
| **Company Settings** | 🔒 **Restricted** | Modifying enterprise-wide configuration requires Manager or Admin privileges. |
| **Supervisor Creation** | 🔒 **Restricted** | Creating or provisioning new supervisors requires Department Manager authorization. |
| **Executive Reports** | 🔒 **Restricted** | Accessing company-wide balance sheets or bank payout files requires Finance/Admin roles. |
