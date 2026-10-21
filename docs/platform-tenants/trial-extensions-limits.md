# Trial Management, Quotas & Employee Tier Allocations

Welcome to the **Trial Management, Quotas & Employee Tier Allocations Guide**. High-converting enterprise sales cycles depend upon frictionless evaluation trials. When prospective clients test HubNest, they evaluate everything from bulk employee payroll processing to real-time WebRTC video conferences.

As a Tenant Operations Specialist, you manage the evaluation lifecycle: extending trial windows for engaged accounts, adjusting employee seat limits during pilot deployments, and resolving quota ceilings before they disrupt customer testing.

---

## 1. The 14-Day Evaluation Trial Lifecycle

When an organization signs up through the marketing site or is provisioned by direct sales, it enters the **Trial** operational state:

```mermaid
flowchart LR
    Start([Day 1: Trial Provisioned]) --> Mid[Day 7: Halfway Check-in]
    Mid --> Warn[Day 11: 3 Days Remaining Warning Banner]
    Warn --> Eval{Action by Day 14?}
    Eval -->|Converts to Paid| Active[🟢 Transition to Active Paid Tier]
    Eval -->|Prospect Requests More Time| Extend[🔄 Operations Grants +14 Days Extension]
    Extend --> Mid
    Eval -->|No Action / Lapsed| Suspend[🔴 Automated Suspension / Grace Period]
```

### In-App Trial Indicators
- **In-App Header Countdown:** Users in trial organizations see a sleek, non-intrusive banner at the top of their screen indicating remaining days (e.g., *"11 days left in your enterprise evaluation trial — Upgrade Now"*).
- **Trial Expiration Timestamp (`trialEndsAt`):** Stored in the database as an explicit ISO-8601 UTC timestamp. When this timestamp lapses, the platform's automated cron service transitions the organization to `suspended` status unless extended or upgraded.

---

## 2. Step-by-Step: Extending an Evaluation Trial

When an enterprise customer requests an extension to complete board approvals or security audits:

```mermaid
sequenceDiagram
    autonumber
    actor Ops as Operations Specialist
    participant Table as Organizations Directory
    participant Modal as Extend Trial Modal
    participant API as Platform API
    participant UI as Tenant Workspace

    Ops->>Table: Searches organization and clicks Extend Trial from action menu
    Table->>Modal: Opens extension dialog (Defaults to +14 days)
    Ops->>Modal: Enters additional days (e.g., 7, 14, or 30 days)
    Ops->>Modal: Clicks 'Confirm Extension'
    Modal->>API: POST /platform/admin/tenants/{id}/extend-trial {days: 14}
    API-->>Modal: Returns updated trialEndsAt timestamp & success status
    Modal-->>Ops: Displays confirmation alert
    API-->>UI: Real-time banner updates and trial clock resets
```

### Procedure
1. Navigate to **Organizations** (`/tenants`).
2. Filter the table by **Status: Trial** or search for the specific organization.
3. Click the **Three-Dots (`...`)** menu on the right side of the tenant row.
4. Select **Extend Trial**.
5. In the **Extend Evaluation Window Modal**:
   - The default duration is pre-populated as **14 days**.
   - You can enter any custom day count (e.g., `7`, `14`, `21`, or `30` days) depending on sales guidance.
6. Click **Confirm Extension**.
7. The table and the customer's top banner immediately recalculate the remaining evaluation days.

---

## 3. Managing Operational Resource Quotas

Each subscription tier (`STARTER`, `PRO`, `ENTERPRISE`) defines maximum resource limits. During pilots, enterprise customers with 500+ employees frequently require temporary quota increases:

| Resource Quota Dimension | Unit of Measurement | Default Tier Limits | Enforcement Mechanism |
| :--- | :--- | :--- | :--- |
| **Employee Limit (`employeeLimit`)** | Maximum active employee profiles. | Starter: `25`<br/>Pro: `100`<br/>Enterprise: `Unlimited` | Gated by `TierGate.java` in HubHRMS. Adding employee #26 triggers an upgrade modal. |
| **HR Admin Limit (`hrAdminLimit`)** | Dedicated administrative seats. | Starter: `2`<br/>Pro: `5`<br/>Enterprise: `Unlimited` | Keycloak role assignment validation. |
| **Department Manager Limit (`managerLimit`)** | Supervisory team roster seats. | Starter: `5`<br/>Pro: `20`<br/>Enterprise: `Unlimited` | Role mapping bounds in HRMS. |
| **Concurrent Meetings Limit** | Simultaneous active video rooms. | Starter: `2`<br/>Pro: `10`<br/>Enterprise: `Unlimited` | LiveKit SFU room creation barrier. |
| **Cloud Storage Quota (`storageQuotaGb`)** | Gigabytes for document vault & recordings. | Starter: `5 GB`<br/>Pro: `50 GB`<br/>Enterprise: `1,000 GB+` | S3 document upload gateway rejection. |
| **AI Copilot Monthly Credits** | Document tokens & AI chat responses. | Starter: `10,000`<br/>Pro: `100,000`<br/>Enterprise: `1,000,000+` | Vector search & LLM token metering. |

---

## 4. Temporary Pilot Quota Adjustments

When an enterprise prospect with 250 employees wants to test HubHRMS on a trial account before purchasing an Enterprise contract:

```mermaid
graph TD
    Problem[Customer on Starter Trial cannot add 250 employees] --> Action[Operations opens Tenant Action Menu]
    Action --> Tier[Click 'Change Plan' or update Quotas]
    Tier --> Upgrade[Switch Plan Tier to 'PRO' or 'ENTERPRISE']
    Upgrade --> Save[Click 'Update Plan Tier']
    Save --> Unlocked[Employee capacity immediately expands to 250+]
```

1. Locate the organization row in **Organizations** (`/tenants`).
2. Click **Three-Dots (`...`)** > **Change Plan**.
3. Select **PRO** or **ENTERPRISE** from the tier selection dropdown.
4. Click **Update Plan Tier**.
5. The organization's employee limit expands instantly without requiring commercial checkout or payment gateway transaction completion.

---

## 5. Operations Best Practices for Quota Governance
- **Monitor the 48-Hour Expiration Radar:** Every morning, filter organizations by `Trial` status and sort by `trialEndsAt`. Reach out to accounts expiring in under 48 hours to prevent sudden service interruption.
- **Differentiate Active vs. Abandoned Trials:** Always check the **Users Count** and **Last Active** columns. If a tenant has 0 added employees and has not logged in for 10 days, allow the trial to expire naturally rather than extending it automatically.
- **Log Extension Reasons in Support Tickets:** Never grant extensions exceeding 30 days without approval from the Head of Sales or Operations.
