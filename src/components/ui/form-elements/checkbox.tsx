import { forwardRef } from "react";
import cn from "clsx";
import { IInputProps } from "./types";
import Feedback from "./feedback";

interface IProps extends IInputProps {
    checked?: boolean;
    defaultChecked?: boolean;
    label: string;
}

const Checkbox = forwardRef<HTMLInputElement, IProps>(
    (
        {
            className,
            disabled,
            id,
            name,
            label,
            checked,
            defaultChecked,
            onChange,
            onClick,
            onBlur,
            value,
            state,
            feedbackText,
            showState,
            showErrorOnly,
            ...restProps
        },
        ref
    ) => {
        const beforeClass =
            "tw:before:absolute tw:before:content[''] tw:before:w-full tw:before:h-full tw:before:top-px tw:before:left-0 tw:before:transition-colors tw:before:duration-300 tw:before:bg-gray-200 tw:before:border tw:before:border-gray-200 tw:before:rounded-xs";
        const disabledClass = disabled && "tw:opacity-50 tw:before:opacity-50 tw:after:opacity-50";
        const afterClass =
            "tw:after:absolute tw:after:content[''] tw:after:block tw:after:bg-primary tw:after:w-2 tw:after:h-2 tw:after:top-1/2 tw:after:left-1/2 tw:after:-translate-x-1/2 tw:after:-translate-y-1/2 tw:after:scale-0 tw:after:transition-transform tw:after:duration-300 tw:after:rounded-xs after:z-10";

        return (
            <div className="custom-checkbox">
                <label
                    className={cn(
                        "tw:relative tw:block tw:max-w-fit tw:cursor-pointer tw:pl-7 tw:leading-snug",
                        className
                    )}
                >
                    <input
                        type="checkbox"
                        disabled={disabled}
                        id={id}
                        name={name}
                        checked={checked}
                        defaultChecked={defaultChecked}
                        onChange={onChange}
                        onClick={onClick}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        className="tw:peer tw:sr-only"
                        {...restProps}
                    />
                    <span
                        className={cn(
                            "tw:absolute tw:left-0 tw:inline-block tw:h-[18px] tw:w-[18px] tw:leading-[18px]",
                            beforeClass,
                            disabledClass,
                            afterClass,
                            "tw:peer-checked:before:border-primary tw:peer-checked:before:bg-white tw:peer-checked:after:scale-100 tw:peer-hover:before:border-primary"
                        )}
                    />
                    {label}
                </label>
                {feedbackText && showState && (
                    <Feedback state={state} showErrorOnly={showErrorOnly}>
                        {feedbackText}
                    </Feedback>
                )}
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
