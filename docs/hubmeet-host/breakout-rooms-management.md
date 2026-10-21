# Breakout Rooms Management

In large virtual workshops, design sprints, seminars, and academic lectures, having 50 or 100 people in a single room makes intimate discussions impossible. HubMeet's **Breakout Rooms Engine** allows hosts to divide participants into smaller discussion groups (2 to 50 separate rooms), distribute attendees automatically or manually, broadcast announcements across all rooms, and seamlessly return everyone to the main stage.

---

## 1. How Breakout Rooms Work

```mermaid
graph TD
    A[Main Meeting Room: 60 Attendees] -->|Host Clicks 'Open Breakout Rooms'| B{Assignment Engine}
    B -->|Automatic / Manual / Self-Select| C[Breakout Room 1: 15 Attendees]
    B -->|Automatic / Manual / Self-Select| D[Breakout Room 2: 15 Attendees]
    B -->|Automatic / Manual / Self-Select| E[Breakout Room 3: 15 Attendees]
    B -->|Automatic / Manual / Self-Select| F[Breakout Room 4: 15 Attendees]
    C & D & E & F --> G[Private Audio, Video & Chat within each group]
    G -->|Host Closes Session with 60s Timer| A
```

- **Independent Audio & Video:** Inside a breakout room, participants only see, hear, and chat with their assigned group.
- **Host Super-Powers:** The host and co-hosts can freely jump between any breakout room to check on progress, answer questions, or facilitate discussions.
- **Synchronized Closing:** When time is up, a global countdown timer brings every attendee back to the main room automatically.

---

## 2. Setting Up Breakout Rooms

To configure breakout rooms:
1. In the bottom control dock, click the **Breakout Rooms Icon** (four small squares).
2. The **Breakout Rooms Configuration Modal** will open.

```mermaid
graph TD
    subgraph "Breakout Configuration Wizard"
        Rooms["Select Number of Rooms: [ 4 ] Rooms"]
        Assignment{"Select Assignment Method"}
        Assignment -->|Method 1| Auto["Assign Automatically\nEvenly divides 40 attendees into 10 per room"]
        Assignment -->|Method 2| Manual["Assign Manually\nHost drags & drops specific people into rooms"]
        Assignment -->|Method 3| Self["Let Participants Choose\nAttendees pick rooms by topic title"]
        Options["Timer & Settings: 15 Mins Duration + 60s Warning Timer"]
    end
```

### Step 1: Choose Number of Rooms
- Use the counter to specify how many rooms to create (e.g., `2` to `50` rooms).
- The system automatically calculates group size (e.g., *"30 participants into 5 rooms = 6 people per room"*).

### Step 2: Choose Assignment Method
- **Assign Automatically:** HubMeet instantly shuffles attendees and balances room sizes evenly. (Fastest and best for general brainstorming).
- **Assign Manually:** Displays a drag-and-drop list where you assign specific clients or colleagues to designated rooms. (Best for pairing mentors with students or client account reviews).
- **Let Participants Choose Room:** Gives each room a custom title (e.g., *"Room A: Marketing"*, *"Room B: Engineering"*). Attendees pick which room aligns with their interests.

### Step 3: Configure Timer & Closing Rules
Click the **Gear (Settings)** icon in the modal:
- **[✓] Auto-close rooms after:** Set a session duration (e.g., `15 minutes`). A countdown clock will display at the top of every attendee's screen.
- **[✓] Countdown after closing:** Provide a buffer (e.g., `60 seconds` or `30 seconds`) so groups can finish their sentences before being returned to the main stage.

---

## 3. Running an Active Breakout Session

Once configured, click the green **Open All Rooms** button:

```mermaid
sequenceDiagram
    autonumber
    actor Host as Host (You)
    participant Engine as Breakout Engine
    actor Room1 as Breakout Group 1
    actor Room2 as Breakout Group 2

    Host->>Engine: Clicks "Open All Rooms"
    Engine-->>Room1: Prompts attendees to join Room 1
    Engine-->>Room2: Prompts attendees to join Room 2
    Host->>Engine: Clicks "Join Room 2" to observe discussion
    Engine->>Host: Connects Host into Room 2
    Host->>Engine: Clicks "Broadcast Message to All": "5 mins left!"
    Engine-->>Room1: Displays floating announcement banner
    Engine-->>Room2: Displays floating announcement banner
```

### Host Actions During the Session:
- **Jumping Between Rooms:** In the breakout manager panel, click the blue **Join** button next to any room (e.g., *Room 3*). Your audio and camera immediately transition into that room. Click **Leave Room** to return to the main lobby.
- **Broadcasting Announcements:** Need to give a time warning? Click **Broadcast Message to All**, type: *"5 minutes remaining! Make sure to pick your team spokesperson"*, and click **Send**. The text banner floats across every participant's screen in all rooms.
- **Handling "Ask for Help" Calls:** When a group clicks *"Ask Host for Help"*, a notification card pops up on your screen: *"Breakout Room 2 has requested assistance."* Click **Join Room** to assist them immediately.

---

## 4. Closing the Breakout Session

When the discussion time concludes:
1. Click the red **Close All Rooms** button in the Breakout Manager.
2. A 60-second warning countdown bar appears on everyone's screen: *"Breakout rooms will close in 60 seconds."*
3. Attendees can click **Return Now** immediately, or use the remaining seconds to finish their thoughts.
4. When the timer reaches zero, all video and audio streams seamlessly merge back into the main room video grid.
