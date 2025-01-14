
# Stage 1: Build the Vite React app
FROM node:22 AS frontend-builder
# Set working directory for the Vite React app
WORKDIR /app/frontend_wheel
# Copy Vite app dependencies
COPY frontend_wheel/package*.json ./
# Install Vite app dependencies
RUN npm install
# Copy the rest of the Vite app source code
COPY frontend_wheel ./
# Build the Vite app
RUN npm run build
# Stage 2: Set up the Node.js backend
FROM node:22
# Set working directory for the Node.js app
WORKDIR /app
# Copy backend dependencies
COPY package*.json ./
# Install Node.js dependencies
RUN npm install
# Copy the entire project, except files ignored by .dockerignore
COPY . .
# Copy the built React app from Stage 1
COPY --from=frontend-builder /app/frontend_wheel/dist ./frontend_wheel/dist
# Expose the port for the Node.js server
EXPOSE 3000
# Start the Node.js server
CMD ["node", "server.js"]