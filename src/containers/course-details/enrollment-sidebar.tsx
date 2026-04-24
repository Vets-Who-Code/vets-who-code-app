import { ICourse } from "@utils/types";
import Link from "next/link";
import React from "react";

type TProps = {
    course: ICourse;
};

const EnrollmentSidebar = ({ course }: TProps) => {
    return (
        <div className="tw-sticky tw-top-8">
            {/* Course Image */}
            <div className="tw-mb-6 tw-overflow-hidden tw-rounded-lg tw-shadow-md">
                <img
                    src={course.thumbnail.src}
                    alt={course.title}
                    className="tw-h-48 tw-w-full tw-object-cover"
                />
            </div>

            {/* Apply Card */}
            <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-p-6 tw-shadow-lg">
                <div className="tw-mb-6 tw-text-center">
                    <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gold">FREE</div>
                    <p className="tw-text-gray-300">
                        For veterans &amp; military spouses accepted into a VWC cohort.
                    </p>
                </div>

                <Link
                    href="/apply"
                    className="hover:tw-bg-primary-dark tw-mb-4 tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-text-center tw-font-semibold tw-text-white tw-transition-colors"
                >
                    Apply to Vets Who Code
                </Link>
                <p className="tw-text-center tw-text-sm tw-text-gray-300">
                    Access to the full curriculum is available after acceptance into the program.
                </p>

                {/* Included */}
                <div className="tw-mt-6 tw-border-t tw-border-gray-200 tw-pt-6">
                    <h4 className="tw-mb-3 tw-font-semibold tw-text-ink">What&apos;s Included:</h4>
                    <ul className="tw-space-y-2 tw-text-sm tw-text-gray-300">
                        <li className="tw-flex tw-items-center">
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            25-module accelerator with 128 Lightcast-validated skills
                        </li>
                        <li className="tw-flex tw-items-center">
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            Engineering manager mentorship
                        </li>
                        <li className="tw-flex tw-items-center">
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            Code reviews on real pull requests
                        </li>
                        <li className="tw-flex tw-items-center">
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            Capstone project shipped to production
                        </li>
                        <li className="tw-flex tw-items-center">
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            Alumni network across Microsoft, Accenture, Google, GitHub, and more
                        </li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div className="tw-mt-6 tw-border-t tw-border-gray-200 tw-pt-6">
                    <h4 className="tw-mb-3 tw-font-semibold tw-text-ink">Quick Links:</h4>
                    <div className="tw-space-y-2">
                        <Link
                            href="/subjects/all"
                            className="hover:tw-text-primary-dark tw-block tw-text-sm tw-text-primary tw-transition-colors"
                        >
                            <i className="fas fa-list tw-mr-2" />
                            View All Subjects
                        </Link>
                        <Link
                            href="/theory-of-change"
                            className="hover:tw-text-primary-dark tw-block tw-text-sm tw-text-primary tw-transition-colors"
                        >
                            <i className="fas fa-compass tw-mr-2" />
                            How the Program Works
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentSidebar;
