import { ChangeEvent, MouseEvent, FocusEvent } from "react";

export interface IFeedback {
    state?: "success" | "warning" | "error";
    showState?: boolean;
    showErrorOnly?: boolean;
}

export type TInput = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type TCustomStyle = "noborder" | "nofocus";
export interface IInputProps extends IFeedback {
    className?: string;
    disabled?: boolean;
    readonly?: boolean;
    feedbackText?: string;
    id: string;
    name: string;
    placeholder?: string;
    value?: string | number;
    min?: string | number;
    max?: string | number;
    autoComplete?: string;
    onChange?: (e: ChangeEvent<TInput>) => void;
    onClick?: (e: MouseEvent<TInput>) => void;
    onBlur?: (e: FocusEvent<TInput>) => void;
    customStyle?: TCustomStyle;
}
