import { forwardRef } from "react";
import clsx from "clsx";
import { IContent } from "@utils/types";
import HTMLContent from "@components/html-content";


type TProps = {
    className?: string;
};

let content : IContent[] = [{
    id: 'vwc-donorbox',
    text: 'VWC Donorbox',
    type:"iframe",
    content:{
        src:'https://donorbox.org/embed/vetswhocode-donation?show_content=true'
    }
}];

let originalIframe = `
<iframe
title="#VWC Donorbox"
src="https://donorbox.org/embed/vetswhocode-donation?show_content=true"
seamless="seamless"
name="donorbox"
scrolling="yes"
allowpaymentrequest="true"
frameBorder={0}
tabIndex={0}
/>`;

const DonateForm = forwardRef<HTMLDivElement, TProps>(
    ({ className }, ref) => {
    return (
        <div className={clsx(className)}
            ref={ref}>
            <HTMLContent body={content}></HTMLContent>
        </div>
    )
    }
);
          

export default DonateForm;
