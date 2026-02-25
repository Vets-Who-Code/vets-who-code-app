import SafeHTML from "@components/safe-html";
import { IContent, ListContentType } from "@utils/types";
import clsx from "clsx";

type TProps = {
    body: IContent[];
    className?: string;
};

const HTMLContent = ({ body, className }: TProps) => {
    const generateList = (
        type: "list" | "order-list",
        content: ListContentType[] | string[],
        key: string | number
    ) => {
        const Type = type === "list" ? "ul" : "ol";
        return (
            <Type className={clsx("list-group", className)} key={key}>
                {content.map((item) => {
                    if (typeof item === "string") {
                        return <li key={item}>{item}</li>;
                    }
                    return (
                        <li key={item.text}>
                            {item.text} {generateList(item.type, item.content, `item-${item.text}`)}
                        </li>
                    );
                })}
            </Type>
        );
    };
    return (
        <div
            className={clsx(
                "tw-prose tw-max-w-none prose-h2:tw-text-xl sm:prose-h2:tw-text-4xl sm:prose-h3:tw-text-3xl",
                className
            )}
        >
            {body.map(({ id, type, content }) => {
                if (type === "text" && typeof content === "string") {
                    return <SafeHTML key={id} content={content} as="p" />;
                }
                if (
                    (type === "h3" || type === "h4" || type === "h5" || type === "blockquote") &&
                    typeof content === "string"
                ) {
                    return <SafeHTML key={id} content={content} as={type} />;
                }

                if ((type === "order-list" || type === "list") && Array.isArray(content)) {
                    return generateList(type, content, id);
                }
                if (
                    type === "image" &&
                    typeof content === "object" &&
                    !Array.isArray(content) &&
                    content.src
                ) {
                    return <img key={id} alt={content?.alt || "Image"} src={content.src} className="tw-w-full tw-rounded-lg" />;
                }
                if (
                    type === "iframe" &&
                    typeof content === "object" &&
                    !Array.isArray(content) &&
                    content.src
                ) {
                    return <iframe key={id} title={content?.alt || "Iframe"} src={content.src} />;
                }

                return null;
            })}
        </div>
    );
};

export default HTMLContent;
