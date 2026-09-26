import { useClickOutside } from "@hooks";
import clsx from "clsx";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

interface IOption {
    value: string;
    label: string;
    selected?: boolean;
}

type TProps = {
    className?: string;
    options: IOption[];
    setValue: Dispatch<SetStateAction<string>>;
    prefix?: string;
    defaultValue?: string;
};

const NiceSelect = ({ className, options, setValue, prefix, defaultValue }: TProps) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<IOption>();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const onClose = useCallback(() => {
        setOpen(false);
        // The list is about to be display:none; don't strand focus on a hidden option.
        if (listRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
    }, []);

    const containerRef = useClickOutside<HTMLDivElement>(onClose);

    const currentHandler = (item: IOption) => {
        setSelected(item);
        setValue(item.value);
        onClose();
    };

    useEffect(() => {
        let selectedItem: IOption | undefined;

        if (defaultValue) {
            selectedItem = options.find((item) => item.value === defaultValue);
        } else {
            [selectedItem] = options;
        }
        if (selectedItem) setSelected(selectedItem);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    return (
        <div
            className={clsx(
                "nice-select tw-relative tw-rounded-md tw-border tw-transition-all",
                !open && "tw-border-gray-200 tw-bg-gray-50",
                "hover:tw-border-primary hover:tw-bg-transparent",
                className,
                open && "tw-border-primary tw-bg-transparent"
            )}
            ref={containerRef}
        >
            <button
                ref={triggerRef}
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                className="tw-flex tw-min-h-[52px] tw-w-full tw-items-center tw-py-[3px] tw-pl-5 tw-pr-10"
            >
                <span className="label tw-flex tw-items-center tw-text-body">
                    <i className="fa fa-align-left tw-mr-3.8" aria-hidden="true" /> {prefix}
                    <span className="tw-ml-[3px] tw-font-medium tw-text-heading">
                        {selected?.label}
                    </span>
                </span>
                <span className="arrow tw-absolute tw-right-0 tw-top-0 tw-flex tw-h-full tw-w-10 tw-items-center tw-justify-center tw-bg-transparent tw-text-lg">
                    <i className="far fa-angle-down" aria-hidden="true" />
                </span>
            </button>
            {/* A disclosure over a plain list of buttons, not a listbox: that role would
                promise arrow-key navigation this widget does not implement. */}
            <ul
                ref={listRef}
                className={clsx(
                    "tw-absolute tw-left-0 tw-top-full tw-z-50 tw-w-full tw-min-w-full tw-rounded-md tw-bg-light-50 tw-py-[5px] tw-font-medium tw-shadow-4md tw-shadow-black/20",
                    !open && "tw-hidden",
                    open && "tw-block"
                )}
            >
                {options?.map((item) => (
                    <li key={item.value}>
                        <button
                            type="button"
                            aria-pressed={item.value === selected?.value}
                            onClick={() => currentHandler(item)}
                            className="tw-group tw-flex tw-w-full tw-items-center tw-px-[30px] tw-py-[5px] tw-text-left tw-text-heading tw-transition-colors hover:tw-bg-primary hover:tw-text-white"
                        >
                            {item.value === selected?.value && (
                                <i
                                    className="fa fa-check tw-mr-2.5 tw-text-primary tw-transition-colors group-hover:tw-text-white"
                                    aria-hidden="true"
                                />
                            )}
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

NiceSelect.defaultProps = {
    prefix: "Sort By: ",
};

export default NiceSelect;
