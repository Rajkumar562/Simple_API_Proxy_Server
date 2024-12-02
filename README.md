# Simple API Proxy Server with Authentication

This project implements a **Node.js API Proxy Server** that interacts with a public API (such as GitHub), adds **rate limiting** and **caching**, and includes **authentication** via IP-based token generation.

## Features

- **API Proxy**: Acts as a proxy to an external API (e.g., GitHub).
- **Rate Limiting**: Limits requests to 5 per minute per IP address.
- **Caching**: Caches successful API responses for 5 minutes.
- **Authentication**: Generates a token based on the client's IP address and validates it via cookies.
- **Logging**: Logs request details including timestamp, IP address, and rate limit status.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **JWT (JSON Web Token)**: For token generation and validation.
- **Morgan**: HTTP request logger middleware for Node.js.
- **Cookie Parser**: For parsing cookies sent with HTTP requests.
- **Rate Limiting**: Custom implementation to limit requests.

## Setup

### Prerequisites

1. **Node.js** (v14 or higher)
2. **npm** (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add the following variables:
   ```bash
   JWT_SECRET=your_secret_key_here  # Replace with your own secret key
   RATE_LIMIT_MAX=5                 # Maximum requests per minute
   CACHE_DURATION=5                 # Cache duration in minutes
   ```
   I have included a file named .env.example which can be taken as a reference.

## Explanation for Authentication

I know that a simple authentication was asked and therefore I did not want to include the use of a database here and there were only 2 ways to do so -

1. Create an API Key and initialise its value in the .env file and the user sends a `POST` request to the `/proxy` route and if the API Key is correct , the corresponding data is displayed. This was very simple and therefore I did not consider it.

2. This is the method used by me. I have used JSON Web Tokens as they are stateless. For this, I have created another endpoint named `/login` and when a user visits this endpoint, a token is created for the given user's `ip-address` and stored in a `cookie` in the client's browser. When the user visits `/proxy` route, cookie is parsed and token is extracted and validated and then the user sees the Github APIs.

## API Endpoints

### `POST /login`

Generates and sets a token for the client in a cookie.

Request:

- Method: POST
- Body: None

Response:

- Status: 200 OK
- Body: `{ "message": "Login successful", "token": "your-jwt-token" }`
- Sets the cookie name `authToken`.

### `GET /proxy`

The proxy route that forwards requests to an external API (e.g., GitHub) and returns the response.

Request:

- Method: GET
- Query Params: (e.g., ?username=octocat for GitHub)

Response:

- Status: 200 OK (on success)
- Status: 429 Too Many Requests (if rate limit is exceeded)
- Status: 403 Unauthorized (if token is invalid or expired)

If the token is expired or not provided, the response will return a 403 status, requiring the user to log in again.

## Authentication Flow

### 1. **Login**

- Send a `POST /login` request to generate and set a token based on your IP address.
- The token is stored in a secure cookie (`authToken`).

### 2. **Access Proxy**

- Send a `GET /proxy` request with the `authToken` cookie.
- The token is validated, and the request is processed if valid. If the token is invalid or expired, a `403 Unauthorized` response is returned.

### 3. **Token Expiry**

- The token expires after 1 hour (configurable), at which point the user must log in again.

## Caching

- Successful responses from the external API are cached for 5 minutes. The cache is checked before making a new request to the external API.
- Cache misses will forward the request to the external API and store the response in the cache for future use.

---

## Rate Limiting

- The rate limit is set to **5 requests per minute** per IP address.
- If the limit is exceeded, the server responds with a `429 Too Many Requests` status.
- This limit can be adjusted by modifying the environment variable `RATE_LIMIT_MAX`.

---

## Error Handling

- If any error occurs during API requests, a `500 Internal Server Error` response is returned.
- Rate limit errors return a `429 Too Many Requests` status.
- Unauthorized errors due to missing or invalid tokens return a `403 Forbidden` status.

## Thanks For Visiting
