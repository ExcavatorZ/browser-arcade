# Browser Arcade

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular)
![.NET](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql)

[![Frontend Version](https://img.shields.io/docker/v/excavatorz/browser-arcade-frontend?label=Frontend&color=orange)](https://hub.docker.com/r/excavatorz/browser-arcade-frontend)
[![Frontend Pulls](https://img.shields.io/docker/pulls/excavatorz/browser-arcade-frontend)](https://hub.docker.com/r/excavatorz/browser-arcade-frontend)
[![Backend Version](https://img.shields.io/docker/v/excavatorz/browser-arcade-backend?label=Backend&color=orange)](https://hub.docker.com/r/excavatorz/browser-arcade-backend)
[![Backend Pulls](https://img.shields.io/docker/pulls/excavatorz/browser-arcade-backend)](https://hub.docker.com/r/excavatorz/browser-arcade-backend)

## Description

Personal full-stack web application containing several browser games, user authentication, score tracking and profile statistics. The project is built with Angular, ASP.NET Web API and PostgreSQL, and can be run locally using Docker.

## Installing dependencies

Every command can be run in the root directory.

### Frontend:

Install the frontend dependencies:

`npm run install`

### Backend:

Restore the backend dependencies:

`dotnet restore`

## Running instructions

Every command can be run in the root directory.

### Docker 🐋:

Requirements:

- Docker Desktop

Start all services:

`docker compose up -d`

Rebuild after making changes:

`docker compose up --build -d`

Stop all services:

`docker compose down`

### Development Mode

#### Frontend:

`npm run serve`

#### Backend:

`dotnet run --project backend`

For hot reloads, add the watch flag:

`dotnet watch run --project backend`

## Testing

#### Frontend:

Run the frontend tests using the Vitest test runner:

`npm run test`

#### Backend:

Run the backend tests using xUnit:

`dotnet test`
