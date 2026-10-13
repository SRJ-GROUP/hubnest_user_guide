---
title: Supervisor Shift Rosters, Rotations & Swap Approvals
description: Comprehensive user guide for the Shift Rosters & Schedule module in the Supervisor Portal — shift templates, employee shift assignments, custom timing overrides, peer swap approvals, and daily roster table.
---

# 06. Shift Rosters & Rotations (`/supervisor/shifts`)

The **Shift Rosters & Rotations** module equips Operations Supervisors with end-to-end tooling to schedule, rotate, and balance workforce coverage across plant assembly lines, retail shifts, and operational field units. Featuring customizable shift templates, on-the-fly custom time overrides, peer shift swap adjudication, and daily roster registries, supervisors can eliminate understaffing and ensure seamless shift handovers.

---

## 🏛️ Live Interface Overview

Below is the live console layout of the **Supervisor Shift Roster & Rotation Console**:

> 📸 **[UI Screenshot: Shift Roster Planning & Rotation Console]**  
> *Target Asset Location:* `docs/assets/images/HRMS/Supervisor_/shifts.png`  
> *(To be added at the end with live screenshots)*

---

## 🧭 Page Anatomy & Top Action Controls

The top header provides immediate scheduling context and primary operational triggers:

| Control / Element | Type | Purpose & Working Behavior |
| :--- | :--- | :--- |
| **Role & Console Tag** | Badge Pill | Identifies the active workspace (`Shift Supervisor Roster Console`). |
| **Console Heading** | Title Header | Displays `Shift Schedule & Rosters` with operational descriptor. |
| **Assign Employee Shift** | Modal Trigger | Primary button to allocate an employee to a shift template, custom timing window, or designate a weekly off. |
| **+ Define New Shift** | Modal Trigger | High-visibility indigo button opening the shift template creator to establish new rotational hours and allowances. |

---

## 🕒 Active Shift Templates Cards

The dashboard renders visual cards for all registered shift templates configured in the organization:

* **Day vs. Night Shift Visuals**: Features clean iconography (☀️ **Sun** for daytime hours, 🌙 **Moon** for night shifts).
* **Shift Parameters**: Displays shift title (e.g., *Morning Shift*, *General Shift*, *Night Shift*), start time, end time, and grace period window (e.g., `06:00 - 14:30 (Grace: 15m)`).
* **Night Shift Allowance Badge**: Clearly displays any associated hourly or shift-level night wage premiums (e.g., `+ ₹250 / Shift Allowance`).
* **Refresh Action**: Allows one-click re-querying to sync newly established corporate shift policies.

---

## 🔄 Peer Shift Swap Requests Queue

When employees arrange mutual schedule exchanges, their requests appear in the **Shift Swap Requests Table**:

| Column | Information Rendered | Description |
| :--- | :--- | :--- |
| **Requester** | Employee Name + ID | Worker initiating the swap request. |
| **Target Shift Date** | Calendar Date | The date of the shift the requester cannot attend. |
| **Covering Colleague** | Peer Name + ID | The coworker who has consented to cover the shift. |
| **Covering Date** | Calendar Date | The reciprocal date on which the requester will cover the coworker's shift. |
| **Reason** | Text String | Employee justification (e.g., *"Family emergency; covering Ravi's Saturday shift"*). |
| **Adjudication Actions** | Action Buttons | • **Approve Swap (`✓`)**: Updates both employee rosters in the database immediately.<br>• **Reject Swap (`✕`)**: Denies the exchange and maintains existing schedules. |

---

## 📋 Daily Shift Roster Registry

The lower section houses the **Daily Shift Roster Table** detailing worker allocations for any chosen day:

* **Date Filter Picker**: Select any operational date (`rosterDateFilter`) to inspect planned staffing levels.
* **Employee Search Input**: Filter the roster in real-time by employee name or email.
* **Table Columns**:
  * **Employee**: Profile avatar, full name, and email.
  * **Assigned Shift**: Template title (e.g., *Morning Shift A*) or *Weekly Off* indicator.
  * **Timing**: Operating hours (e.g., `06:00 AM - 02:30 PM`).
  * **Weekly Off Status**: Distinct badge indicating scheduled rest days.
  * **Actions**: One-click **Reassign** button to open the shift reassignment drawer for that specific worker.

---

## ⚙️ Step-by-Step Supervisory Workflows

### 1. Assigning an Employee to a Shift (`Assign Employee Shift`)
1. Click **Assign Employee Shift** in the top action bar.
2. In the modal:
   * **Select Employee**: Choose the target worker from your department directory.
   * **Assignment Date**: Pick the target shift date.
   * **Shift Selection Mode**:
     * *Standard Template*: Choose an existing template (e.g., *Morning Shift*, *General Shift*).
     * *Custom Time Override*: Toggle **Customize Timing** to enter bespoke start and end times (e.g., `07:30 to 16:30`) without creating a permanent global template.
     * *Weekly Off*: Check **Mark as Weekly Off** to grant scheduled rest days.
3. Click **Assign Shift**. The employee's self-service calendar and mobile roster update immediately.

---

### 2. Creating a New Shift Template (`+ Define New Shift`)
When operations launch a new production cycle or rotational window:
1. Click **+ Define New Shift**.
2. Complete the configuration parameters:
   * **Shift Name**: Descriptive title (e.g., *Assembly Line Night Run*).
   * **Start Time & End Time**: Operating hours in 24-hour format.
   * **Grace Period**: Permitted tardiness window before flagging late (default `15` minutes).
   * **Night Shift Toggle**: Check if the shift spans overnight hours.
   * **Night Shift Allowance**: Fixed premium compensation credited for working unsocial hours.
3. Click **Create Shift Template**.

---

### 3. Approving a Mutual Shift Swap
1. In the **Shift Swap Requests** section, review the proposed trade.
2. Verify that neither operator will breach maximum consecutive working hour guidelines.
3. Click the green **Approve** button.
4. The system validates reciprocal schedule compatibility, swaps roster dates automatically, and notifies both workers.

---

## 💡 Best Practices for Shift Supervision

!!! tip "Advance Roster Publishing"
    Always finalize and publish weekly rosters at least 48 hours before the work week begins (typically by Friday evening). This ensures staff can arrange transportation and personal schedules.

!!! warning "Night Shift Fatigue Intervals"
    When rotating an operator from a night shift to a day shift, ensure a mandatory rest interval of at least 24 hours between shift departure and the next clock-in.

!!! note "Instant Swap Synchronization"
    Approving a shift swap updates the central attendance geofence schedule instantly, allowing the covering employee to clock in seamlessly without being flagged as an unscheduled arrival.

