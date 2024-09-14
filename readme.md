# Dorm Management API

This is an Express-based API for managing dorm information, allowing users to create, read, update, and delete dorm entries. The API is hosted at:

**Base URL**: [https://vthacks-backend.onrender.com](https://vthacks-backend.onrender.com/api/dorms)

## API Endpoints

### 1. **Create a Dorm**

- **Endpoint**: `POST /api/dorms`
- **Description**: Creates a dorm entry for the authenticated user.
- **Authentication**: Requires a valid Bearer token.
- **Request Body**:
  ```json
  {
    "name": "Sunset Hall",
    "room_number": 102,
    "price": 1200,
    "bathroom_cleanliness": 4,
    "wifi_strength": 5,
    "room_size": 300,
    "safety": 5,
    "air_conditioning": true,
    "roommate": false,
    "comment": "Great dorm with amazing facilities."
  }
  ```
- **Response** (Success):
  ```json
  {
    "_id": "60e4a08c8f1f8e1488b8f02e",
    "userId": "60e4a08c8f1f8e1488b8f029",
    "name": "Sunset Hall",
    "room_number": 102,
    "price": 1200,
    "bathroom_cleanliness": 4,
    "wifi_strength": 5,
    "room_size": 300,
    "safety": 5,
    "air_conditioning": true,
    "roommate": false,
    "comment": "Great dorm with amazing facilities.",
    "createdAt": "2021-07-06T18:33:48.034Z",
    "updatedAt": "2021-07-06T18:33:48.034Z",
    "__v": 0
  }
  ```

### 2. **Get All Dorms**

- **Endpoint**: `GET /api/dorms`
- **Description**: Retrieves all dorm entries.
- **Response**:
  ```json
  [
    {
      "_id": "60e4a08c8f1f8e1488b8f02e",
      "userId": "60e4a08c8f1f8e1488b8f029",
      "name": "Sunset Hall",
      "room_number": 102,
      "price": 1200,
      "bathroom_cleanliness": 4,
      "wifi_strength": 5,
      "room_size": 300,
      "safety": 5,
      "air_conditioning": true,
      "roommate": false,
      "comment": "Great dorm with amazing facilities.",
      "createdAt": "2021-07-06T18:33:48.034Z",
      "updatedAt": "2021-07-06T18:33:48.034Z"
    }
  ]
  ```

### 3. **Get a Dorm by ID**

- **Endpoint**: `GET /api/dorms/:id`
- **Description**: Retrieves a specific dorm by its ID.
- **Response** (Success):
  ```json
  {
    "_id": "60e4a08c8f1f8e1488b8f02e",
    "userId": "60e4a08c8f1f8e1488b8f029",
    "name": "Sunset Hall",
    "room_number": 102,
    "price": 1200,
    "bathroom_cleanliness": 4,
    "wifi_strength": 5,
    "room_size": 300,
    "safety": 5,
    "air_conditioning": true,
    "roommate": false,
    "comment": "Great dorm with amazing facilities."
  }
  ```
- **Response** (Not Found):
  ```json
  {
    "message": "Dorm not found"
  }
  ```

### 4. **Update a Dorm by ID**

- **Endpoint**: `PUT /api/dorms/:id`
- **Description**: Updates a dorm entry for the authenticated user.
- **Authentication**: Requires a valid Bearer token and ownership of the dorm.
- **Request Body**:
  ```json
  {
    "name": "Sunset Hall Updated",
    "room_number": 102,
    "price": 1300,
    "bathroom_cleanliness": 5,
    "wifi_strength": 5,
    "room_size": 320,
    "safety": 5,
    "air_conditioning": true,
    "roommate": false,
    "comment": "Updated the dorm with a better comment!"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "60e4a08c8f1f8e1488b8f02e",
    "userId": "60e4a08c8f1f8e1488b8f029",
    "name": "Sunset Hall Updated",
    "room_number": 102,
    "price": 1300,
    "bathroom_cleanliness": 5,
    "wifi_strength": 5,
    "room_size": 320,
    "safety": 5,
    "air_conditioning": true,
    "roommate": false,
    "comment": "Updated the dorm with a better comment!",
    "createdAt": "2021-07-06T18:33:48.034Z",
    "updatedAt": "2021-07-07T18:33:48.034Z"
  }
  ```

### 5. **Delete a Dorm by ID**

- **Endpoint**: `DELETE /api/dorms/:id`
- **Description**: Deletes a dorm entry owned by the authenticated user.
- **Authentication**: Requires a valid Bearer token and ownership of the dorm.
- **Response** (Success):
  ```json
  {
    "message": "Dorm deleted"
  }
  ```
- **Response** (Unauthorized):
  ```json
  {
    "message": "You are not authorized to delete this dorm"
  }
  ```

- **Response** (Dorm Not Found):
  ```json
  {
    "message": "Dorm not found"
  }
  ```

## New Feature: Comment Section

Users can now leave a comment (up to 500 characters) when creating or updating dorm information.

- **Field**: `comment`
- **Type**: String (Maximum length: 500 characters)

### Example with Comment

```json
{
  "name": "Sunset Hall",
  "room_number": 102,
  "price": 1200,
  "bathroom_cleanliness": 4,
  "wifi_strength": 5,
  "room_size": 300,
  "safety": 5,
  "air_conditioning": true,
  "roommate": false,
  "comment": "This dorm has an amazing view!"
}
```

## Authorization

For any operations that require authentication, a valid Bearer token must be included in the request headers.

**Example Authorization Header**:
```bash
Authorization: Bearer <your-access-token>
```

## Base URL

The API is accessible at:  
[https://vthacks-backend.onrender.com/](https://vthacks-backend.onrender.com/api/dorms)
