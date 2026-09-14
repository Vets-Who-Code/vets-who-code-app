import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorFallback from "./error-fallback";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    resetKey?: string;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    /* Clear the fallback when the route changes so a single crash does not
       strand the user on the error screen for the rest of the session. */
    componentDidUpdate(prevProps: Props) {
        if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
            this.setState({ hasError: false, error: null });
        }
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <ErrorFallback error={this.state.error} resetError={this.resetError} />
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
