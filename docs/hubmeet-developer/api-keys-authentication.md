# API Keys & Scoped Authentication

All programmatic interactions with the HubMeet platform are authenticated using secure, cryptographically hashed **Developer API Keys**. HubMeet provides fine-grained permission scopes, dual environments (Production vs. Sandbox), and transparent HTTP rate-limiting headers.

---

## 1. Generating an API Key

To create a new API key:
1. In the Enterprise Admin Console (or Developer Portal), navigate to **Developer** $\rightarrow$ **API Keys**.
2. Click the blue **+ Generate New Key** button.
3. Configure the key parameters in the creation dialog:

```mermaid
graph TD
    A[Click '+ Generate New Key'] --> B[Enter Descriptive Name: 'Telehealth Mobile App']
    B --> C[Select Environment: Production vs Sandbox]
    C --> D[Select Granular Permission Scopes]
    D --> E[Click 'Create API Key']
    E --> F[Copy Secret Key 'hm_live_...' - Shown Only Once!]
```

| Field | Example Value | Description |
|---|---|---|
| **Key Name** | *Telehealth Mobile App Backend* | A memorable identifier describing which application or microservice uses this key. |
| **Environment** | **Production (`hm_live_...`)** or **Sandbox (`hm_test_...`)** | - `hm_live_`: Real WebRTC media clusters and billing deductions.<br>- `hm_test_`: Mock environment for local staging and CI/CD pipelines. |
| **Permission Scopes** | *Checkboxes* | Restrict key privileges to only what your application requires (Principle of Least Privilege). |

4. Click **Create Key**.
5. **Copy the Secret Key Immediately:** The full key string (e.g., `hm_live_8f3a9b2c7e1d4409...`) is displayed **only once**. For security, HubMeet stores only an irreversible SHA-256 hash in the database.

---

## 2. Granular Permission Scopes

HubMeet enforces role-based access control (RBAC) at the API key level:

| Scope Identifier | Permitted Operations |
|---|---|
| `meetings:read` | View meeting metadata, participant rosters, and scheduled calendars. |
| `meetings:write` | Create new meetings, update settings, lock/unlock rooms, and admit guests. |
| `meetings:delete` | Terminate active rooms and cancel scheduled meetings. |
| `tokens:generate` | Mint client-side LiveKit WebRTC JWT tokens for participants and hosts. |
| `recordings:read` | List completed cloud recordings and generate secure MP4 download URLs. |
| `recordings:delete` | Permanently remove recording archives from the cloud storage vault. |
| `users:read` | Query employee profiles, roles, and attendance records. |

---

## 3. Authenticating API Requests

Include your API key in the standard `Authorization` HTTP header with the `Bearer` scheme:

```http
GET /api/public/v1/meetings HTTP/1.1
Host: meet.srjhubnest.com
Authorization: Bearer hm_live_8f3a9b2c7e1d4409...
Content-Type: application/json
```

### Curl Example:
```bash
curl -X GET "https://meet.srjhubnest.com/api/public/v1/meetings" \
  -H "Authorization: Bearer hm_live_8f3a9b2c7e1d4409..." \
  -H "Content-Type: application/json"
```

---

## 4. Rate Limits & HTTP Response Headers

To protect media server clusters from denial-of-service surges, HubMeet enforces per-organization rate limits:

- **Standard Quota:** `60 requests per minute` per key.
- **Burst Capacity:** Up to `120 requests per minute` for short 10-second bursts.

### Inspecting Rate Limit Headers:
Every API response includes three standard telemetry headers:
```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1729098420
```

- If your application exceeds the limit, the server responds with HTTP status `429 Too Many Requests` and a `Retry-After: 30` header. Implement exponential backoff in your HTTP client libraries to handle rate limits cleanly.

---

## 5. Revoking & Rotating API Keys

If an API key is accidentally committed to public source control or if a server is decommissioned:

1. In the **Developer API Keys** table, locate the compromised key.
2. Click the red **Revoke / Delete (Trash Icon)** button.
3. Confirm the warning: *"Are you sure you want to revoke this key? Any application using this key will immediately receive 401 Unauthorized."*
4. Click **Revoke Now**.
5. The key is permanently deleted from the authorization cache within 500 milliseconds.
