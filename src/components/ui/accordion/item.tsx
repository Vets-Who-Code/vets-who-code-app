import { motion } from "framer-motion";
import clsx from "clsx";
import { IDType } from "@utils/types";

type TProps = {
    id: IDType;
    title: string;
    description: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isOpen: boolean;
};

const AccordionItem = ({ id, title, description, onClick, isOpen }: TProps) => {
    return (
        <div className="accordion-item tw-mb-7.5">
            <h3 className="tw-mb-0 tw-relative" id={`faq-heading-${id}`}>
                <button
                    type="button"
                    onClick={onClick}
                    className={clsx(
                        "tw-text-left tw-text-lg tw-leading-tight tw-font-semibold tw-py-5 tw-px-[26px] tw-w-full tw-rounded-t tw-shadow-2xl tw-shadow-heading/10",
                        !isOpen && "tw-bg-white tw-text-body",
                        isOpen && "tw-bg-primary tw-text-white"
                    )}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${id}`}
                >
                    {title}
                </button>
                <span className="tw-absolute tw-right-4 tw-top-1/2 -tw-translate-y-1/2">
                    {isOpen ? (
                        <i className="fa fa-minus-circle tw-text-xl tw-text-white" />
                    ) : (
                        <i className="fa fa-plus-circle tw-text-xl tw-text-secondary-light" />
                    )}
                </span>
            </h3>
            <motion.div
                className="tw-overflow-hidden tw-font-normal tw-leading-relaxed tw-shadow-3xl tw-shadow-heading/10 tw-rounded-b"
                id={`faq-content-${id}`}
                aria-labelledby={`faq-heading-${id}`}
                hidden={!isOpen}
                initial={false}
                animate={{
                    height: isOpen ? "100%" : "0",
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.645, 0.045, 0.355, 1],
                }}
            >
                <p className="tw-pt-[27px] tw-pb-[39px] tw-px-[25px]">
                    {description}
                </p>
            </motion.div>
        </div>
    );
};

export default AccordionItem;
