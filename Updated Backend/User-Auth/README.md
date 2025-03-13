# GameZone Authentication API

This is the authentication API for the GameZone application. It provides user registration, login functionality, and room management with secure password handling and JWT token-based authentication.

## Features

- User registration (signup)
- User authentication (login)
- Password hashing using bcrypt
- JWT token-based authentication
- Input validation
- MongoDB database integration
- Email notifications
- Room Cards Management System

## API Endpoints

### Authentication

#### Signup
- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "name": "string",
    "username": "string",
    "email": "string",
    "password": "string",
    "confirmPassword": "string",
    "gender": "male|female|other",
    "dob": "YYYY-MM-DD",
    "profilePicture": "string (URL)" // Optional
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "message": "User created successfully",
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "user-name",
      "username": "username",
      "email": "user-email",
      "profilePicture": "profile-url",
      "age": 25,
      "bio": "",
      "roomCardsCount": 10
    }
  }
  ```
- **Error Response**: `400 Bad Request`
  ```json
  {
    "errors": [
      {
        "msg": "Name is required",
        "param": "name"
      }
    ]
  }
  ```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "username": "string (username or email)",
    "password": "string"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Login successful",
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "user-name",
      "username": "username",
      "email": "user-email",
      "profilePicture": "profile-url",
      "age": 25,
      "bio": "user-bio",
      "roomCardsCount": 10
    }
  }
  ```
- **Error Response**: `401 Unauthorized`
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### Profile Management

#### Update Profile
- **URL**: `/api/auth/profile`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <jwt-token>
  ```
- **Request Body** (all fields optional):
  ```json
  {
    "name": "string",
    "username": "string",
    "profilePicture": "string (URL)",
    "bio": "string (max 500 chars)"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Profile updated successfully",
    "user": {
      "id": "user-id",
      "name": "user-name",
      "username": "username",
      "email": "user-email",
      "profilePicture": "profile-url",
      "age": 25,
      "bio": "updated-bio",
      "roomCardsCount": 10
    }
  }
  ```
- **Error Response**: `400 Bad Request`
  ```json
  {
    "error": "Username is already taken"
  }
  ```

### Password Management

#### Change Password
- **URL**: `/api/auth/change-password`
- **Method**: `POST`
- **Auth Required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <jwt-token>
  ```
- **Request Body**:
  ```json
  {
    "currentPassword": "string",
    "newPassword": "string",
    "confirmPassword": "string"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Password updated successfully"
  }
  ```
- **Error Response**: `401 Unauthorized`
  ```json
  {
    "error": "Current password is incorrect"
  }
  ```

#### Forgot Password (Request OTP)
- **URL**: `/api/auth/forgot-password`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Password reset OTP sent to your email"
  }
  ```
- **Error Response**: `404 Not Found`
  ```json
  {
    "error": "User not found"
  }
  ```

#### Reset Password (with OTP)
- **URL**: `/api/auth/reset-password`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "string",
    "otp": "string (6 digits)",
    "newPassword": "string",
    "confirmPassword": "string"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Password reset successful"
  }
  ```
- **Error Response**: `400 Bad Request`
  ```json
  {
    "error": "Invalid or expired OTP"
  }
  ```

### Room Cards Management

#### Get Room Cards Status
- **URL**: `/api/room-cards/status`
- **Method**: `GET`
- **Auth Required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <jwt-token>
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "total": 10,
    "available": 8,
    "used": 2
  }
  ```

#### Get Available Room Cards
- **URL**: `/api/room-cards/available`
- **Method**: `GET`
- **Auth Required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <jwt-token>
  ```
- **Success Response**: `200 OK`
  ```json
  [
    {
      "id": "card-id",
      "type": "basic",
      "isUsed": false,
      "expiresAt": "2025-01-01T12:00:00Z"
    }
  ]
  ```

