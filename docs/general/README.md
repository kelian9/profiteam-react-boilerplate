# Introduction

Take a look at this boilerplate with our best practices
and tools that help us speed up and simplify the development process.

Using Profiteam React Boilerplate, you get to start your app with our community's current
ideas on what represents optimal developer experience, best practice, most
efficient tooling and cleanest project structure.

# Tech Stack
See a complete list of the dependencies in `package.json`.

## Core

- [ ] [React](https://facebook.github.io/react/)
- [ ] [React Router](https://github.com/remix-run/react-router)
- [ ] [Redux](http://redux.js.org/)
- [ ] [Redux Toolkit](https://redux-toolkit.js.org/)
- [ ] [TypeScript](https://www.typescriptlang.org/)
- [ ] [Webpack](https://webpack.js.org/)
- [ ] [Sass/Scss](https://sass-lang.com/)

## Testing

- [ ] [Cypress](http://facebook.github.io/jest/)

## Linting

- [ ] [ESLint](http://eslint.org/)
- [ ] [Prettier](https://prettier.io/)
- [ ] [stylelint](https://stylelint.io/)

# Feature overview

## Generators

Run `npm run generate` in your terminal and choose one of the parts you want
to generate. They'll automatically be imported wherever you want and have
everything set up correctly.

> We use [plop] to generate new components, you can find all the logic and
> templates for the generation in `srcipts/generators`.

[plop]: https://github.com/amwmedia/plop

## Useful components

A set of very useful components that implement frequently encountered logic, such as the thing we call **CRUD Page**.
If you need to do a lot of pages with filter and sorting logic, data list as a table with pagination, forms for creation and editing and quit a bit more, please look at the **BaseCrudPage** in components section.

## Robust and Modular Structure

The boilerplate offers a robust and modular structure that makes it easy to organize and maintain your codebase.

## Pre-Configured Webpack

Profiteam React Boilerplate includes a pre-configured Webpack setup that optimizes your build process and simplifies the management of assets.

## Predictable state management

Unidirectional data flow allows for change logging and time travel debugging.

We use Redux to manage our applications state. We have also added optional
support for the [Chrome Redux DevTools Extension] – if you have it installed,
you can see, play back and change your action history!

[chrome redux devtools extension]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

## Next generation JavaScript

Use ESNext template strings, object destructuring, arrow functions, JSX syntax
and more, today.

## Static code analysis

Focus on writing new features without worrying about formatting or code quality. With the right editor setup, your code will automatically be formatted and linted as you work.

# Test coverage

The project includes e2e testing and code coverage tools to ensure high-quality and bug-free code. We strive for 100% test coverage and use [Cypress].

[Cypress]: https://github.com/cypress-io/cypress
