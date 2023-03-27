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
            "before:tw-absolute before:tw-content[''] before:tw-w-full before:tw-h-full before:tw-top-px before:tw-left-0 before:tw-transition-colors before:tw-duration-300 before:tw-bg-gray-200 before:tw-border before:tw-border-gray-200 before:tw-rounded-sm";
        const disabledClass =
            disabled &&
            "tw-opacity-50 before:tw-opacity-50 after:tw-opacity-50";
        const afterClass =
            "after:tw-absolute after:tw-content[''] after:tw-block after:tw-bg-primary after:tw-w-2 after:tw-h-2 after:tw-top-1/2 after:tw-left-1/2 after:-tw-translate-x-1/2 after:-tw-translate-y-1/2 after:tw-scale-0 after:tw-transition-transform after:tw-duration-300 after:tw-rounded-sm after:z-10";

        return (
            <div className="custom-checkbox">
                <label
                    className={cn(
                        "tw-relative tw-block tw-leading-snug tw-pl-7 tw-cursor-pointer tw-max-w-fit",
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
                        className="tw-sr-only tw-peer"
                        {...restProps}
                    />
                    <span
                        className={cn(
                            "tw-leading-[18px] tw-w-[18px] tw-h-[18px] tw-absolute tw-left-0 tw-inline-block",
                            beforeClass,
                            disabledClass,
                            afterClass,
                            "peer-checked:after:tw-scale-100 peer-checked:before:tw-border-primary peer-checked:before:tw-bg-white peer-hover:before:tw-border-primary"
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
