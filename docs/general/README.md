# Introduction

Take a look at this boilerplate with our best practices
and tools that help us speed up and simplify the development process.

Using Profiteam React Boilerplate, you get to start your app with our community's current
ideas on what represents optimal developer experience, best practice, most
efficient tooling and cleanest project structure.

- [**CLI Commands**](commands.md)
- [Setting up your editor](editor.md)
- [Tool Configuration](files.md)
- [Server Configurations](server-configs.md)
- [Deployment](deployment.md) _(currently Heroku & AWS specific)_
- [FAQ](faq.md)
- [Gotchas](gotchas.md)

# Feature overview

## Quick scaffolding

Run `npm run generate` in your terminal and choose one of the parts you want
to generate. They'll automatically be imported wherever you want and have
everything set up correctly.

> We use [plop] to generate new components, you can find all the logic and
> templates for the generation in `srcipts/generators`.

[plop]: https://github.com/amwmedia/plop

## Instant feedback

Enjoy the best DX and code your app at the speed of thought! Your saved changes
to the CSS and JS are reflected instantaneously without refreshing the page.
Preserve application state even when you update something in the underlying code!

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

Read more about linting in our [introduction](./introduction.md) and don't forget to setup your by following [our instructions](./editor.md).

# Test coverage

We strive for 100% test coverage and use [Cypress].

[Cypress]: https://github.com/cypress-io/cypress
