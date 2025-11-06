import React from "react";
import Link from "next/link";

type ModernCourseCardProps = {
    course: {
        id: string;
        title: string;
        description: string;
        imageUrl?: string;
        progress?: number;
        totalLessons: number;
        completedLessons: number;
        duration: string;
        difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
        lastAccessed?: string;
    };
    isEnrolled?: boolean;
};

export const ModernCourseCard: React.FC<ModernCourseCardProps> = ({ course, isEnrolled }) => {
    const difficultyColors = {
        BEGINNER: "tw-bg-green-100 tw-text-green-800",
        INTERMEDIATE: "tw-bg-yellow-100 tw-text-yellow-800",
        ADVANCED: "tw-bg-red-100 tw-text-red-800",
    };

    return (
        <div className="tw-group tw-overflow-hidden tw-rounded-xl tw-bg-white tw-shadow-md tw-transition-all hover:tw-shadow-xl">
            {/* Image */}
            <div className="tw-relative tw-aspect-video tw-overflow-hidden tw-bg-gradient-to-br tw-from-blue-500 tw-to-purple-600">
                {course.imageUrl ? (
                    <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="tw-h-full tw-w-full tw-object-cover tw-transition-transform group-hover:tw-scale-105"
                    />
                ) : (
                    <div className="tw-flex tw-h-full tw-items-center tw-justify-center">
                        <i className="fas fa-graduation-cap tw-text-6xl tw-text-white/30" />
                    </div>
                )}

                {/* Difficulty Badge */}
                <div className="tw-absolute tw-left-4 tw-top-4">
                    <span
                        className={`tw-rounded-full tw-px-3 tw-py-1 tw-text-xs tw-font-semibold ${difficultyColors[course.difficulty]}`}
                    >
                        {course.difficulty}
                    </span>
                </div>

                {/* Progress Overlay */}
                {isEnrolled && course.progress !== undefined && (
                    <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-black/60 tw-p-3">
                        <div className="tw-mb-1 tw-flex tw-justify-between tw-text-xs tw-text-white">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                        </div>
                        <div className="tw-h-1.5 tw-overflow-hidden tw-rounded-full tw-bg-white/20">
                            <div
                                className="tw-h-full tw-rounded-full tw-bg-green-400 tw-transition-all"
                                style={{ width: `${course.progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="tw-p-6">
                <h3 className="tw-mb-2 tw-text-xl tw-font-bold tw-text-gray-900 group-hover:tw-text-blue-600">
                    {course.title}
                </h3>
                <p className="tw-mb-4 tw-line-clamp-2 tw-text-sm tw-text-gray-600">
                    {course.description}
                </p>

                {/* Meta Info */}
                <div className="tw-mb-4 tw-flex tw-items-center tw-space-x-4 tw-text-sm tw-text-gray-500">
                    <div className="tw-flex tw-items-center">
                        <i className="fas fa-book tw-mr-1.5 tw-text-xs" />
                        {course.totalLessons} lessons
                    </div>
                    <div className="tw-flex tw-items-center">
                        <i className="fas fa-clock tw-mr-1.5 tw-text-xs" />
                        {course.duration}
                    </div>
                    {isEnrolled && (
                        <div className="tw-flex tw-items-center">
                            <i className="fas fa-check-circle tw-mr-1.5 tw-text-xs tw-text-green-500" />
                            {course.completedLessons} completed
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <Link
                    href={
                        isEnrolled
                            ? `/courses/${course.id}`
                            : `/courses/${course.id}`
                    }
                    className={`tw-block tw-w-full tw-rounded-lg tw-py-3 tw-text-center tw-font-semibold tw-transition-colors ${
                        isEnrolled
                            ? "tw-bg-blue-600 tw-text-white hover:tw-bg-blue-700"
                            : "tw-bg-gray-100 tw-text-gray-900 hover:tw-bg-gray-200"
                    }`}
                >
                    {isEnrolled ? (
                        <>
                            <i className="fas fa-play tw-mr-2" />
                            Continue Learning
                        </>
                    ) : (
                        <>
                            <i className="fas fa-info-circle tw-mr-2" />
                            View Course
                        </>
                    )}
                </Link>

                {/* Last Accessed */}
                {isEnrolled && course.lastAccessed && (
                    <p className="tw-mt-3 tw-text-center tw-text-xs tw-text-gray-500">
                        Last accessed {course.lastAccessed}
                    </p>
                )}
            </div>
        </div>
    );
};
