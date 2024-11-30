###### Build stage #######
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

###### Run stage #######
FROM node:18-alpine

WORKDIR /app

# Install serve and json-server
RUN npm install -g serve json-server

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Copy db.json for json-server
COPY db.json .

# Create a startup script
RUN echo '#!/bin/sh\n\
serve -s dist -l 3300 & \
json-server --watch db.json --port 3000 --host 0.0.0.0\n\
wait' > /app/start.sh && chmod +x /app/start.sh

# Expose ports for serve and json-server
EXPOSE 3300 3000

# Start both servers
CMD ["/bin/sh", "/app/start.sh"]
