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

# Expose ports for serve and json-server
EXPOSE 3400 3200

# Set environment variable
ENV NODE_ENV=development

CMD ["sh", "-c", "serve -s dist -l 3400 & json-server db.json --port 3200 --host 0.0.0.0"]
