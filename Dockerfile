FROM mcr.microsoft.com/playwright:v1.62.1-noble

# Set working directory
WORKDIR /app

# Copy test code
COPY tests /app/tests
COPY support /app/support
COPY package.json /app/
COPY package-lock.json /app/
COPY playwright.config.ts /app/
COPY cucumber.json /app/
COPY tsconfig.json /app/

# Install dependencies
RUN npm cache clean --force
RUN npm install -g playwright
RUN npm install --legacy-peer-deps