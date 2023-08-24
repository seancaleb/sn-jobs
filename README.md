# SNJOBS (A Full-Stack MERN Application)

---
This repository contains the client (front-end) part of the full-stack application SNJOBS that uses [SNJOBS API](https://github.com/seancaleb/snjobs-backend-api).

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)

## Technologies Used
- TypeScript
- React Query
- Redux Toolkit
- React Hook Form
- React Router
- shadcn/ui
- Zod
- Tailwind CSS
- Vitest
- React Testing Library
- Vite

## Features
### 1. All Users
- Enables Sign In/Sign Out/Sign Up.
- Able to perform CRUD operations on profile.
- Password modification
### 2. Jobseekers
- Allow bookmark/unbookmark a specific job post.
- Permit to submit an application for a specific job post.
- Able to view list of applied/bookmarked jobs.
- Can view list of jobs created by employers.
### 3. Employers
- Allow to perform CRUD operations for a specific job post.
- Able to view list of all applications for a specific job post and all job listings created.
- Can modify the application status of an applicant.

## Installation

### 1. Clone this repository

```bash
git clone https://github.com/seancaleb/sn-jobs.git <YOUR_PROJECT_NAME>
```

- Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.

- Run `npm install` or `yarn install` in order to install the necessary dependencies for this project.

### 2. Run the project locally
- Run `npm run dev` or `yarn dev` to run this project locally.


### 3. Run tests for this project
- Run `npm run test` or `yarn test` to run tests for this project.

### 4. Run the project in production
- Run `npm run build` or `yarn build` to build the project.
- Then, run `npm run preview` or `yarn preview` to run this project in production mode.
