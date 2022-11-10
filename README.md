# Interview Scheduler

Interview Scheduler is a React app that allows you to book, edit or cancel appointments based on available times and interviewers.
Interview Scheduler is a single page application (SPA), built using React.
Data is persisted by the API server using a PostgreSQL database.
The client application communicates with an API server over HTTP, using the JSON format.
Jest tests are used through the development of the project.

# Features

Appointments and available spots during weekdays are displayed and color coded.
User switch between days by selecting required day.
User can create an appointment by clicking on Add button in an empty spot.
User can edit and delete appointment by hovering over the respective appointment and can choose from displayed options.
User is presented with a confirmation when they attempt to cancel an interview.
User is shown an error if an interview cannot be saved or deleted.
Number of available spots are updated when an interview is booked or canceled

# Stack:

## Front-end:

- [React](https://reactjs.org/)
- [SASS](https://sass-lang.com/)
- [Axios](https://github.com/axios/axios)

## Back-end

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) _(Stretch)_

## Database

- [PostgreSQL](https://www.postgresql.org/)

## Testing

- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)

## UI Component Design

- [Storybook](https://storybook.js.org/)


# Screenshots

### Component Tree of the App

![Component Tree of the Scheduler App](https://github.com/)

### Component Flow of the App

![Component Flow](https://github.com/)

### Main View

![Screenshot 1](https://)


# Setup Instructions:

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## The API Server

```sh
Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory (NOT within our current scheduler directory) on your host machine (not in our Vagrant machine).
```