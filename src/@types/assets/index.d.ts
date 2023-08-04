declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.gif";
declare module "*.eot";
declare module "*.ttf";
declare module "*.woff";
declare module "*.css";
declare module "*.svg" {
    import React = require("react");

    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
