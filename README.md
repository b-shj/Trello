# Trello Clone
A Full Stack clone of Trello with the __MERN__ stack (MongoDB/Express/React/Node)

## Description
Trello Clone is a fully functioning task management Web App. The App supports personal Task Boards, allowing 
simple and organized task tracking that separates overarching goals or topics from specific tasks. Trello Clone
has both a minimal and clean UI that promotes well organized tasking.
Landing Page             
:-------------------------:
![](https://dl.dropboxusercontent.com/s/1kfggoalknf4nfq/Trello%20Landing%20Page.png?dl=0)

## Features
* UI written in modern __React__, using ES6 principles and functional components with React Hooks
* Local frontend state management with the Context API
* UI written exclusively with custom CSS styling 
* Bootstrapped with create-react-app
* Backend written in __NodeJS/Express__
* Data storage with __MongoDB__
* User details managed with HTTPS REST architecture
* Sessions managed with local storage

## Installation
* Create a db named trelloclone at mongodb atlas and create collections with models in ```server\models```
* Clone this repository ```https://github.com/b-shj/Trello.git```
* Update Mongo connection string details in ```server\index.js```
* Run ```npm install``` in both ```server``` and ```client``` to install dependencies
* cd into ```server``` and ```client```, and ```npm start``` respectively to spin API and Frontend servers
* Frontend should be running on ```http://localhost:3000``` and Express API on ```http://localhost:5000```

## Live App
* __The Live App is here__
* https://trelloclonebyshj.netlify.app/
* Sign up or use demo account:
* __Email__: demo@gmail.com
* __Password__ Demo123 (case-sensitive)
