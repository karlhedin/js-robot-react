# js-robot-react

A tiny js-robot walking around in a room. The model is written in a vanilla ES5 fashion as from [js-robot](https://github.com/karlhedin/js-robot), but the rest of the project is ES6, React & JSX bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app).

## Getting Started
### Install dependencies
Install dependencies with yarn or npm:

```bash
yarn
# or 
npm install
```

### Build
To build, package and minify etc. run the following:

```bash
yarn build
# or 
npm run build
```
The files created in the build step are placed in the **build** folder.

### Run
Open **build/index.html** in your browser. If you prefer you can also serve the files statically, for an example with serve:

```bash
serve -s build/
```

To move the robot around the following commands are valid:

English:

* **L** - turn Left
* **R** - turn Right
* **F** - move Forward

Swedish:

* **V** - sväng Vänster
* **H** - sväng Höger
* **F** - Gå framåt

## Development

### Running the dev server
To run the dev server with all the awesomeness from [create-react-app](https://github.com/facebookincubator/create-react-app) run:
```bash
yarn start
# or 
npm start
```

js-robot-react will now be running on http://localhost:3000/

### Running the tests

The tests can be run like so:

```bash
yarn test
# or 
npm run test
```
