# REST API

A simple E-commerce REST API.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- npm package manager installed
- MongoDB installed and running

## Tech Stack

- [Node.js](https://www.nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Packages Used

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [colors](https://www.npmjs.com/package/colors)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/maaz25925/rest_api.git
   ```

2. Navigate to project directory:

   ```bash
   cd rest_api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the project root and set the following environment variables (or you can customize them however you like):

   ```bash
   PORT=5000

   ACCESS_TOKEN_SECRET=1b73ec43f6db290780430dcf561c5e1ae04c5cb4046ccf7a8f12e44149f26e040d54d07b7c0455a9b014b59a14ff708d565a8d007e330b7894e17482179a86cf

   REFRESH_TOKEN_SECRET=c6ebc7c20605d67704022cddb4fab804d42cd5399d9e470c952222bf3ba66fa99473b52a0450e6d05f278a17dab4358777c57b37526003e2fb87d9c03d08b953

   JWT_SECRET=8a95b7bd7242849ed971047d7bcbe5f222e0758030f5420b8c86269a7c52e3a3abac330c6d6941b9c956649e1a577cd6cd627c77b05207a31ba13dd4ef9661d8

   MONGO_URI=mongodb://localhost:27017/UnityLabs

   ACCESS_TOKEN_EXPIRY=15m

   REFRESH_TOKEN_EXPIRY=7d
   ```

## Running the Application

1. Start the server:

   ```bash
   npm start
   ```

   The server will be running on http://localhost:5000/

## NOTE

For the development of Frontend, port 3000 has been allowed to access the data.
