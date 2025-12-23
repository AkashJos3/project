# 📋 Meeting Attendance System
A simple, real-time web app for tracking meeting attendance with digital signatures.
## 🚀 How to Use
### 👨‍💼 For Admins (Meeting Hosts)
1. **Open the App**: Go to the homepage.
2. **Create Meeting**:
   - Enter a **Meeting Title** (e.g., "Software Engineering Class").
   - Click **"Create Meeting"**.
3. **The Dashboard**:
   - You will see a unique **QR Code** on the screen.
   - **IMPORTANT**: Do not close this tab! If you do, you need the **Admin Secret Key** to get back in.
4. **During Meeting**:
   - Show the QR Code to your attendees (projector, screen share, etc.).
   - Watch as names appear in the "Attendees" list in **Real-Time**.
5. **After Meeting**:
   - Click **"End Meeting"** to stop new submissions.
   - Click **"Download PDF"** or **"Download CSV"** to get the attendance list.
### ✍️ For Attendees
1. **Scan the QR Code** with your phone camera.
2. Enter your **Full Name**.
3. **Sign** in the white box using your finger.
4. Click **"Submit Attendance"**.
5. You will see a green "Success" message.
---
## 🛠 Features
- **Instant QR Code**: No setup needed, unique for every meeting.
- **Digital Signatures**: Attendees sign with their touch screen.
- **Real-Time Updates**: Admin sees names pop up instantly.
- **Exports**: Download clean PDF reports or CSV data.
- **Security Codes**: Meetings are protected by a random Admin Secret.
## 💻 Tech Stack
- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Database**: SQLite (File-based)
