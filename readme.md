# Library Management System

This project is a full-stack Library Management System with separate client and server components.

## Live Demo

- **Client:** [https://srs-library-client.vercel.app/](https://srs-library-client.vercel.app/)
- **Server:** [https://srs2-library-server.vercel.app/](https://srs2-library-server.vercel.app/)

## Project Structure

The project is divided into two main folders:

- [Client](https://github.com/devsrsihab/library-management/tree/master/client)
- [Server](https://github.com/devsrsihab/library-management/tree/master/server)

## Client-side

The client-side of the application is built using modern web technologies.

### Technologies Used

- Next.js
- TypeScript
- Redux (for state management)
- Tailwind CSS (for styling)

### Setup and Installation

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Server-side

The server-side of the application handles the backend logic and database operations.

### Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB (assumed based on typical MERN stack)

### Setup and Installation

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Development Approach

As outlined in the server's README:

1. Create Interfaces
2. From interfaces, create Schemas
3. From Schemas, create Models
4. From Models, create Queries

## Additional Configuration

Both client and server directories contain configuration files for:

- ESLint
- Prettier
- TypeScript

Ensure to review and adjust these configurations as needed for your development environment.

## Deployment

The server directory includes a `vercel.json` file, indicating that the project is set up for deployment on Vercel.

## Contributing

Contributions to the project are welcome. Please ensure to follow the existing code style and add unit tests for any new features.

## License

This project is open source. Please refer to the LICENSE file in the repository for more information.
