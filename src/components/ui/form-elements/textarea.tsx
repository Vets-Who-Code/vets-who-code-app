import { forwardRef } from "react";
import cn from "clsx";
import Feedback from "./feedback";
import { IInputProps } from "./types";

interface IProps extends IInputProps {
    rows?: number;
    bg?: "white" | "light";
}

const Textarea = forwardRef<HTMLTextAreaElement, IProps>(
    (
        {
            className,
            bg,
            disabled,
            state,
            feedbackText,
            id,
            name,
            onChange,
            onClick,
            onBlur,
            value,
            readonly,
            showState,
            showErrorOnly,
            customStyle,
            ...restProps
        },
        ref
    ) => {
        const defaultClass =
            "tw-block tw-w-full tw-min-h-[120px] md:tw-min-h-[180px] lg:tw-min-h-[220px] tw-rounded tw-py-2.5 tw-px-5 tw-text-base tw-text-body tw-leading-relaxed tw-border tw-border-gray-200 tw-placeholder-body";
        const focusClass =
            customStyle !== "nofocus" &&
            !readonly &&
            "focus:tw-shadow-none focus:tw-outline-0 focus:tw-text-body focus:tw-bg-white focus:tw-border-primary";
        const readOnlyAndDisabledClass =
            (readonly || disabled) && "tw-bg-gray-300 tw-opacity-100";
        const readOnlyFocusClass =
            customStyle !== "nofocus" &&
            readonly &&
            "focus:tw-shadow-none focus:tw-outline-0 focus:tw-text-body";
        const successClass =
            !showErrorOnly && state === "success" && "!tw-border-success";
        const warningClass =
            !showErrorOnly && state === "warning" && "!tw-border-warning";
        const errorClass = state === "error" && "!tw-border-danger";
        const focusBorderClass =
            customStyle !== "nofocus" && !state && "focus:tw-border-blue-100";
        const noFocusClass = customStyle === "nofocus" && "focus:tw-outline-0";

        return (
            <>
                <textarea
                    disabled={disabled}
                    ref={ref}
                    className={cn(
                        "form-control",
                        defaultClass,
                        focusClass,
                        readOnlyAndDisabledClass,
                        readOnlyFocusClass,
                        successClass,
                        warningClass,
                        errorClass,
                        focusBorderClass,
                        noFocusClass,
                        bg === "white" && "tw-bg-white",
                        bg === "light" && "tw-bg-gray-200",
                        className
                    )}
                    id={id}
                    name={name}
                    onChange={onChange}
                    onClick={onClick}
                    onBlur={onBlur}
                    value={value}
                    readOnly={readonly}
                    {...restProps}
                />
                {feedbackText && showState && (
                    <Feedback state={state} showErrorOnly={showErrorOnly}>
                        {feedbackText}
                    </Feedback>
                )}
            </>
        );
    }
);

Textarea.displayName = "Textarea ";

Textarea.defaultProps = {
    rows: 3,
    showState: true,
    showErrorOnly: true,
};

export default Textarea;
