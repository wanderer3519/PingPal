# System Design Document

## Overview
The system design document provides an overview of the architecture and components of the PingPal application. It outlines the high-level design decisions, dependencies, and libraries used in the development of the prototype.

## Architecture
PingPal follows a client-server architecture, where the client is a web application and the server is responsible for handling requests and managing data.

### Client
The client-side of PingPal is built using HTML, CSS, and JavaScript. It utilizes the React library for building user interfaces and managing state. React Router is used for handling client-side routing.

### Server
The server-side of PingPal is built using Node.js and Express.js. Node.js provides a runtime environment for executing JavaScript on the server, while Express.js is used as a web application framework. The server communicates with a MongoDB database to store and retrieve data.

## Dependencies and Libraries
PingPal relies on the following dependencies and libraries:

- React: A JavaScript library for building user interfaces.
- NextJS: A React framework, provides authentication, encryption and validation as in built features.
- React Router: A routing library for React applications.
- Node.js: A JavaScript runtime environment for executing server-side code.
- Express.js: A web application framework for Node.js.
- MongoDB: A no SQL database made to keep the design intuitive.

## Setup and Running the Prototype
Setup .env file:
1. Start your own MongoDB server. If you are not registered, please do so by logging into the atlas page and 
register.
// Finish this 


To set up and run the PingPal prototype, follow these steps:

1. Clone the PingPal repository from GitHub: `git clone https://github.com/your-username/pingpal.git`
2. Navigate to the project directory: `cd pingpal`
3. Install the dependencies: `npm install`
4. Set up the MongoDB database and configure the connection details in the `.env` file.
5. Run the server: `npm run start:server`
6. Run the client: `npm run start:client`
7. Access the PingPal application in your web browser at `http://localhost:3000`

Please note that additional steps may be required depending on your specific environment and setup.

## Conclusion
The system design document provides an overview of the PingPal application's architecture, dependencies, and libraries used. It also includes instructions on how to set up and run the prototype. By following these guidelines, you can easily understand the system design and get the PingPal application up and running.