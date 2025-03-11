# Dockerfile at the root of your project

# Use official Node.js LTS image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies for both frontend and backend
RUN npm install

# Copy all files into the working directory
COPY . .

# Build the frontend for production
RUN npm run build

# Expose necessary ports (3001 for backend, 5173 for frontend)
EXPOSE 3001 5173

# Run both the backend and frontend services using npm concurrently
CMD ["npm", "run", "start-services"]
