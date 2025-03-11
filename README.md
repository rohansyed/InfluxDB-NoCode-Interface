# InfluxDB NoCode Interface

## Overview

This project is a **no-code interface** designed for **InfluxDB OSS** to simplify querying and visualising time-series data without requiring programming knowledge. It integrates with **Grafana** to enhance data visualisation capabilities. The goal is to make data exploration and trend analysis accessible to users who are unfamiliar with InfluxDB's **Flux query language**.

## Features

- **Single-Page Application (SPA)** for seamless navigation.
- **Visual Query Builder** with drag-and-drop functionality for selecting buckets, measurements, and fields.
- **Automatic Flux Query Generation**, with the option to view and edit queries manually.
- **Data Visualization** using **Grafana**, allowing users to generate and save dashboards.
- **Authentication System** to ensure secure access.
- **Dockerized Deployment** for easy setup and scalability.

## Tech Stack

### Frontend

- **React** with **TypeScript**
- **Vite** for fast development builds
- **Tailwind CSS** for styling

### Backend

- **Node.js** with **Express.js**
- **InfluxDB OSS v2.7** for time-series data storage
- **Grafana v9.5.3** for visualisation
- **Docker & Docker Compose** for containerisation

## Installation and Setup

### Prerequisites

- Ensure **Docker Desktop** is installed and up to date.
- Clone the repository:
  ```sh
  git clone "https://github.com/rohansyed/InfluxDB-NoCode-Interface.git"
  ```
- Navigate into the project directory:
  ```sh
  cd InfluxDB-NoCode-Interface
  ```

### Running the Project

1. Start the Docker containers by running:
   ```sh
   docker compose up --build
   ```
2. Once built, access the services on the following ports:
   - **Frontend**: `http://localhost:5173`
   - **Backend**: `http://localhost:3001`
   - **InfluxDB OSS UI**: `http://localhost:8086`

### Notes

- On subsequent runs, you can start the project without rebuilding by using:
  ```sh
  docker compose up
  ```
- Every time you restart the environment, you must **log in to InfluxDB OSS** to gain access.
- \*\*All services are accessible via \*\*\`\`.

## Usage

1. **Log in to InfluxDB OSS** on `http://localhost:8086`.
2. Use the **Visual Query Builder** to create and modify queries.
3. View query results in **Grafana** and save dashboards as needed.
4. The system automatically generates the **Flux query code**, which can be modified manually if desired.

## Future Improvements

- **Advanced Querying**: Support for pivoting and joining multiple measurements.
- **Enhanced Grafana Integration**: Editing of existing dashboards directly in the interface.
- **User Roles & Permissions** for different levels of access control.

## Contributors

A special thank you to Yifan Lu for assistance with frontend development.

## License

MIT License

