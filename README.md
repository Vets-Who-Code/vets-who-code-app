<p align=center>
  <img src=https://img.shields.io/badge/node-v10.16.0-brightgreen.svg?style=flat-square alt="node" />
  <img src=https://img.shields.io/badge/npm-v5.6.0-blue.svg?style=flat-square alt="npm" />
  <a href=https://github.com/Vets-Who-Code/vwc-site/blob/master/LICENSE>
    <img src=https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square alt="License: MIT" />
  </a>
  <a href=https://github.com/Vets-Who-Code/vwc-site/blob/master/.github/contributing.md>
    <img src=https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat-square alt="Contributions Welcome" />
  </a>
  <img src=https://img.shields.io/netlify/bca54b7a-886c-4816-b7dc-1045c7e0abc4?style=flat-square alt="Deployment Status">
</p>

<p align=center>
  <img src=https://avatars1.githubusercontent.com/u/18350560?s=200&v=4 alt="VWC Logo" />
</p>

# Vets Who Code Web App

The Vets Who Code Web App is a Jamstack Application designed for speed and to ease the learning curve of our veterans contributing to open source.
By doing this we can teach our veterans with practical use cases, all the while making a professional product that is fast and serverless.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need the following properly installed on your computer.

- [Git](http://git-scm.com/)
- [Node](http://nodejs.org/)
- [NVM](https://github.com/creationix/nvm)
- [Gatsby](https://www.gatsbyjs.org/)

## Installing

In a terminal window run these commands.

```sh
$ git clone git@github.com:Vets-Who-Code/vwc-site.git
$ cd vets-who-code-app
$ nvm install
$ yarn
$ yarn develop
```

You should be able to view the website locally at `http://localhost:8000/`.

### Running the Blog

**All Content from Contentful is disabled by default. Please reach out in the `#product` channel in slack to request api keys.**

```sh
$ git clone git@github.com:Vets-Who-Code/vwc-site.git
$ cd vets-who-code-app
$ nvm install
$ yarn develop -c
```

> **Your package.json and node modules will be updated automatically.**

<details>
<summary>yarn develop has a couple of commands configured</summary>
<br>

```
1. yarn develop -h | --help will print out available options
2. yarn develop -c | --contentful will enable the contentful content
3. If you have not configured a `.env` file yarn develop -b will walk you
   through the steps to configure this file
```

### Create a new `.env` file in the root of your project

```sh
$ touch .env
```

### Add necessary api keys to your new `.env` file.

> **Reference the .env.example file for available keys.**

<details>
<summary>If you get an error on start up</summary>
<br>

```
1. Validate you ran yarn develop -c
2. Check that your keys are correct
3. If you still are facing issues reach out to the #product channel in slack
```

</details>

### Once you have completed your edits please run the following command

```sh
$ yarn disable: blog
```

> **This will remove the modules needed to run the blog and clean up the lock file. Commit your changes as normal.**

> If you are seeing a ghooks error in the console when committing and pushing your code run `node ./scripts/remove-git-hooks.js` in the terminal.

<!-- ## Tests -->

## Testing

In a terminal window run these commands.

```sh
$ cd vets-who-code-app
$ yarn test
```

<details>
<summary>If you get a Watchman Error/Warning</summary>
<br>

```sh
~ watchman shutdown-server
~ brew update
~ brew reinstall watchman
```

</details>

<br>

In a terminal window run these commands to run the jest test suite in watch mode.

```sh
$ cd vets-who-code-app
$ yarn test:watch
```

<details>
<summary>The following options are available when running watch mode</summary>
<br>

<p align=center>
  <img src=./.github/jest-options.png alt="Jest Options" />
</p>
</details>

In a terminal window run these commands to view the jest coverage report.

```sh
$ cd vets-who-code-app
$ yarn test:coverage
$ yarn view:coverage
```

In a terminal window run these commands if you need to update a snapshot.

```sh
$ cd vets-who-code-app
$ yarn test --updateSnapshot
```

<!-- ## Deployment -->

## Contributing

Please read [contributing](https://github.com/Vets-Who-Code/vwc-site/blob/master/.github/contributing.md) for details on our code of conduct and the process for submitting issues and/or pull requests.

[CONTRIBUTORS](https://github.com/Vets-Who-Code/vwc-site/graphs/contributors)

## License

This project is licensed under the MIT License - please see [license](https://github.com/Vets-Who-Code/vwc-site/blob/master/LICENSE) for more details.

<!-- ## Acknowledgements -->

## Roadmap

Please check out our [roadmap](https://github.com/Vets-Who-Code/vwc-site/blob/update/README/roadmap.md) for details of upcoming features.
