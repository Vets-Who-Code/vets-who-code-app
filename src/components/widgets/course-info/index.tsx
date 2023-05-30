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
    published_at: string;
};

const CourseInfo = ({ lessonLink, slug, published_at }: TProps) => {
    const [show, setShow] = useState(false);
    const mounted = useMount();
    const { isLoggedIn, enrolCourse, courseProgress } = useUser();
    /* const enrolledCourse = courseProgress.find((cs) => cs.course === slug); */

    const enrollHandler = () => {
        if (isLoggedIn) {
            enrolCourse({ course: slug, lessonLink });
            void Router.push(lessonLink);
        } else {
            void Router.push("/login-register");
        }
    };

    /*    const continueHandler = () => {
        if (enrolledCourse) {
            void Router.push(enrolledCourse.currentLesson);
        }
    }; */

    if (!mounted) return null;

    return (
        <>
            <div className="course-info-widget tw-pt-7.5 tw-px-7.5 tw-pb-[33px] tw-bg-white tw-shadow-2sm tw-shadow-heading/10 tw-rounded lg:tw-max-w-[340px]">
                <div className="course-meta tw-mb-10">
                    <CourseInfoItem
                        icon="far fa-calendar"
                        label="Published"
                        value={dayjs(published_at).format("MMM DD YYYY")}
                    />
                </div>
                <Button fullwidth className="tw-mb-4" onClick={enrollHandler}>
                    Start Now
                </Button>
                <Button fullwidth onClick={() => setShow(true)}>
                    Login
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
