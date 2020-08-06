# Vortexa Task

## Install and run

### Requirements
 - Node.js, can be downloaded here: https://nodejs.org/en/download/
 - npm (package manager for Node.js) - version 6.9.0 or higher is needed

Once cloned the repo, go to the folder and execute the command below to install all packages.

```
npm install
```

Once the installation is complete, run the command below to start to web app.

```
npm start
```

## Features explained

When the application is started, you can see all ramps displayed on the map.

In the right panel, you will see the number of ramps per each construction material and size on the screen. When you zoom in and out, number of ramps on the screen changed which triggers changed in right panel.

If you want to filter ramps by construction material or size, simple click the property (the left column in the table) once a property is selected, the background colour will be changed to green. Click the Clear Selection button to unselect.

## Code style

In order to ensure the code has a level of clarity that makes reading and maintaining easier for anyone who has to work on it, ESLint is configured and used. The JavaScript Style Guide used for this web app is Airbnb. Prettier is also used to make code look better. Scripts below have configured. Details of each script can be found in the file `package.json`

```
npm run lint
npm run lint-fix
npm run lint-fix-win
npm run lint-prettier
npm run lint-prettier-fix
```

PS do not use `npm run lint-fix-win` on Mac, use `npm run lint-fix` instead