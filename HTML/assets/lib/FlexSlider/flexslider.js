import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "flex-container a:hover": {
        "outline": "none"
    },
    "flex-slider a:hover": {
        "outline": "none"
    },
    "flex-container a:focus": {
        "outline": "none"
    },
    "flex-slider a:focus": {
        "outline": "none"
    },
    "slides": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "listStyle": "none"
    },
    "slides > li": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "listStyle": "none"
    },
    "flex-control-nav": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "listStyle": "none",
        "width": "100%",
        "position": "absolute",
        "bottom": -40,
        "textAlign": "center"
    },
    "flex-direction-nav": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "listStyle": "none",
        "Height": 0
    },
    "flex-pauseplay span": {
        "textTransform": "capitalize"
    },
    "flexslider": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 60,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "background": "#ffffff",
        "border": "4px solid #ffffff",
        "position": "relative",
        "zoom": 1,
        "WebkitBorderRadius": 4,
        "MozBorderRadius": 4,
        "borderRadius": 4,
        "WebkitBoxShadow": "'' 0 1px 4px rgba(0, 0, 0, 0.2)",
        "MozBoxShadow": "'' 0 1px 4px rgba(0, 0, 0, 0.2)",
        "OBoxShadow": "'' 0 1px 4px rgba(0, 0, 0, 0.2)",
        "boxShadow": "'' 0 1px 4px rgba(0, 0, 0, 0.2)"
    },
    "flexslider slides > li": {
        "display": "none",
        "WebkitBackfaceVisibility": "hidden"
    },
    "flexslider slides img": {
        "width": "100%",
        "display": "block",
        "height": "auto"
    },
    "flexslider slides:after": {
        "content": "\\0020",
        "display": "block",
        "clear": "both",
        "visibility": "hidden",
        "lineHeight": 0,
        "height": 0
    },
    "html[xmlns] flexslider slides": {
        "display": "block"
    },
    "* html flexslider slides": {
        "height": "1%"
    },
    "no-js flexslider slides > li:first-child": {
        "display": "block"
    },
    "flexslider slides": {
        "zoom": 1
    },
    "flex-viewport": {
        "maxHeight": 2000,
        "WebkitTransition": "all 1s ease",
        "MozTransition": "all 1s ease",
        "MsTransition": "all 1s ease",
        "OTransition": "all 1s ease",
        "transition": "all 1s ease"
    },
    "loading flex-viewport": {
        "maxHeight": 300
    },
    "carousel li": {
        "marginRight": 5
    },
    "flex-direction-nav a": {
        "textDecoration": "none",
        "display": "block",
        "width": 40,
        "height": 40,
        "marginTop": -20,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "position": "absolute",
        "top": "50%",
        "zIndex": 10,
        "overflow": "hidden",
        "opacity": 0,
        "cursor": "pointer",
        "color": "rgba(0, 0, 0, 0.8)",
        "textShadow": "1px 1px 0 rgba(255, 255, 255, 0.3)",
        "WebkitTransition": "all 0.3s ease-in-out",
        "MozTransition": "all 0.3s ease-in-out",
        "MsTransition": "all 0.3s ease-in-out",
        "OTransition": "all 0.3s ease-in-out",
        "transition": "all 0.3s ease-in-out"
    },
    "flex-direction-nav a:before": {
        "fontFamily": "flexslider-icon",
        "fontSize": 40,
        "display": "inline-block",
        "content": "'\\f001'",
        "color": "rgba(0, 0, 0, 0.8)",
        "textShadow": "1px 1px 0 rgba(255, 255, 255, 0.3)"
    },
    "flex-direction-nav aflex-next:before": {
        "content": "'\\f002'"
    },
    "flex-direction-nav flex-prev": {
        "left": -50
    },
    "flex-direction-nav flex-next": {
        "right": -50,
        "textAlign": "right"
    },
    "flexslider:hover flex-direction-nav flex-prev": {
        "opacity": 0.7,
        "left": 10
    },
    "flexslider:hover flex-direction-nav flex-prev:hover": {
        "opacity": 1
    },
    "flexslider:hover flex-direction-nav flex-next": {
        "opacity": 0.7,
        "right": 10
    },
    "flexslider:hover flex-direction-nav flex-next:hover": {
        "opacity": 1
    },
    "flex-direction-nav flex-disabled": {
        "opacity": "0!important",
        "filter": "alpha(opacity=0)",
        "cursor": "default"
    },
    "flex-pauseplay a": {
        "display": "block",
        "width": 20,
        "height": 20,
        "position": "absolute",
        "bottom": 5,
        "left": 10,
        "opacity": 0.8,
        "zIndex": 10,
        "overflow": "hidden",
        "cursor": "pointer",
        "color": "#000"
    },
    "flex-pauseplay a:before": {
        "fontFamily": "flexslider-icon",
        "fontSize": 20,
        "display": "inline-block",
        "content": "'\\f004'"
    },
    "flex-pauseplay a:hover": {
        "opacity": 1
    },
    "flex-pauseplay aflex-play:before": {
        "content": "'\\f003'"
    },
    "flex-control-nav li": {
        "marginTop": 0,
        "marginRight": 6,
        "marginBottom": 0,
        "marginLeft": 6,
        "display": "inline-block",
        "zoom": 1,
        "Display": "inline"
    },
    "flex-control-paging li a": {
        "width": 11,
        "height": 11,
        "display": "block",
        "background": "rgba(0, 0, 0, 0.5)",
        "cursor": "pointer",
        "textIndent": -9999,
        "WebkitBoxShadow": "inset 0 0 3px rgba(0, 0, 0, 0.3)",
        "MozBoxShadow": "inset 0 0 3px rgba(0, 0, 0, 0.3)",
        "OBoxShadow": "inset 0 0 3px rgba(0, 0, 0, 0.3)",
        "boxShadow": "inset 0 0 3px rgba(0, 0, 0, 0.3)",
        "WebkitBorderRadius": 20,
        "MozBorderRadius": 20,
        "borderRadius": 20
    },
    "flex-control-paging li a:hover": {
        "background": "rgba(0, 0, 0, 0.7)"
    },
    "flex-control-paging li aflex-active": {
        "background": "rgba(0, 0, 0, 0.9)",
        "cursor": "default"
    },
    "flex-control-thumbs": {
        "marginTop": 5,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "position": "static",
        "overflow": "hidden"
    },
    "flex-control-thumbs li": {
        "width": "25%",
        "float": "left",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "flex-control-thumbs img": {
        "width": "100%",
        "height": "auto",
        "display": "block",
        "opacity": 0.7,
        "cursor": "pointer",
        "WebkitTransition": "all 1s ease",
        "MozTransition": "all 1s ease",
        "MsTransition": "all 1s ease",
        "OTransition": "all 1s ease",
        "transition": "all 1s ease"
    },
    "flex-control-thumbs img:hover": {
        "opacity": 1
    },
    "flex-control-thumbs flex-active": {
        "opacity": 1,
        "cursor": "default"
    }
});