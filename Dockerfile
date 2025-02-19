# Use an official Node.js image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the React app
RUN npm run build

# Install `serve` to serve the built files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to serve the built React app
CMD ["serve", "-s", "build", "-l", "3000"]



#FROM node:latest
#WORKDIR /apps
#COPY . .
#RUN npm install
#EXPOSE 3000
#CMD ["node", "src/index.js"]