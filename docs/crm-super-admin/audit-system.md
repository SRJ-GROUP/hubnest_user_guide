---
title: System Health, Infrastructure Telemetry & Error Logs Guide
description: User guide for platform super administrators to monitor backend API latencies, database connection pooling, and infrastructure health in HubCRM.
---

# System Health, Infrastructure Telemetry & Error Logs Guide

Ensuring 99.9% uptime for thousands of concurrent sales reps and customer support agents requires proactive infrastructure monitoring. The **System Health & Telemetry Center** (`/super-admin/system-health`) provides platform operators with real-time vitals on backend services, database connections, and error logs.

---

## 🖥️ Core Infrastructure Vitals

```mermaid
graph TD
    Monitor["🖥️ Global System Telemetry"]
    
    Monitor --> API["1. Backend API Cluster<br/>Status: 🟢 Healthy (200 OK)<br/>Uptime: 99.98% | Response: 48ms"]
    Monitor --> DB["2. PostgreSQL Database<br/>Connections: 45 Active / 200 Max<br/>Query Latency: 4.2ms"]
    Monitor --> Cache["3. Redis Memory Cache<br/>Hit Rate: 94.2%<br/>Session Memory: 1.2 GB"]
    Monitor --> Disk["4. Storage & Media Volume<br/>Used: 340 GB of 2,000 GB<br/>Capacity: 🟢 Safe"]
```

---

## 🔍 How to Read the System Diagnostics

When you open `/super-admin/system-health`, the diagnostics dashboard displays four real-time gauges:

| System Component | Ideal Benchmark | Warning Threshold | What to Do if Flagged |
| :--- | :--- | :--- | :--- |
| **API Response Time** | < 100 milliseconds | > 350 milliseconds | Inspect slow database queries or check if an automated CSV migration is consuming bandwidth. |
| **Database Pool** | < 60% Capacity | > 85% Active Pool | Add connection poolers (PgBouncer) or scale database compute. |
| **Redis Cache Hit Rate**| > 90% | < 75% | Verify session invalidation policies. |
| **HTTP 5xx Error Rate** | < 0.05% | > 1.0% | **Critical Incident!** Inspect live error logs immediately. |

---

## 📜 Live Error Log Inspector

If users report an issue or a webhook fails:

1. Click on the **Live Logs** tab.
2. Filter by severity:
   * **Info (🔵):** Normal background job completions and server boot logs.
   * **Warn (🟡):** Temporary rate limits hit or slow queries.
   * **Error (🔴):** Unhandled server exceptions or third-party API timeouts.
3. Click any error entry to view the sanitized stack trace, affected tenant ID, request path, and timestamp.
