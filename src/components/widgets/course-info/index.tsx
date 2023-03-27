/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from "react";
import dayjs from "dayjs";
import Router from "next/router";
import Button from "@ui/button";
import SocialShare from "@components/social-share/layout-01";
import EnrollModal from "@components/modals/enroll-modal";
import { useUser } from "@contexts/user-context";
import { useMount } from "@hooks";
import CourseInfoItem from "./item";

type TProps = {
    lessonLink: string;
    slug: string;
    price: number;
    currency: string;
    instructor: string;
    duration: string;
    lectures: number;
    students: number;
    language: string;
    published_at: string;
};

const CourseInfo = ({
    lessonLink,
    slug,
    price,
    currency,
    instructor,
    duration,
    lectures,
    students,
    language,
    published_at,
}: TProps) => {
    const [show, setShow] = useState(false);
    const mounted = useMount();
    const { isLoggedIn, enrolCourse, courseProgress } = useUser();
    const enrolledCourse = courseProgress.find((cs) => cs.course === slug);

    const enrollHandler = () => {
        if (isLoggedIn) {
            enrolCourse({ course: slug, lessonLink });
            void Router.push(lessonLink);
        } else {
            void Router.push("/login-register");
        }
    };

    const continueHandler = () => {
        if (enrolledCourse) {
            void Router.push(enrolledCourse.currentLesson);
        }
    };

    if (!mounted) return null;

    return (
        <>
            <div className="course-info-widget tw-pt-7.5 tw-px-7.5 tw-pb-[33px] tw-bg-white tw-shadow-2sm tw-shadow-heading/10 tw-rounded lg:tw-max-w-[340px]">
                <div className="course-price tw-flex tw-items-center tw-justify-between tw-mb-[7px]">
                    <h6 className="tw-mb-0">
                        <i className="far fa-money-bill-wave tw-text-body tw-min-w-[28px] tw-text-center" />{" "}
                        Price
                    </h6>
                    <span className="tw-text-right">
                        <span className="tw-text-2xl tw-text-primary tw-font-extrabold">
                            {currency}
                            {price}
                            <span className="tw-text-lg">.00</span>
                        </span>
                    </span>
                </div>
                <div className="course-meta tw-mb-10">
                    <CourseInfoItem
                        icon="far fa-chalkboard-teacher"
                        label="Instructor"
                        value={instructor}
                    />
                    <CourseInfoItem
                        icon="far fa-clock"
                        label="Duration"
                        value={duration}
                    />
                    <CourseInfoItem
                        icon="far fa-file-alt"
                        label="Lectures"
                        value={lectures}
                    />
                    <CourseInfoItem
                        icon="far fa-user-alt"
                        label="Enrolled"
                        value={`${students} Students`}
                    />
                    <CourseInfoItem
                        icon="far fa-language"
                        label="Language"
                        value={language}
                    />
                    <CourseInfoItem
                        icon="far fa-calendar"
                        label="Deadline"
                        value={dayjs(published_at).format("MMM DD YYYY")}
                    />
                </div>

                {enrolledCourse ? (
                    <Button
                        fullwidth
                        className="tw-mb-4"
                        onClick={continueHandler}
                    >
                        Continue
                    </Button>
                ) : (
                    <>
                        {price !== 0 ? (
                            <Button
                                fullwidth
                                className="tw-mb-4"
                                onClick={() => setShow(true)}
                            >
                                Enroll Now
                            </Button>
                        ) : (
                            <Button
                                fullwidth
                                className="tw-mb-4"
                                onClick={enrollHandler}
                            >
                                Start Now
                            </Button>
                        )}
                    </>
                )}

                <Button fullwidth onClick={() => setShow(true)}>
                    Buy Membership
                </Button>
                <div className="tw-mt-5 tw-text-center">
                    <SocialShare />
                </div>
            </div>
            <EnrollModal show={show} onClose={() => setShow(false)} />
        </>
    );
};

export default CourseInfo;
