<p align=center>
  <img src=https://img.shields.io/badge/node-v8.9.4-brightgreen.svg?style=flat-square alt="node" />
  <img src=https://img.shields.io/badge/npm-v5.6.0-blue.svg alt="npm" />
  <a href=https://github.com/Vets-Who-Code/vwc-site/blob/master/LICENSE>
    <img src=https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square alt="License: MIT" />
  </a>
  <a href=https://github.com/Vets-Who-Code/vwc-site/blob/master/.github/contributing.md>
    <img src=https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat-square alt="Contributions Welcome" />
  </a>
</p>

<p align=center>
  <img src=https://avatars1.githubusercontent.com/u/18350560?s=200&v=4 alt="VWC Logo" />
</p>

# Vets Who Code Web App

The Vets Who Code Web App is a Jamstack Applicaton designed for speed and to ease the learnign curve of our veterans contributing to open source.
By doing this we can teach our veterans with practical use cases, all the while making a professional product that is fast and serverless.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need the following properly installed on your computer.

- [Git](http://git-scm.com/)
- [Node](http://nodejs.org/)
- [NVM](https://github.com/creationix/nvm)
- [Gatsby](https://www.gatsbyjs.org/)

### Installing

In a terminal window run these commands.

```sh
$ git clone git@github.com:Vets-Who-Code/vwc-site.git
$ cd vets-who-code-app
$ nvm install
$ yarn
$ yarn develop
```

You should be able to view the website locally at `http://localhost:8000/`.

<!-- ## Tests -->

### Testing

In a terminal window run these commands to install jest globally and run the jest test suite.

```sh
$ cd vets-who-code-app
$ yarn test
```

<details>
<summary>If you get a Watchman Error/Warning</summary>
<br>

```sh
$ watchman shutdown-server
$ brew update
$ brew reinstall watchman
```
</details>

<br>

In a terminal window run these commands to run the jest test suite in watch mode.

```sh
$ npm -i -g jest
$ cd vets-who-code-app
$ yarn test:watch
```

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

Please checkout our [roadmap](https://github.com/Vets-Who-Code/vwc-site/blob/update/README/roadmap.md) for details of upcoming features.
