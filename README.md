
# React Challenge: Task Manager

This project is a task management application built with React and Vite as part of a coding challenge.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete
- Filter tasks by status
- Responsive design

## Technologies Used

- React
- Vite
- JSON Server (for mock backend)
- CSS

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/react-challenge.git
   ```

2. Navigate to the project directory:
   ```
   cd react-challenge
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application

1. Start the JSON Server (mock backend):
   ```
   npx json-server --watch db.json --port 3200
   ```

2. In a new terminal, start the Vite development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

3. Open your browser and visit `http://localhost:5173`

## Building for Production

To create a production build, run:
```
npm run build
```
or
```
yarn build
```



### Build with Docker

1. Execute the docker build command
```
docker build -t text-analyzer-challenge:latest .
```

2. Then execute the docker run command
```
docker run -p 3400:3400 -p 3200:3200  react-challenge:latest
```

3. Access the application on [http://localhost:3400](http://localhost:3400)


### Build with Traefik on Production Server (Under Maintenance)

 **Please note that this is still in maintenance and may not be working as expected.**

 This setup assumes that Traefik is already running on ports 80 and 443, and is connected to the 'web' network in Docker


1. Clone the repository:
   ```
   git clone https://github.com/your-username/react-challenge.git
   ```

2. Navigate to the project directory:
   ```
   cd react-challenge
   ```

3. Execute the docker build command
```
docker build -t text-analyzer-challenge:latest .
```

4. Edit the `docker-compose.yml` file to match your domain name and TLS settings :

```
services:
  **container-name**:
    container_name: **container-name**
    image: react-challenge:latest
    restart: unless-stopped
    ports:
      - **"3400:3400"**
      - **"3200:3200"**
    labels:
      - traefik.enable=true
      - traefik.http.routers.**intended-name**.entrypoints=web,websecure
      - traefik.http.routers.**intended-name**.tls=true
      - traefik.http.routers.**intended-name**.tls.certresolver=lets-encrypt
      - traefik.http.services.**intended-name**.loadbalancer.server.port=**3400**
      - traefik.http.routers.**intended-name**.rule=Host(**`intended-name.domain.com`**)
    networks:
      - web

```

4. Execute the docker-compose.yml command:
```
docker-compose up -d
```

5. Finally, access the web ui via 

After deployment, you can access the application through the following URLs:

Local Development

- Web UI: `http://your-ip:3400`
- API: `http://your-ip:3200`

Production

- Web UI: `https://intended-name.com`

### Pre-deployed Versions

For convenience, you can also access pre-deployed versions of this application:

Web UI

- http://115.187.22.70:3400/
- https://react-challenge.aimanhaziq.my

JSON Mock Server (API)

- http://115.187.22.70:3200/

Note: The pre-deployed versions are for demonstration purposes and may not reflect the latest updates to the codebase.

