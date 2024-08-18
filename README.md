# Prodify

Live Link : https://prodify-232d8.web.app/

Server Side Link : https://github.com/OHshajim/Prodify-server

## Description

**Prodify**, This is a Fullstack MERN (MongoDB, Express.js, React.js, Node.js) project that implements product filtering functionalities including pagination, search, categorization, and sorting. The application allows users to filter products by name, category, brand, and price, and also includes Google Authentication and Email/Password Authentication using Firebase.

## Features

- **Pagination:** Efficient loading of products with page numbers and navigation buttons.
- **Search:** Search products based on their name.
- **Categorization:** Filter products by brand name, category name, and price range.
- **Sorting:** Sort products by price (Low to High, High to Low) and date added (Newest first).
- **Authentication:**
  - Google Authentication using Firebase.
  - Email and Password Authentication using Firebase.
- **Responsive Design:** Fully responsive, mobile-first design with a clean UI.
- **Product Details:** Each product includes a name, image, description, price, category, ratings, and creation date.

## Technology Stack

- **Frontend:** React.js, Tailwind CSS ,DaisyUI
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Authentication (Google and Email/Password)
- **Database:** MongoDB
- **State Management:** React useState and useEffect hooks
- **API Client:** Axios

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OHshajim/Prodify.git
   ```
2. **Navigate to the project directory**
   ```bash
   cd Prodify
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a .env file in the root directory with your Firebase credentials:**
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

5. **Run the frontend server**
   ```bash
   npm run dev
   ```