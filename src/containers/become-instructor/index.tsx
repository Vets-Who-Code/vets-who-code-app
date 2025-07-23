// File: BecomeInstructor.tsx

import React from "react";
import InstructorForm from "@components/forms/mentor-form";

interface BecomeInstructorProps {
    className?: string; // Add a className prop to the BecomeInstructor component
}

const BecomeInstructor: React.FC<BecomeInstructorProps> = ({ className }) => {
    return (
        <div
            className={`tw:bg-[url('/images/bg/become-a-teache-bg.jpg')] tw:bg-cover tw:bg-fixed tw:py-15 tw:md:py-20 tw:lg:py-[100px] ${className}`}
        >
            <div className="tw:container">
                <div className="tw:flex tw:justify-center">
                    <InstructorForm />
                </div>
            </div>
        </div>
    );
};

export default BecomeInstructor;
