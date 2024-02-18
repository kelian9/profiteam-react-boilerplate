# Command Line Commands

## Initialization

```Shell
npm run setup
```

Initializes a new project with this boilerplate. Deletes the `profiteam-react-boilerplate`
git history, installs the dependencies and initializes a new repository.

> Note: This command is self-destructive, once you've run it the init script is
> gone forever. This is for your own safety, so you can't delete your project's
> history irreversibly by accident.

## Development

```Shell
npm run start
```

Starts the development server running on `http://localhost:8080`

## Cleaning

```Shell
npm run clean
```

Deletes the example app, replacing it with the smallest amount of boilerplate
code necessary to start writing your app!

> Note: This command is self-destructive, once you've run it you cannot run it
> again. This is for your own safety, so you can't delete portions of your project
> irreversibly by accident.

## Generators

```Shell
npm run generate
```

Allows you to auto-generate boilerplate code for common parts of your
application, specifically `component`s, and `entity`. You can
also run `npm run generate <part>` to skip the first selection. (e.g. `npm run generate entity`)

### Development

```Shell
npm start
```

Starts the development server and makes your application accessible at
`localhost:8080`. Changes in the application code will be hot-reloaded.

### Host and Port

To change the host and/or port the app is accessible at, pass the `--host` and/or `--port` option to the command
with `--`. E.g. to make the app visible at `my-local-hostname:4000`, run the following:
`npm start -- --host my-local-hostname --port 4000`

## Building

```Shell
npm run build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the `dist` folder.

Upload the contents of `dist` to your web server to
see your work live!

## Testing

See the [testing documentation](../testing/README.md) for detailed information
about our testing setup!

```Shell
npm run test:ui
```

Tests your application with the e2e tests specified in the `**/test.spec.cy.tsx` files
throughout the application.

If you want to open tests ui in a browser and look for details, run:

```Shell
npm run cypress:open
```

### Dependency size test

```Shell
npm run analyze
```

This command will generate a `stats.json` file from your production build, which
you can upload to the [webpack analyzer](https://webpack.github.io/analyse/) or [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/). This
analyzer will visualize your dependencies and chunks with detailed statistics
about the bundle size.

## Linting

```Shell
npm run lint
```

Lints your JavaScript, TypeScript and your Styles and tries to fix any errors it finds.

```Shell
npm run lint:eslint:fix -- .
```
