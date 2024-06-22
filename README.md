# Project Name

Data Process and Display: creating a web application that processes and displays data from a CSV file.

Please refer to the backend repository https://github.com/DongningLi/RAI-ass-backend

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Directory Structure](#Directory-structure)

## Features

- Upload CSV file
- Error handling snackbar
- Download file

## Technologies Used

- Next.js
- Tailwinds

## Installation

```bash
# Clone the repository
$ git clone
# Go to the root directory
$ cd my-next-app
# Build docker image
$ docker build -t raiassfrontend .
```

## Directory Structure

```bash
/RAI-ASS-FRONTEND
|-- /my-next-app
|   |-- /app                # Core functionalities for type detect and infer
|   |   /-- /components     # Reusable components
|   |   /-- /context        # Context for saving global state
|   |   /-- /interface      # Common interface
|   |   /-- /utils          # Utility functionalities
|   |   /-- globals.css     # Global css style
|   |   /-- layout.tsx      # Shared layout component
|   |   /-- page.tsx        # Index page
|   |-- Dockerfile      # Dockerfile
|   |-- /public             # Some public materials
|-- .gitignore              # Files to ignore
|-- README.md               # Project overview and guidelines
```
