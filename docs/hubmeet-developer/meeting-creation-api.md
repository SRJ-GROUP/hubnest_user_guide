# Meeting Creation & WebRTC Token API

The HubMeet REST API allows your backend systems to automate meeting lifecycle management: schedule rooms programmatically, enforce room security, and mint signed **LiveKit WebRTC JWT Tokens** that your client applications can use to connect to video and audio streams.

---

## 1. Creating a Meeting Programmatically

To provision a new video meeting room via REST API:

### Request Endpoint:
`POST /api/public/v1/meetings`

### Request Headers:
```http
Authorization: Bearer hm_live_8f3a9b2c7e1d4409...
Content-Type: application/json
```

### JSON Request Payload:
```json
{
  "title": "Patient Consultation - Room #402",
  "description": "Dr. Sarah Jenkins with Patient ID 8841",
  "durationMinutes": 30,
  "passcode": "CARE-9021",
  "waitingRoomEnabled": true,
  "e2eeEnabled": false,
  "maxParticipants": 10,
  "autoRecord": false
}
```

### Success Response (`201 Created`):
```json
{
  "status": "success",
  "data": {
    "meetingId": "meet-402-918",
    "roomUrl": "https://meet.srjhubnest.com/room/meet-402-918",
    "passcode": "CARE-9021",
    "waitingRoomEnabled": true,
    "maxParticipants": 10,
    "livekitUrl": "wss://meet-sfu.srjhubnest.com",
    "createdAt": "2026-10-16T10:00:00Z"
  }
}
```

---

## 2. Generating Client-Side WebRTC Join Tokens

Before a browser or mobile device can connect to the WebRTC video stream, your backend must mint an authenticated **LiveKit JWT Token**:

```mermaid
sequenceDiagram
    autonumber
    actor Client as Client App (React / Flutter / iOS)
    participant Backend as Your Custom Backend Server
    participant HubMeet as HubMeet Token API
    participant SFU as LiveKit WebRTC SFU

    Client->>Backend: User logs in & requests to join Room #402
    Backend->>HubMeet: POST /api/public/v1/meetings/meet-402-918/tokens
    Note over Backend,HubMeet: Passes user identity & role ("participant")
    HubMeet-->>Backend: Returns signed WebRTC JWT Token (TTL: 60m)
    Backend-->>Client: Sends Token + SFU WebSocket URL
    Client->>SFU: Connects directly to wss://meet-sfu.srjhubnest.com
    SFU-->>Client: Video & Audio media streams connect!
```

### Request Endpoint:
`POST /api/public/v1/meetings/{meetingId}/tokens`

### JSON Request Payload:
```json
{
  "identity": "user_patient_8841",
  "name": "Jane Doe",
  "role": "participant",
  "ttlMinutes": 60,
  "canPublishAudio": true,
  "canPublishVideo": true,
  "canPublishScreen": false
}
```

### Success Response (`200 OK`):
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjkxM...",
    "livekitUrl": "wss://meet-sfu.srjhubnest.com",
    "expiresAt": "2026-10-16T11:00:00Z"
  }
}
```

---

## 3. Embedding Video in React or Next.js Applications

Using the generated token, you can embed the live video grid directly inside your custom application using the standard `@livekit/components-react` library:

```jsx
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';

export default function EmbeddedVideoRoom({ token, livekitUrl }) {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <LiveKitRoom
        token={token}
        serverUrl={livekitUrl}
        connect={true}
        video={true}
        audio={true}
        onDisconnected={() => alert('Meeting concluded')}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
}
```

---

## 4. Querying Active Meeting State & Ending Calls

### Get Meeting Details & Live Participant Count:
`GET /api/public/v1/meetings/{meetingId}`
```json
{
  "status": "success",
  "data": {
    "meetingId": "meet-402-918",
    "isActive": true,
    "activeParticipants": 3,
    "startedAt": "2026-10-16T10:02:14Z"
  }
}
```

### Force-End a Meeting for All Participants:
`POST /api/public/v1/meetings/{meetingId}/end`
- Disconnects all active WebRTC sessions, terminates any ongoing cloud recordings, and archives the room state immediately.
