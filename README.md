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

The Vets Who Code Web App is a Jamstack Applicaton designed for speed and to ease the learning curve of our veterans contributing to open source.
By doing this we can teach our veterans with practical use cases, all the while making a professional product that is fast and serverless.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need the following properly installed on your computer.

- [Git](http://git-scm.com/)
- [Node](http://nodejs.org/)
- [NVM](https://github.com/creationix/nvm)
- [NextJS](https://nextjs.org/)

## Installing

In a terminal window run these commands:

### 1. Clone the Repo

Download the repository from GitHub using `git clone`:

```sh
git clone https://github.com/Vets-Who-Code/vets-who-code-app.git
```

<p>
<img src="public/images/readme/clone.jpg" alt="Using git clone" width="800px" />
</p>

This may take a few minutes.

### 2. Change Directory

Change into the newly cloned directory:

```sh
cd vets-who-code-app
```

<p>
<img src="public/images/readme/cd.jpg" alt="Changing to the app directory" width="800px" />
</p>

### 3. Install Node.js

Using `nvm install` will install the version of Node.js required by the VWC app:

```sh
nvm install
```

<p>
<img src="public/images/readme/nvm.jpg" alt="Installing Node with NVM" width="800px" />
</p>

### 4. Install Dependencies

`npm install` is how we install React, Next, Bootstrap, and every other piece of tech that the app requires. This will also take a few minutes.

```sh
npm install
```

There will be **a lot** of warnings and other messages that display, but this is normal.

<p>
<img src="public//images/npm1.jpg" alt="Installing dependencies witn npm" width="800px" />
</p>

<p>
<img src="public/images/npm2.jpg" alt="Installing dependencies with npm continued" width="800px" />
</p>

### 5. Environment Variables

Environment variables hold secret API keys and are needed to run the blog by connecting to the Contentful API.

We can create a default `.env `file that will use mock data for the blog when running it locally. Use the following command from the root of the `vets-who-code-app` directory:

```sh
cp .env.example .env
```

<p>
<img src="public/images/env.jpg" alt="Creating the .env file" width="800px" />
</p>

### 6. Run the App

Finally, we can launch the app on our local server:

```shell
npm run dev
```

<p>
<img src="public/images/run.jpg" alt="Run the vwc app locally" width="800px" />
</p>

You should be able to view the website locally at http://localhost:3000/.

`CTRL` + `Left-Click` on the localhost link in your terminal to launch the app in your browser.

`CTRL` + `C` to close the dev server when you are finished.

### Running the Blog

**All Content from Contentful is is mocked locally. If you need api keys please reach out in the `#product` channel in slack.**

<!-- ## Tests -->

## Testing

In a terminal window run these commands.

```sh
$ cd vets-who-code-app
$ npm run test
```

<br>

In a terminal window run these commands to run the jest test suite in watch mode.

```sh
$ cd vets-who-code-app
$ npm run test:watch
```

In a terminal window run these commands to view the jest coverage report.

```sh
$ cd vets-who-code-app
$ npm run test:coverage
$ npm run view:coverage
```

In a terminal window run these commands if you need to update a snapshot.

```sh
$ cd vets-who-code-app
$ npm run test --updateSnapshot
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
