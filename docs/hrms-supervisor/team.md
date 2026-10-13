---
title: Supervisor Crew & Team Roster Management
description: Comprehensive user guide for the Supervisor Team Directory in Hub HRMS — 4 interactive KPI metric cards, AI crew performance analyzer, member dossier inspector, edit/delete actions, and department-level employee onboarding.
---

# 03. Crew & Team Roster (`/supervisor/team`)

The **Crew & Team Roster** module provides Operations Supervisors with a centralized management directory for all personnel assigned to their department. It pairs real-time attendance badges and sprint task throughput with one-click employee onboarding, AI-driven workload balancing, compensation configuration, and worker profile editing.

---

## 🏛️ Live Interface Overview

Below is the live console layout of the **Supervisor Team Directory**:

> 📸 **[UI Screenshot: Supervisor Crew & Team Management Console]**  
> *Target Asset Location:* `docs/assets/images/HRMS/Supervisor_/team.png`  
> *(To be added at the end with live screenshots)*

---

## 🧭 Page Anatomy & Top Action Controls

The top section of the team directory delivers immediate headcount context and key operational triggers:

| Control / Element | Type | Purpose & Working Behavior |
| :--- | :--- | :--- |
| **Back Navigation Link (`←`)** | Navigation Button | One-click shortcut returning to the Operations Dashboard (`/supervisor/dashboard`). |
| **Team Title & Member Counter** | Header Text | Displays active department title and total headcount badge (e.g., `Engineering • 14 Members`). |
| **Export Dropdown** | Action Button | Exports the active filtered crew list to **CSV** (`Supervisor_Team_Report.csv`) with attendance status, task progress, and efficiency ratings. |
| **+ Quick Add Employee** | Modal Trigger | Opens the employee registration modal to onboard new staff directly into your department without waiting for Central HR. |

---

## 📊 Summary KPI Metric Cards (Interactive Filters)

Four high-density metric cards summarize your team's real-time operational readiness. **Clicking any card dynamically filters the table below**:

| KPI Metric Card | Visual Indicator | Filter Criteria | Operational Action |
| :--- | :--- | :--- | :--- |
| **Team Size** | 🔵 Blue Ring | Shows all registered department members. | Resets table filters to show complete roster. |
| **Present Today** | 🟢 Emerald Ring | Filters for operators clocked in and actively verified on shift. | Audits live floor availability and workstation coverage. |
| **High Performers** | 🟣 Purple Ring | Filters for members with sprint efficiency $\ge 90\%$. | Identifies candidates for peer mentorship and shift lead roles. |
| **Needs Action** | 🔴 Rose Ring | Filters for members with task efficiency $< 60\%$. | Highlights operators requiring workload rebalancing or training. |

---

## 🧠 AI Team Copilot & Workload Analyzer

Positioned above the member table, the **AI Team Performance Analyzer** provides automated coaching intelligence:

* **Run AI Analysis**: Clicking the **Analyze Team** button evaluates current task assignments, completion velocity, and pending backlog across your crew.
* **Instant Recommendations**: Generates contextual operational suggestions (e.g., *"3 team members are carrying 68% of the active sprint deliverables. Consider redistributing 4 open tasks to balance line capacity"*).

---

## 📋 Team Data Table & Column Anatomy

The central roster table displays detailed operational telemetry for every operator:

| Table Column | Data Rendered | Description & Visual Treatment |
| :--- | :--- | :--- |
| **Member** | Avatar + Full Name + Email | Displays profile photo (or colored monogram initial), full name, and registered corporate email. |
| **Role** | Badge Pill | Identifies role hierarchy (`Employee`, `Supervisor`, `HR`). |
| **Attendance Status** | Real-Time Pill | 🟢 `Present`: Clocked in on time with live check-in timestamp.<br>🔴 `Absent / Not Checked In`: No punch recorded today. |
| **Tasks Progress** | Progress Bar + Ratio | Displays completed tasks vs. assigned deliverables (e.g., `8 / 10 Tasks`) with an animated completion bar. |
| **Efficiency** | Percentage Badge | Calculated efficiency metric ($\ge 90\%$ purple, $60-89\%$ blue, $<60\%$ rose). |
| **Actions** | Context Menu (`⋮`) | Quick actions menu to view full dossier, edit compensation details, or remove employee. |

---

## ⚙️ Step-by-Step Supervisory Operations

### 1. Inspecting a Member Dossier (`View Details`)
1. Click the three-dot (`⋮`) action menu on any employee row and select **View Details** (or click `👁️`).
2. The modal displays a comprehensive personnel profile:
   * **Full Contact Info**: Phone number, residential address, emergency contacts.
   * **Shift History & Recent Punches**: In/out timestamps and meal breaks for the active week.
   * **Active Sprint Deliverables**: List of assigned work orders and current completion state.

---

### 2. Editing Member Details & Allowances (`Edit Employee`)
Supervisors can adjust compensation structures and contact details for department staff:
1. Select **Edit Employee** from the action menu.
2. In the modal:
   * **Base Salary**: Update monthly base pay (₹0 to ₹10,000,000).
   * **Travelling Allowance (TA)**: Set monthly fixed travel amount or percentage.
   * **Dearness Allowance (DA)**: Set statutory living cost adjustment.
   * **House Rent Allowance (HRA)**: Update monthly rental allowance.
   * **Mobile Number**: Update official contact phone.
3. Click **Save Changes**. The updated records sync immediately with the central payroll ledger.

---

### 3. Onboarding a New Employee (`+ Quick Add Employee`)
When new front-line operators join your line or shift:
1. Click the orange **+ Quick Add Employee** button in the top toolbar.
2. Fill out the modal fields:
   * **Name & Email**: Employee legal name and corporate login email.
   * **Mobile Number**: Direct phone line.
   * **Initial Password**: Optional manual passkey (system auto-provisions a secure password if left empty).
   * **Salary & Allowances**: Configure Base Pay, TA, DA, and HRA (choose between Fixed Amount ₹ or % of base).
   * **Personal Details**: Gender, Date of Birth, and Residential Address.
   * *Department is locked automatically to your assigned department.*
3. Click **Create Employee**.
4. A success screen reveals the newly provisioned **Employee ID** and login credentials with a 1-click **Copy Credentials** button.

---

### 4. Searching, Sorting & Exporting Rosters
* **Instant Search**: Type any name, email, or designation into the search box for real-time table filtering.
* **Role Filter**: Narrow down display by `Employee`, `Supervisor`, or `HR`.
* **Multi-Column Sorting**: Click any column header (`Name`, `Role`, `Productivity`, `Tasks Completed`) to toggle ascending/descending order.
* **Export to CSV**: Click the **Export** button to download the complete filtered dataset for shift reports or HR reviews.

---

## 💡 Best Practices & Compliance Guidelines

!!! tip "Daily Efficiency Monitoring"
    Use the **Needs Action** KPI filter card each morning. If an operator's efficiency drops below 60%, check their active task list for unresolved dependencies or equipment bottlenecks.

!!! warning "Permanent Employee Deletion"
    The **Delete Employee** action permanently terminates the user's account and revokes system access. Exercise extreme caution; for temporary departures, consult HR to set status to *On Leave* or *Suspended*.

!!! note "Salary Validation Safeguards"
    All salary fields enforce strict financial validation boundaries (Base salary up to ₹10,000,000 and allowances up to ₹1,000,000) to eliminate clerical errors during rapid shift onboarding.

