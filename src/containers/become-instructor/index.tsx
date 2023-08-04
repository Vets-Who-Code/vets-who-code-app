// File: BecomeInstructor.tsx

import React from "react";
import InstructorForm from "@components/forms/mentor-form";

interface BecomeInstructorProps {
    className?: string; // Add a className prop to the BecomeInstructor component
}

const BecomeInstructor: React.FC<BecomeInstructorProps> = ({ className }) => {
    return (
        <div
            className={`tw-py-15 md:tw-py-20 lg:tw-py-[100px] tw-bg-[url('/images/bg/become-a-teache-bg.jpg')] tw-bg-cover tw-bg-fixed ${className}`}
        >
            <div className="tw-container">
                <div className="tw-flex tw-justify-center">
                    <InstructorForm />
                </div>
            </div>
        </div>
    );
};

export default BecomeInstructor;
