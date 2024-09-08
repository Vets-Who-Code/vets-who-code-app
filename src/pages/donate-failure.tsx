import { useRouter } from "next/router";
import Button from "@ui/button";

const DonateFailurePage = () => {
    const router = useRouter();

    return (
        <div className="tw-container tw-py-15 tw-text-center">
            <h1 className="tw-text-4xl tw-font-bold tw-mb-5">Donation Failed</h1>
            <p className="tw-text-lg tw-mb-10">
                Unfortunately, your donation could not be processed. Please try again.
            </p>
            <Button onClick={() => router.push("/donate")}>Go to Donation Page</Button>
        </div>
    );
};

export default DonateFailurePage;
