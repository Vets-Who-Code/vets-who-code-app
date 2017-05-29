import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "owl-theme owl-controls": {
        "marginTop": 10,
        "textAlign": "center"
    },
    "owl-theme owl-controls owl-buttons div": {
        "color": "#FFF",
        "display": "inline-block",
        "zoom": 1,
        "Display": "inline",
        "marginTop": 5,
        "marginRight": 5,
        "marginBottom": 5,
        "marginLeft": 5,
        "paddingTop": 3,
        "paddingRight": 10,
        "paddingBottom": 3,
        "paddingLeft": 10,
        "fontSize": 12,
        "WebkitBorderRadius": 30,
        "MozBorderRadius": 30,
        "borderRadius": 30,
        "background": "#869791",
        "filter": "Alpha(Opacity=50)",
        "opacity": 0.5
    },
    "owl-theme owl-controlsclickable owl-buttons div:hover": {
        "filter": "Alpha(Opacity=100)",
        "opacity": 1,
        "textDecoration": "none"
    },
    "owl-theme owl-controls owl-page": {
        "display": "inline-block",
        "zoom": 1,
        "Display": "inline"
    },
    "owl-theme owl-controls owl-page span": {
        "display": "block",
        "width": 12,
        "height": 12,
        "marginTop": 5,
        "marginRight": 7,
        "marginBottom": 5,
        "marginLeft": 7,
        "filter": "Alpha(Opacity=50)",
        "opacity": 0.5,
        "WebkitBorderRadius": 20,
        "MozBorderRadius": 20,
        "borderRadius": 20,
        "background": "#869791"
    },
    "owl-theme owl-controls owl-pageactive span": {
        "filter": "Alpha(Opacity=100)",
        "opacity": 1
    },
    "owl-theme owl-controlsclickable owl-page:hover span": {
        "filter": "Alpha(Opacity=100)",
        "opacity": 1
    },
    "owl-theme owl-controls owl-page spanowl-numbers": {
        "height": "auto",
        "width": "auto",
        "color": "#FFF",
        "paddingTop": 2,
        "paddingRight": 10,
        "paddingBottom": 2,
        "paddingLeft": 10,
        "fontSize": 12,
        "WebkitBorderRadius": 30,
        "MozBorderRadius": 30,
        "borderRadius": 30
    },
    "owl-itemloading": {
        "minHeight": 150,
        "background": "url(AjaxLoader.gif) no-repeat center center"
    }
});