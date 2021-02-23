# COVID 19 App

COVID 19 App is a web application used to display COVID-19 case and death statistics per country on a weekly basis.

## Installation

First, cd into a local directory and clone this repository:
```
git clone https://github.com/bacevicius/covid19-app.git
```

Then use the package manager [npm](https://www.npmjs.com/get-npm) to install this application. It will take a few minutes to install.

```bash
cd covid19-app

npm install
```

## Starting the application
You can start the application in a few different ways:

### Production
If you only care about the final application, run the following command:

```
npm run start-prod
```
This will start the application in production mode. 

It will build a production version of frontend which will then be served by the express server.

You can then access the app by going to http://localhost:3001/ in your browser. 

### Development
If you would like to edit the application and see the code changes live, run:
```
npm run start-dev
```
This will start a both live-reloading React development server as well as a live-reloading express server, letting you edit the code and see your changes reflected instantly.

In this case, you can access the app on http://localhost:3000/, and the express server on http://localhost:3001/.


## License
[MIT](https://choosealicense.com/licenses/mit/)