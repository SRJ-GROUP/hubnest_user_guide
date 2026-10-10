---
title: Company Dashboard — Executive Workspace
description: In-depth guide to the HubHRMS Company Dashboard, live workforce telemetry, KPI cards, and quick actions.
---

# Company Dashboard — Executive Workspace

The **Company Dashboard** (`/admin/dashboard`) is the central operational command center for Company Administrators and executive leadership in Hub HRMS. It unifies live employee presence, attendance health, pending approvals, and AI insights onto a single real-time screen.

![Company Dashboard](../assets/images/HRMS/dashbord.png){ width="100%" }

---

## 🎯 Executive Controls & Features

### 1. Header Bar & Quick Add
* **Active Organization Context**: Confirms your active company tenant (**SRJ GLOBAL**) and live administrative status.
* **`+ Quick Add` Action**: A high-velocity action button in the top bar allowing administrators to quickly add a new user, assign a task, or publish a notice without navigating away from the current screen.
* **Live System Status (`Optimal 🟢`)**: Real-time heartbeat indicating active backend microservices and database latency (`< 300ms`).

### 2. Five Core Telemetry KPI Cards
| Metric Card | Value Displayed | Purpose & Operational Impact |
| :--- | :---: | :--- |
| **TOTAL USERS** | `1 Active` | Total provisioned staff accounts across all departments in the active tenant. |
| **ACTIVE NOW** | `2 Live 🟢` | Real-time concurrent WebSocket sessions active across web, mobile, and desktop. |
| **INACTIVE USERS** | `0` | Flagged deactivated, resigned, or suspended accounts requiring security review. |
| **TOTAL ROLES** | `12 Across depts` | Active authorization tiers defined across the company (RBAC). |
| **LEAVES TODAY** | `4 Total (1 Pending)` | Daily workforce availability status, highlighting pending requests needing immediate sign-off. |

### 3. Quick Action Shortcuts
* **Add User**: Direct modal to provision a new staff account with default credentials.
* **Manage Roles**: Direct access to the permissions matrix to edit access scopes.
* **System Settings**: Jump straight into office shift hours, geo-fence coordinates, and webhooks.
* **View Reports**: Immediate access to attendance summaries, overtime audits, and payroll sheets.
* **Manage Departments**: Rapid shortcut to add or restructure business divisions.

### 4. AI Smart Insights & Activity Telemetry
* **100% Team Onboarding Complete**: Scans employee profiles for missing mandatory statutory items (PAN, Aadhaar/Passport, Bank Details, and Signed e-Contracts).
* **Module Activity Overview Chart**: Tracks daily attendance punches, task progress milestones, and system transactions with daily, weekly, and monthly filters.
* **Spotlight Global Search (`⚡ Spotlight ⌘K`)**: Built-in keyboard shortcut trigger for instant hub navigation.
