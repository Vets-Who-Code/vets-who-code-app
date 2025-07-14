import { forwardRef } from "react";

type TProps = {
    className?: string;
    list: string[];
};

const ListWithCheck = forwardRef<HTMLUListElement, TProps>(({ className, list }, ref) => {
    return (
        <ul className={className} ref={ref}>
            {list.map((item) => (
                <li className="tw:mt-2.5 tw:flex tw:items-center tw:first:mt-0" key={item}>
                    <i className="fas fa-check tw:mr-[19px] tw:text-base tw:text-primary" />
                    {item}
                </li>
            ))}
        </ul>
    );
});

export default ListWithCheck;
