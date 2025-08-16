FROM node:18-alpine

# Install Python and required packages for ML scripts
RUN apk add --no-cache python3 py3-pip python3-dev build-base

# Create and activate virtual environment
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python packages in virtual environment
RUN pip install --upgrade pip
RUN pip install numpy pandas scikit-learn scipy matplotlib

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy source code
COPY . .

# Create directory for shared assets
RUN mkdir -p /app/shared_assets

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
