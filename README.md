# node-docker

This repository contains a boilerplate code for a Node.js/Express application using TypeScript and Docker.
The application includes MongoDB for CRUD operations, session-based authentication with Redis, and Nginx for load balancing across multiple Node.js containers.

## Features
- Node.js & Express: A robust framework for building web applications and APIs.
- TypeScript: Static typing for enhanced code quality and developer experience.
- MongoDB: A NoSQL database for handling CRUD operations.
- Authentication: Session-based authentication using Redis.
- Nginx: Acts as a reverse proxy and load balancer for distributing requests across multiple Node.js containers.
- Docker: Containerization for easy deployment and scalability.

## Architecture Overview
![Architecture Overview](https://github.com/kuruxxii/node-docker/assets/93859201/9995884b-373d-4d94-bcf0-a96fc5d6d39a)


## Getting Started

### Prerequisites
Ensure you have the following installed:
- Docker
- Docker Compose

### Installation
Clone the repository:
```
git clone https://github.com/kuruxxii/node-docker.git
cd node-docker
```

### Usage

#### Development Mode
Build image and run container:
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```
Build image and run multipe app containers (e.g., 2 app containers):
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build --scale app=2
```
Stop and delete container, remove anonymous volumes but not named volumes:
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```
Stop and delete container, remove both anonymous and named volumes:
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

#### Production Mode
Build image and run container:
```
npm run build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```
Stop and delete container:
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
```

## Additional Resources
For a more detailed walkthrough, feel free to check out my blog post at https://zihanlin.hashnode.dev/setting-up-a-typescript-nodejs-application-with-express-in-a-container.
