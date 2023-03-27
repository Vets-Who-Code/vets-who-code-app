import { forwardRef } from "react";

type TProps = {
    className?: string;
    list: string[];
};

const ListWithCheck = forwardRef<HTMLUListElement, TProps>(
    ({ className, list }, ref) => {
        return (
            <ul className={className} ref={ref}>
                {list.map((item) => (
                    <li
                        className="tw-flex tw-items-center tw-mt-2.5 first:tw-mt-0"
                        key={item}
                    >
                        <i className="fas fa-check tw-text-base tw-mr-[19px] tw-text-primary" />
                        {item}
                    </li>
                ))}
            </ul>
        );
    }
);

export default ListWithCheck;
