import { useRouter } from "next/router";
import Button from "@ui/button";

const DonateSuccessPage = () => {
    const router = useRouter();

    return (
        <div className="tw-container tw-py-15 tw-text-center">
            <h1 className="tw-text-4xl tw-font-bold tw-mb-5">Thank You!</h1>
            <p className="tw-text-lg tw-mb-10">
                Your donation was successful. We appreciate your support!
            </p>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
        </div>
    );
};

export default DonateSuccessPage;
