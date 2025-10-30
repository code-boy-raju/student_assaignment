# 📘 Assignment & Review Dashboard

A modern **Assignment & Review Dashboard** built with **React, Redux, Tailwind CSS, and Vite**.  
It provides separate dashboards for **Admin** and **Student** roles, allowing admins to create, edit, and delete assignments, while students can mark their submissions and track progress visually.

---

##  Features

###  Admin
- Create new assignments with:
  - Title
  - Description
  - Due date
  - Google Drive link (opens in a new tab)
- Edit and delete existing assignments
- View student submission progress via progress bars
- Persistent storage using `localStorage`

###  Student
- View all available assignments
- Mark assignments as submitted with confirmation modal and animated success toast
- Track completion percentage with progress bar

###  Common
- State managed using **Redux**
- UI styled with **Tailwind CSS**
- Smooth toast and modal animations
- React-Bootstrap Icons for clean visuals

---

## 🗂 Folder Structure

assignment-dashboard/
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── vite.config.js
├── /public
│ └── favicon.svg
└── /src
├── main.jsx
├── index.css
├── App.jsx
│
├── /components
│ ├── Header.jsx
│ ├── ProgressBar.jsx
│ ├── ConfirmationModal.jsx
│ └── AssignmentCard.jsx
│
├── /pages
│ ├── Login.jsx
│ ├── StudentDashboard.jsx
│ └── AdminDashboard.jsx
│
├── /redux
│ ├── store.js
│ ├── /actions
│ │ ├── assignmentActions.js
│ │ └── userActions.js
│ └── /reducers
│ ├── assignmentReducer.js
│ └── userReducer.js
│
└── /utils
└── localStorage.js


---

## Tech Stack

| Category        | Technology                |
|-----------------|---------------------------|
| Frontend        | React (Vite)              |
| State Management| Redux + Redux Thunk       |
| Styling         | Tailwind CSS              |
| Icons           | React-Bootstrap-Icons     |
| Routing         | React Router DOM v6       |
| Build Tool      | Vite                      |
| Persistence     | localStorage              |

---

##  Installation & Setup

Make sure you have **Node.js (v16 or above)** and **npm** installed.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/assignment-dashboard.git
cd assignment-dashboard

2️⃣ Install Dependencies
npm install

3️⃣ Setup Tailwind CSS (if not already configured)

Vite + Tailwind setup (already included in this repo):

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


Your tailwind.config.cjs and postcss.config.cjs are already preconfigured.

4️⃣ Start the Development Server
npm run dev


Now open http://localhost:5173/
 in your browser.

5️⃣ Build for Production
npm run build


This will generate an optimized build in the dist folder.

6️⃣ Preview Production Build
npm run preview

 User Roles
Role	Description	Access
Admin	Create, edit, delete assignments	/admin
Student	View & submit assignments	/student
Demo Login

For local testing, you can log in as:

Student: Select "Student" from dropdown, enter any name.

Admin: Select "Admin" from dropdown, enter any name.

{
  user: {
    current: { id, name, role }
  },
  assignments: {
    list: [
      {
        id,
        title,
        description,
        dueDate,
        driveLink,
        creatorId,
        submissions: { studentId: true }
      }
    ]
  }
}


