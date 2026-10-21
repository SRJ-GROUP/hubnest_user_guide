---
title: Redis Job Queues, Workers & Cron Health
description: Administrator guide for monitoring background Redis message queues, diagnosing failed dispatch jobs, retrying failed broadcasts, and verifying server cron health in HubNotification.
---

# ⚙️ Redis Job Queues, Workers & Cron Health

When a client launches a marketing campaign to 100,000 customers, the server does not freeze or make the user wait on the screen. Instead, HubNotification delegates the work to high-speed **Background Queues** powered by **Redis** and multi-threaded background workers.

The **Queue Management Monitor** (`/admin/queue`) and **Cron Setup Checker** (`/admin/cron-setup`) give SuperAdmins complete visibility into platform performance, job throughput, and error recovery.

```mermaid
flowchart TD
    subgraph ClientRequests["User & Webhook Triggers"]
        B["100,000 WhatsApp Campaign"]
        W["Inbound Meta Webhooks"]
        AI["AI Document Vector Chunking"]
    end

    subgraph RedisQueues["Redis Asynchronous Queues (/admin/queue)"]
        Q1["'broadcasts' Queue (Throttled dispatch)"]
        Q2["'webhooks' Queue (Instant intake)"]
        Q3["'ai' Queue (Heavy computation)"]
    end

    subgraph Workers["Background Queue Workers"]
        W1["Worker 1 (High Priority)"]
        W2["Worker 2 (Campaigns)"]
        W3["Worker 3 (AI RAG)"]
    end

    ClientRequests --> RedisQueues
    RedisQueues --> Workers
    Workers --> Complete["Dispatched with 100% Rate-Limit Safety! 🚀"]
```

---

## 🧭 Exploring the Queue Monitor (`/admin/queue`)

Navigate to **Queue** (`/admin/queue`):

### 1. Active Queue Health Meters
* **Queued Jobs**: Count of messages currently waiting in memory to be processed.
* **Processing Now**: Jobs currently being handled by active worker threads.
* **Completed Today**: Total background jobs successfully executed in the last 24 hours.
* **Failed Jobs**: Count of jobs that encountered unexpected third-party errors.

---

## ⚠️ Diagnosing & Retrying Failed Jobs

If an external service (such as Meta's API or a payment processor) experiences a temporary 2-minute outage, background jobs that fail during that window land safely in the **Failed Jobs Table**:

```mermaid
sequenceDiagram
    autonumber
    actor Admin as SuperAdmin
    participant Queue as Queue Manager (/admin/queue)
    participant Worker as Background Queue Worker
    participant Meta as Meta Graph API

    Worker->>Meta: Dispatches WhatsApp message
    Meta-->>Worker: HTTP 503 "Service Temporarily Unavailable"
    Worker->>Queue: Safely logs job into "Failed Jobs Table" with full error trace
    Admin->>Queue: 1. Opens /admin/queue & reviews error trace
    Admin->>Queue: 2. Clicks "Retry All Failed Jobs" button (🔄)
    Queue->>Worker: 3. Re-queues failed jobs
    Worker->>Meta: 4. Meta is back online! All messages deliver successfully! 🎉
```

### How to Review a Failed Job:
1. In the Failed Jobs table, locate the failed record.
2. The table displays:
   * **Job Class**: (e.g., `SendWhatsappBroadcastJob` or `ProcessIncomingWebhookJob`).
   * **Exception Details**: Plain-language description of why it failed (e.g., *"Connection timed out after 10,000ms"*).
   * **Failed Timestamp**: Exact date and time.
3. **Operational Actions**:
   * **Retry Single Job (🔄)**: Click the retry icon next to that specific job to re-execute it immediately.
   * **Retry All (⚡)**: Click the purple button labeled **Retry All Failed Jobs** to re-dispatch the entire failed batch.
   * **Flush Stale Jobs (🗑️)**: Click **Flush All** to permanently discard old, unneeded test failures.

---

## ⏰ Cron Scheduler Health (`/admin/cron-setup`)

Many critical platform features rely on a repeating system clock:
* Firing scheduled future broadcasts (e.g., sending that Sunday 11:00 AM campaign).
* Checking for abandoned shopping carts after 60 minutes.
* Evaluating trial subscription expirations.

Navigate to **System ➔ Cron Setup** (`/admin/cron-setup`):

### Verification Checklist:
* **Status Pill**: Displays **`Cron Running ✅`** (Green) or **`Cron Inactive ⚠️`** (Orange).
* **Last Execution Timestamp**: Confirms that the background runner ticked within the last 60 seconds.
* **Server Command Reference**: If setting up a fresh cloud server or Docker instance, the page provides the exact one-line cron entry required:
  ```bash
  * * * * * cd /var/www/hubnotification && php artisan schedule:run >> /dev/null 2>&1
  ```

---

## 💡 System Health Best Practices

> [!TIP]
> **Check Queues After Massive Broadcasts:** When a major client launches a 50,000-message campaign, glance at the Queue Monitor. You can watch the `Queued Jobs` counter steadily count down to zero as your workers dispatch the messages.

> [!IMPORTANT]
> **Zero Message Loss Guarantee:** Because failed messages are captured in the Failed Jobs table rather than discarded, your clients will never lose a single broadcast message during unexpected network blips.

> [!NOTE]
> **Actuator Health Endpoints:** For enterprise DevOps teams using Kubernetes or Datadog, HubNotification exposes automated JSON health probes at `/healthz/db`, `/healthz/redis`, and `/healthz/queue`.
