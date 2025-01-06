# snapURL! - URL Shortener Application  

**snapURL!** is a lightweight and efficient application built with **Node.js**, **Express**, and **MongoDB**. It allows users to shorten long URLs for easy sharing while offering a user-friendly interface and seamless backend functionality.  

## 🚀 Features  

- **URL Shortening**: Quickly convert long URLs into concise, shareable links.    
- **Error Handling**: Custom error pages for 404 and server issues.    
- **Email Notifications**: Send emails to the admin.  
- **Load Testing**: YAML-based configurations for stress testing.  

## 🛠️ Tech Stack  

### Backend  
- **Node.js**: Fast and scalable JavaScript runtime.  
- **Express.js**: Flexible and minimalist web framework.  
- **MongoDB**: NoSQL database for storing URLs and related metadata.  

### Frontend  
- **EJS**: Embedded JavaScript templates for dynamic HTML generation.  
- **CSS**: Custom styles for a polished and responsive UI.  
- **JavaScript**: Enhances interactivity and validation on the client side.  

## 📂 Project Structure  

```plaintext
snap-url-shortener/
├── config/                   # Configuration files (DB, email, etc.)
│   ├── dbConfig.js           # MongoDB connection configuration
│   ├── emailConfig.js        # Email service configuration
├── controllers/              # Controllers for handling application logic
│   ├── indexController.js    # Main controller for app routes
├── models/                   # Database models
│   ├── urlModel.js           # MongoDB schema for URLs
├── public/                   # Static assets (CSS, JS, images)
│   ├── css/                  # CSS files for styling
│   ├── js/                   # JavaScript files for client-side functionality
│   ├── 404.css               # Styling for 404 error page
│   ├── loader.css            # Styling for loading animations
│   ├── mainStyle.css         # Main stylesheet for the application
│   ├── email.js              # Handles email interactions
│   ├── loader.js             # Handles loading animations
│   ├── result.js             # Handles result page logic
│   ├── urlForm.js            # Handles URL form validation
├── routes/                   # Application routes
│   ├── indexRoutes.js        # Routes for main application functionality
├── tests/                    # Load testing configurations
│   ├── load-tests/           # Folder for load testing
│   ├── load-test.yml         # YAML configuration for stress testing
├── utils/                    # Utility functions
│   ├── emailUtils.js         # Helper functions for email operations
│   ├── httpStatusCodes.js    # Standard HTTP status codes
│   ├── responseUtils.js      # Utility functions for API responses
│   ├── urlShortener.js       # Core URL shortening logic
├── views/                    # EJS templates for rendering views
│   ├── layout/               # Layout templates
│   ├── partials/             # Reusable components like header and footer
│   ├── 404.ejs               # 404 error page template
│   ├── about.ejs             # About page
│   ├── contact.ejs           # Contact page
│   ├── index.ejs             # Homepage for URL shortening
│   ├── internalError.ejs     # Internal server error page
│   ├── result.ejs            # Page displaying the shortened URL
├── .gitignore                # Ignored files and folders for Git
├── README.md                 # Project documentation
├── app.js                    # Main application entry point
├── package.json              # Node.js dependencies and metadata
├── package-lock.json         # Lock file for dependencies
```

## 🔧 Setup and Installation  

### Prerequisites  

- **Node.js** (v16+ recommended)  
- **MongoDB** (local instance or MongoDB Atlas)  
- **npm** (Node Package Manager)  

### Steps  

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/your-username/snap-url-shortener.git
   cd snap-url-shortener
   ```

2. **Install dependencies**:  
   ```bash
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env` file in the root directory with the following contents:  
   ```plaintext
   PORT=3000
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=27017
   DB_NAME=your_db_name
   SESSION_SECRET=your_session_secret
   SEND_EMAIL=your_email
   SEND_EMAIL_PASS=your_email_password
   ```

4. **Set up MongoDB**:  
   - Ensure MongoDB is running on your system or accessible remotely.  
   - Create a database with the name specified in the `.env` file.  

5. **Run the application**:  
   ```bash
   npm start
   ```

6. Open your browser and navigate to:  
   ```plaintext
   http://localhost:3000
   ```

## 📜 Usage  

1. **Home Page**  
   - Enter a long URL to get a shortened version.  
   - Copy or share the shortened URL directly.  

2. **Custom Alias**  
   - Add a custom alias to personalize your short URL.  

3. **Error Pages**  
   - Encounter custom error pages for 404 or internal server issues.  

## 🧪 Load Testing  

The `tests/load-tests/load-test.yml` file provides a configuration for performing stress tests on the application. Use tools like **Artillery** to execute these tests.  

**Run the load test**:  
```bash
artillery run tests/load-tests/load-test.yml
```

## 📈 Learning Outcomes  

- Building a **URL shortener** with Node.js, MongoDB, and Express.  
- Understanding dynamic **EJS templates** for rendering views.  
- Managing database connections with **MongoDB**.  
- Implementing robust **email notifications** and error handling.  
- Learning **load testing** to ensure application scalability.  

## 📜 License  

This project is licensed under the **MIT License**.

## 🌟 Acknowledgements  

- Thanks to the open-source community for libraries and tools used in this project.   

Happy Shortening! 🎉  