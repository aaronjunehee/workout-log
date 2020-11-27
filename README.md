# Project 

This project is designed to apply all your learnings from the Full-Stack Course. By the end of the course your project should have two major components:

- an Express server for storing and retrieving data from a Mongo database
- a React frontend interface for presenting the data to users

Successful recent projects ideas have included,

- A "Good Habits" tracking system
- Restaurant reservation system
- Real estate house hunting log
- Expense journal
- Movie reviews app

## Project proposal

Once you have an idea, we want you to fill out a project proposal form (a link will be shared in your course channel) and review it with your instructor or mentor during project-work time. This will give us an opportunity to provide feedback and help you identify the minimum viable product and what should be considered stretch goals for your idea.

Remember that you can have as many stretch goals as you want, but the minimum viable product is what's stated on your scope document and you are committed to producing that by the deadline.

> It is always better to under-promise and over-deliver.

## Project feedback

Submitted projects will be reviewed and you'll get constructive feedback. We won't be grading your project in this course. This is an opportunity for you to confirm what you've learned, and identify areas that may require further practice. 

No matter what the state of your project by the deadline we strongly encourage you to submit your project for this feedback.

## Requirements

- Clean, organized, and properly indented code
- A backend server using Express
- A frontend using React
- Data served from the backend over an JSON API coming from either
  - a Mongo database
  - or, a 3rd-party API (restructured for your own project's needs)
- Using best practices for,
  - authenticating your backend API
  - validating or sanitizing user input
  - managing 3rd-party API keys securely
- Project is deployed live online
- Includes the text "Created at Juno College" a link to the [Juno website](https://junocollege.com) somewhere (typically in the footer).

## Project starter files

This directory contains some starter template files for setting up a project codebase with both a backend server and frontend client in one. Follow the directions below to use this template for getting started with your project.

### Prerequisites
Before we begin you should have already created a new GitHub repository for your project. You can do so now by going to GitHub's ['Create a New Repository' page](https://github.com/new).

### Setup
Copy this `project/` directory into a new location on your computer.

```
# Example Copy Command
$ cp -R project/ ~/junocollege/some-new-folder
               ^                              ^
               |                              |
        HAS backslash                         |
                                        NO backslack
```

Inside the new project folder (eg. ~/some-new-folder) run the following command:
`git init`. This will initialize an empty git repository in this folder.

### Install Dependencies
To begin using this repository please run the following command.
> `npm install`

### Getting Started
Running the following command will prompt you to enter some information. This
well setup this folder to now point at the repository that you enter while
filling in the prompt.

```shell
npm run init
```

You will be prompted for the following things:
1. **Project Name**: The name you want to call the project
2. **GitHub username**, and **GitHub repository**: Your GitHub username and the name of the repository you created to hold this project.
> Ex. hackeryou/tomatoproject
3. **Author**: Your name.

Once you've completed the prompts, you'll be shown what the project package file will look like. An example is listed below. Simply type `y` or `yes` to complete the process.
```
{
  "name": "tomatoproject",
  "version": "1.0.0",
  "description": "Juno Full-Stack Development Project",
  "main": "index.js",
  "scripts": {
    "init": "node scripts/init.js",
    "test": "react-scripts test",
    "start:server": "nodemon api/server.js --ignore client",
    "start:client": "react-scripts start",
    "build:client": "react-scripts build",
    "git:remote:set": "git remote set-url origin https://github.com/hackeryou/tomatoproject.git"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/hackeryou/tomatoproject.git"
  },
  "keywords": [],
  "author": "Michael Perrotte",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/HackerYou/con-ed-full-stack/issues"
  },
  "homepage": "https://github.com/HackerYou/con-ed-full-stack#readme",
  "dependencies": {
    "body-parser": "^1.18.3",
    "eslint": "^5.12.0",
    "express": "^4.16.4",
    "mongoose": "^5.6.11",
    "init-package-json": "^1.10.3",
    "react": "^16.8.4",
    "react-dom": "^16.8.4"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ],
  "semistandard": {
    "ignore": [
      "build/**"
    ]
  }
}


Is this OK? (yes)
```

After this process has been completed, you'll notice that your project folder `package.json` file has had its git configuration set to your GitHub repository.

The final step of the process is to run the newly created script that the initialization process made. This script is found in the `scripts` object of the `package.json` file, with the key `git`. 

_Note: This script expects the existence of an `.git/` folder_. 

To run the script, type the following in your command line:

```shell
npm run git
```

#### Confirmation
If you run the following command in the folder, the output should have an
`origin` entry with a url to your created repository on GitHub.

```shell
git remote -v
```

## Usage

> Start API server

```
$ npm run start:server
```

> Start Webpack Server

```
$ npm run start:client
```
