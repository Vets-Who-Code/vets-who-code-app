import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ICourse } from "@utils/types";

type TProps = {
    course: ICourse;
};

// Mapping between subject slugs and course IDs in the learning platform
const subjectToCourseMapping: Record<string, string> = {
    "web-fundamentals": "web-development",
    devops: "devops",
    "python-fundamentals": "data-science",
    django: "web-development",
    "next-js-and-typescript": "web-development",
    flask: "web-development",
    "fast-api": "web-development",
    "core-fundamentals": "web-development",
    "job-prep": "career-prep",
    "scalable-coding-principles": "web-development",
    "postgres-with-neon": "web-development",
    streamlit: "data-science",
};

const EnrollmentSidebar = ({ course }: TProps) => {
    const { data: session } = useSession();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrolling, setEnrolling] = useState(false);
    const [checkingEnrollment, setCheckingEnrollment] = useState(false);

    // Map the subject slug to the course platform ID
    const courseId = subjectToCourseMapping[course.slug];
    const coursePlatformUrl = courseId ? `/courses/${courseId}` : null;

    // Check enrollment status
    useEffect(() => {
        if (session && courseId) {
            setCheckingEnrollment(true);

            fetch(`/api/enrollment/status?courseId=${courseId}`)
                .then(res => res.json())
                .then(data => {
                    setIsEnrolled(data.enrolled);
                })
                .catch(error => {
                    console.error("Error checking enrollment:", error);
                })
                .finally(() => {
                    setCheckingEnrollment(false);
                });
        }
    }, [session, courseId]);

    const handleEnroll = async () => {
        if (!session) {
            window.location.href = "/login";
            return;
        }

        if (!courseId) {
            // If no mapping exists, redirect to courses page
            window.location.href = "/courses";
            return;
        }

        setEnrolling(true);
        try {
            const response = await fetch("/api/enrollment/enroll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseId }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsEnrolled(true);
                // Redirect to course page
                window.location.href = `/courses/${courseId}`;
            } else {
                console.error("Enrollment failed:", data.error);
                alert(`Enrollment failed: ${data.error}`);
            }
        } catch (error) {
            console.error("Error enrolling:", error);
            alert("An error occurred while enrolling. Please try again.");
        } finally {
            setEnrolling(false);
        }
    };

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

            {/* Enrollment Card */}
            <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-p-6 tw-shadow-lg">
                <div className="tw-mb-6 tw-text-center">
                    <div className="tw-mb-3 tw-flex tw-items-center tw-justify-center">
                        <i className="fas fa-flag-usa tw-mr-2 tw-text-xl tw-text-blue-600" />
                        <span className="tw-text-lg tw-font-bold tw-text-gray-900">
                            For Our Veterans
                        </span>
                    </div>
                    <p className="tw-text-sm tw-text-gray-600">Supporting military families in tech careers</p>
                </div>

                {checkingEnrollment ? (
                    <div className="tw-py-4 tw-text-center">
                        <div className="tw-mx-auto tw-h-8 tw-w-8 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                        <p className="tw-mt-2 tw-text-gray-600">Checking enrollment...</p>
                    </div>
                ) : (
                    <div>
                        {session ? (
                            <div>
                                {isEnrolled ? (
                                    <div className="tw-text-center">
                                        <div className="tw-mb-4 tw-rounded-md tw-bg-green-100 tw-px-4 tw-py-2 tw-text-green-800">
                                            ✓ Enrolled
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="hover:tw-bg-primary-dark tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-text-center tw-font-semibold tw-text-white tw-transition-colors"
                                        >
                                            Go to Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div>
                                        {coursePlatformUrl ? (
                                            <Link
                                                href={coursePlatformUrl}
                                                className="hover:tw-bg-primary-dark tw-mb-4 tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-text-center tw-font-semibold tw-text-white tw-transition-colors"
                                            >
                                                Enroll in Learning Platform
                                            </Link>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleEnroll}
                                                disabled={enrolling}
                                                className="hover:tw-bg-primary-dark tw-mb-4 tw-w-full tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors disabled:tw-opacity-50"
                                            >
                                                {enrolling
                                                    ? "Enrolling..."
                                                    : "Join Learning Platform"}
                                            </button>
                                        )}

                                        <p className="tw-text-center tw-text-sm tw-text-gray-600">
                                            Access interactive lessons, assignments, and progress
                                            tracking
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <Link
                                    href="/login"
                                    className="hover:tw-bg-primary-dark tw-mb-4 tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-text-center tw-font-semibold tw-text-white tw-transition-colors"
                                >
                                    Sign In to Enroll
                                </Link>
                                <p className="tw-text-center tw-text-sm tw-text-gray-600">
                                    Join the learning platform for hands-on experience
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Course Info */}
                <div className="tw-mt-6 tw-border-t tw-border-gray-200 tw-pt-6">
                    <h4 className="tw-mb-3 tw-font-semibold tw-text-gray-900">
                        What&apos;s Included:
                    </h4>
                    <ul className="tw-space-y-2 tw-text-sm tw-text-gray-600">
                        <li className="tw-flex tw-items-center">
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            Course materials & resources
                        </li>
                        <li className="tw-flex tw-items-center">
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            Interactive assignments
                        </li>
                        <li className="tw-flex tw-items-center">
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            Progress tracking
                        </li>
                        <li className="tw-flex tw-items-center">
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            Community support
                        </li>
                        <li className="tw-flex tw-items-center">
                            <i className="fas fa-check tw-mr-2 tw-text-green-500" />
                            Certificate of completion
                        </li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div className="tw-mt-6 tw-border-t tw-border-gray-200 tw-pt-6">
                    <h4 className="tw-mb-3 tw-font-semibold tw-text-gray-900">Quick Links:</h4>
                    <div className="tw-space-y-2">
                        <Link
                            href="/courses"
                            className="hover:tw-text-primary-dark tw-block tw-text-sm tw-text-primary tw-transition-colors"
                        >
                            <i className="fas fa-book tw-mr-2" />
                            Browse All Courses
                        </Link>
                        <Link
                            href="/subjects/all"
                            className="hover:tw-text-primary-dark tw-block tw-text-sm tw-text-primary tw-transition-colors"
                        >
                            <i className="fas fa-list tw-mr-2" />
                            View All Subjects
                        </Link>
                        {session && (
                            <Link
                                href="/dashboard"
                                className="hover:tw-text-primary-dark tw-block tw-text-sm tw-text-primary tw-transition-colors"
                            >
                                <i className="fas fa-tachometer-alt tw-mr-2" />
                                My Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentSidebar;