#### Use Room Card
- **URL**: `/api/room-cards/use`
- **Method**: `POST`
- **Auth Required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <jwt-token>
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Room card used successfully",
    "card": {
      "id": "card-id",
      "type": "basic",
      "isUsed": true,
      "expiresAt": "2025-01-01T12:00:00Z"
    }
  }
  ```
- **Error Response**: `400 Bad Request`
  ```json
  {
    "error": "No available room cards"
  }
  ```

## Frontend Implementation Guide

### Authentication Flow

1. **User Registration**:
   ```javascript
   const response = await fetch('YOUR_API_URL/api/auth/signup', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       name: 'John Doe',
       username: 'johndoe',
       email: 'john@example.com',
       password: 'password123',
       confirmPassword: 'password123',
       gender: 'male',
       dob: '1995-01-01',
       profilePicture: 'https://example.com/photo.jpg' // Optional
     })
   });

   const data = await response.json();
   // Store token in localStorage
   localStorage.setItem('token', data.token);
   ```

2. **User Login**:
   ```javascript
   const response = await fetch('YOUR_API_URL/api/auth/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       username: 'johndoe', // or email
       password: 'password123'
     })
   });

   const data = await response.json();
   localStorage.setItem('token', data.token);
   ```

3. **Making Authenticated Requests**:
   ```javascript
   const token = localStorage.getItem('token');
   const response = await fetch('YOUR_API_URL/api/room-cards/status', {
     headers: {
       'Authorization': `Bearer ${token}`
     }
   });
   ```

### Profile Management

1. **Update Profile**:
   ```javascript
   const token = localStorage.getItem('token');
   const response = await fetch('YOUR_API_URL/api/auth/profile', {
     method: 'PATCH',
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       name: 'New Name',
       bio: 'My gaming bio'
     })
   });
   ```

### Password Management

1. **Change Password**:
   ```javascript
   const token = localStorage.getItem('token');
   const response = await fetch('YOUR_API_URL/api/auth/change-password', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       currentPassword: 'oldpass123',
       newPassword: 'newpass123',
       confirmPassword: 'newpass123'
     })
   });
   ```

2. **Forgot Password Flow**:
   ```javascript
   // Step 1: Request OTP
   const response1 = await fetch('YOUR_API_URL/api/auth/forgot-password', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       email: 'user@example.com'
     })
   });

   // Step 2: Reset Password with OTP
   const response2 = await fetch('YOUR_API_URL/api/auth/reset-password', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       email: 'user@example.com',
       otp: '123456', // OTP received in email
       newPassword: 'newpass123',
       confirmPassword: 'newpass123'
     })
   });
   ```

### Room Cards Management

1. **Check Room Cards Status**:
   ```javascript
   const token = localStorage.getItem('token');
   const response = await fetch('YOUR_API_URL/api/room-cards/status', {
     headers: {
       'Authorization': `Bearer ${token}`
     }
   });
   ```

2. **Use Room Card**:
   ```javascript
   const token = localStorage.getItem('token');
   const response = await fetch('YOUR_API_URL/api/room-cards/use', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${token}`
     }
   });
   ```

## Important Notes

1. **Token Management**:
   - Store the JWT token securely (localStorage/sessionStorage)
   - Include token in all authenticated requests
   - Handle token expiration (24-hour validity)

2. **Error Handling**:
   - Always check response status codes
   - Handle network errors gracefully
   - Show appropriate error messages to users

3. **Validation**:
   - Validate inputs before sending to API
   - Password minimum length: 6 characters
   - Bio maximum length: 500 characters
   - Valid email format required
   - Username must be unique

4. **Room Cards**:
   - New users receive 10 basic room cards
   - Each room card is valid for 3 hours
   - Check card availability before room creation

5. **Password Reset**:
   - OTP validity: 60 minutes
   - OTP format: 6 digits
   - Check email for OTP
   - Verify passwords match

## Security Best Practices

1. **Token Security**:
   - Never store tokens in plain text
   - Clear token on logout
   - Implement token refresh mechanism

2. **Password Security**:
   - Never store passwords in state/storage
   - Clear password fields after submission
   - Implement secure password requirements

3. **API Security**:
   - Use HTTPS for all requests
   - Validate all input data
   - Handle sensitive data securely

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_app_password
   ```

3. Start the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```