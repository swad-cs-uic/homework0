FROM ubuntu:22.04

# Install Node.js 20
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

EXPOSE 3000

CMD ["npm", "run", "test"]