FROM node:18

# Set working directory
WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the backend code
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["node", "server.js"]
