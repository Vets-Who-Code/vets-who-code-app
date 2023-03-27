import clsx from "clsx";
import { IContent, ListContentType } from "@utils/types";

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
                            {item.text}{" "}
                            {generateList(
                                item.type,
                                item.content,
                                `item-${item.text}`
                            )}
                        </li>
                    );
                })}
            </Type>
        );
    };
    return (
        <div
            className={clsx(
                "tw-prose prose-h2:tw-text-xl sm:prose-h2:tw-text-4xl sm:prose-h3:tw-text-3xl tw-max-w-none",
                className
            )}
        >
            {body.map(({ id, type, content }) => {
                if (type === "text" && typeof content === "string") {
                    return (
                        <p
                            key={id}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    );
                }
                if (
                    (type === "h3" ||
                        type === "h4" ||
                        type === "h5" ||
                        type === "blockquote") &&
                    typeof content === "string"
                ) {
                    const Tag = type;
                    return (
                        <Tag
                            key={id}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    );
                }

                if (
                    (type === "order-list" || type === "list") &&
                    Array.isArray(content)
                ) {
                    return generateList(type, content, id);
                }
                if (
                    type === "iframe" &&
                    typeof content === "object" &&
                    !Array.isArray(content) &&
                    content.src
                ) {
                    return (
                        <iframe
                            key={id}
                            title={content?.alt || "Iframe"}
                            src={content.src}
                        />
                    );
                }

                return null;
            })}
        </div>
    );
};

export default HTMLContent;
