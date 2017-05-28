import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "owl-carousel owl-wrapper:after": {
        "content": ".",
        "display": "block",
        "clear": "both",
        "visibility": "hidden",
        "lineHeight": 0,
        "height": 0
    },
    "owl-carousel": {
        "display": "none",
        "position": "relative",
        "width": "100%",
        "MsTouchAction": "pan-y"
    },
    "owl-carousel owl-wrapper": {
        "display": "none",
        "position": "relative",
        "WebkitTransform": "translate3d(0,0,0)",
        "WebkitBackfaceVisibility": "hidden",
        "MozBackfaceVisibility": "hidden",
        "MsBackfaceVisibility": "hidden",
        "MozTransform": "translate3d(0,0,0)",
        "MsTransform": "translate3d(0,0,0)"
    },
    "owl-carousel owl-wrapper-outer": {
        "overflow": "hidden",
        "position": "relative",
        "width": "100%"
    },
    "owl-carousel owl-wrapper-outerautoHeight": {
        "WebkitTransition": "height 500ms ease-in-out",
        "MozTransition": "height 500ms ease-in-out",
        "MsTransition": "height 500ms ease-in-out",
        "OTransition": "height 500ms ease-in-out",
        "transition": "height 500ms ease-in-out"
    },
    "owl-carousel owl-item": {
        "float": "left",
        "WebkitBackfaceVisibility": "hidden",
        "MozBackfaceVisibility": "hidden",
        "MsBackfaceVisibility": "hidden",
        "WebkitTransform": "translate3d(0,0,0)",
        "MozTransform": "translate3d(0,0,0)",
        "MsTransform": "translate3d(0,0,0)"
    },
    "owl-controls owl-page": {
        "cursor": "pointer"
    },
    "owl-controls owl-buttons div": {
        "cursor": "pointer"
    },
    "owl-controls": {
        "WebkitUserSelect": "none",
        "KhtmlUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none",
        "WebkitTapHighlightColor": "rgba(0, 0, 0, 0)"
    },
    "grabbing": {
        "cursor": "url(grabbing.png) 8 8, move"
    }
});