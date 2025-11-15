# Use official Node image
FROM node:20-alpine

WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

EXPOSE 3000

# Start app
CMD ["npm", "start"]
