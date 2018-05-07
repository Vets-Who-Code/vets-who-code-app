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
The Vets Who Code Web App is a Jamstack Applicaton designed more for speed.
By doing this we can focus on creating a beautiful web experience with a focus on telling the story of Vets Who Code.

## Getting Started
These instuctions will get you a copy of the project up and running on your local machine for development and testing purposes.  See deployment for notes on how to deploy the project on a live system.

### Prerequisites
You will need the following properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node](http://nodejs.org/)
* [NVM](https://github.com/creationix/nvm)
* [Gatsby](https://www.gatsbyjs.org/)

### Installing
In a terminal window run these commands.
```sh
$ git clone git@github.com:Vets-Who-Code/vwc-site.git
$ cd vwc-site
$ nvm install
$ npm install
$ npm run develop
```

Navigate to the public directory and paste the following into your index.html file.
```sh
$ cd public
```

Open `index.html` and paste the following into this file.
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title data-react-helmet="true"></title>
    <script data-react-helmet="true" src="/vendor/components-modernizr/modernizr.js"></script>
    <script data-react-helmet="true" src="/vendor/jquery/dist/jquery.js"></script>
    <script data-react-helmet="true" src="/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
    <script data-react-helmet="true" src="/vendor/owlcarousel/owl-carousel/owl.carousel.min.js"></script>
    <script data-react-helmet="true" src="/vendor/swipebox/js/jquery.swipebox.min.js"></script>
    <script data-react-helmet="true" src="/vendor/rotating-carousel/js/jquery.gallery.js"></script>
    <script data-react-helmet="true" src="/vendor/slick/slick.js"></script>
    <script data-react-helmet="true" src="/vendor/magnificpopup/jquery.magnific-popup.min.js"></script>
    <script data-react-helmet="true" src="/vendor/scrollspeed/jQuery.scrollSpeed.js"></script>
    <script data-react-helmet="true" src="/vendor/FlexSlider/jquery.flexslider.js"></script>
    <script data-react-helmet="true" src="/vendor/waypoints/lib/jquery.waypoints.min.js"></script>
    <script data-react-helmet="true" src="/vendor/waypoints/lib/shortcuts/inview.min.js"></script>
    <script data-react-helmet="true" src="/vendor/countdown/dest/jquery.countdown.min.js"></script>
    <script data-react-helmet="true" src="/js/main.js"></script>
    <script src="/socket.io/socket.io.js"></script>
  </head>
  <body>
    <div id="___gatsby"></div>
    <script src="/commons.js"></script>
  </body>
</html>
```

You should be able to view the website locally at `http://localhost:8000/` and have instant feedback on save.

<!-- ## Tests -->

<!-- ## Deployment -->

## Contributing
Please read [contributing](https://github.com/Vets-Who-Code/vwc-site/blob/master/.github/contributing.md) for details on our code of conduct and the process for submitting issues and/or pull requests.

[CONTRIBUTORS](https://github.com/Vets-Who-Code/vwc-site/graphs/contributors)
## License
This project is licensed under the MIT License - please see [license](https://github.com/Vets-Who-Code/vwc-site/blob/master/LICENSE) for more details.

<!-- ## Acknowledgements -->

## Roadmap
Please checkout our [roadmap](https://github.com/Vets-Who-Code/vwc-site/blob/update/README/roadmap.md) for details of upcoming features.
