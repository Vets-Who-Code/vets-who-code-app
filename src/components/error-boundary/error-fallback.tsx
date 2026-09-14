import Button from "@/components/ui/button";

interface ErrorFallbackProps {
    error: Error | null;
    resetError?: () => void;
}

const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => (
    <div className="tw-flex tw-min-h-[60vh] tw-items-center tw-justify-center tw-bg-navy tw-px-4 tw-py-20">
        <div className="tw-max-w-[560px] tw-text-center">
            <h2 className="tw-mb-[23px]">Something went wrong</h2>
            <p className="tw-text-white/70">Something went wrong. Please try again.</p>
            {process.env.NODE_ENV === "development" && error && (
                <details className="tw-mt-6 tw-border tw-border-white/15 tw-p-4 tw-text-left">
                    <summary className="tw-cursor-pointer tw-font-bold tw-text-white">
                        Error Details
                    </summary>
                    <pre className="tw-mt-2 tw-overflow-auto tw-text-xs tw-text-white/70">
                        {error.toString()}
                    </pre>
                </details>
            )}
            <div className="tw-mt-8">
                {resetError && (
                    <Button className="tw-m-2.5" onClick={resetError}>
                        Try Again
                    </Button>
                )}
                <Button className="tw-m-2.5" path="/">
                    Homepage
                </Button>
            </div>
        </div>
    </div>
);

export default ErrorFallback;
