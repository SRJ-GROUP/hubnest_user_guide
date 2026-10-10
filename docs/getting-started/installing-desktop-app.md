# Installing HubNest OS (Windows Desktop App)

HubNest OS delivers a native desktop workspace experience optimized for Windows 10 and Windows 11 (64-bit).

---

## 📥 Download the Installer

1. Navigate to the official download portal: [srjhubnest.com/download](https://srjhubnest.com/download).
2. Click **Download for Windows** to get the latest release installer (`HubNestOS-Setup.msi`).

---

## 💻 System Requirements

| Requirement | Minimum | Recommended |
| :--- | :--- | :--- |
| **Operating System** | Windows 10 (Build 1809+) or Windows 11 | Windows 11 64-bit |
| **Processor** | Dual-core 2.0 GHz | Quad-core 2.5 GHz or higher |
| **Memory (RAM)** | 4 GB | 8 GB or higher |
| **Disk Space** | 500 MB free space | 2 GB free SSD space |
| **WebView2** | Microsoft Edge WebView2 Runtime | Pre-installed on Windows 10/11 |

---

## 🛠️ Step-by-Step Installation

1. Locate the downloaded file `HubNestOS-Setup.msi` in your **Downloads** folder.
2. Double-click the installer to launch the setup wizard.
3. If prompted by Windows SmartScreen, click **More info** ➔ **Run anyway**.
4. The setup wizard installs HubNest OS into `C:\Program Files\HubNest OS` and creates:
   * A **Start Menu shortcut**
   * A **Desktop icon**

!!! tip "Enterprise Silent Installation"
    IT administrators can silently deploy the MSI package across multiple machines using PowerShell:
    ```powershell
    msiexec /i HubNestOS-Setup.msi /qn /norestart
    ```
