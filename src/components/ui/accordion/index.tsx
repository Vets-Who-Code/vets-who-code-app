import { useState } from "react";
import clsx from "clsx";
import { ItemType, IDType } from "@utils/types";
import AccordionItem from "./item";

type TProps = {
    items: Required<Pick<ItemType, "id" | "title" | "description">>[];
    defaultActiveKey?: IDType;
    className?: string;
};

const Accordion = ({ items, defaultActiveKey, className }: TProps) => {
    const [expanded, setExpanded] = useState<IDType | undefined>(
        defaultActiveKey
    );

    const handleClick = (
        _e: React.MouseEvent<HTMLButtonElement>,
        id: IDType
    ) => {
        if (id === expanded) {
            setExpanded(undefined);
        } else {
            setExpanded(id);
        }
    };

    return (
        <div className={clsx("accordion", className)}>
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    isOpen={expanded === item.id}
                    onClick={(e) => handleClick(e, item.id)}
                />
            ))}
        </div>
    );
};

export default Accordion;
