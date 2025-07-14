import EmojiRain from "@components/EmojiRain";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Input from "@ui/form-elements/input";
import Checkbox from "@ui/form-elements/checkbox";
import TextArea from "@ui/form-elements/textarea";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";
import Feedback from "@ui/form-elements/feedback";
import { linkedinRegex, githubRegex } from "@utils/formValidations";
import { motion } from "motion/react";

interface IFormValues {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    branchOfService: string;
    yearJoined: string;
    yearSeparated: string;
    hasAttendedPreviousCourse: boolean;
    previousCourses: string;
    willAttendAnotherCourse: boolean;
    otherCourses: string;
    linkedInAccountName: string;
    githubAccountName: string;
    preworkLink: string;
    preworkRepo: string;
}

const ApplyForm = () => {
    const [message, setMessage] = useState("");
    const [showEmojiRain, setShowEmojiRain] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<IFormValues>();

    const watchHasAttendedPreviousCourses = watch("hasAttendedPreviousCourse", false);
    const watchWillAttendAnotherCourse = watch("willAttendAnotherCourse", false);

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        try {
            await axios.post("/api/apply", data);
            setMessage("Thank you for your application!");
            setShowEmojiRain(true);

            // Optional: Hide the EmojiRain after a set duration
            setTimeout(() => setShowEmojiRain(false), 5000); // Adjust duration as necessary
            reset();
        } catch (error) {
            setMessage("Failed to submit the form. Please try again later.");
        }
    };

    return (
        <div className="tw:px-4 tw:md:px-[250px]">
            <h3 className="tw:px-4 tw:md:px-0">Apply</h3>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="tw:mb-7.5">
                    <label htmlFor="firstName" className="tw:text-md tw:text-heading">
                        First Name *
                    </label>
                    <Input
                        id="firstName"
                        placeholder="Jody"
                        bg="light"
                        feedbackText={errors?.firstName?.message}
                        state={hasKey(errors, "firstName") ? "error" : "success"}
                        showState={!!hasKey(errors, "firstName")}
                        {...register("firstName", {
                            required: "First Name is required",
                        })}
                    />
                </div>
                <div className="tw:mb-7.5">
                    <label htmlFor="lastName" className="tw:text-md tw:text-heading">
                        Last Name *
                    </label>
                    <Input
                        id="lastName"
                        placeholder="Civilian"
                        bg="light"
                        feedbackText={errors?.lastName?.message}
                        state={hasKey(errors, "lastName") ? "error" : "success"}
                        showState={!!hasKey(errors, "lastName")}
                        {...register("lastName", {
                            required: "Last Name is required",
                        })}
                    />
                </div>
                <div className="tw:mb-7.5">
                    <label htmlFor="email" className="tw:text-md tw:text-heading">
                        Email *
                    </label>
                    <Input
                        id="email"
                        placeholder="jody.civilian@jody.com"
                        bg="light"
                        feedbackText={errors?.email?.message}
                        state={hasKey(errors, "email") ? "error" : "success"}
                        showState={!!hasKey(errors, "email")}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                </div>
                <div className="tw:mb-7.5">
                    <label htmlFor="city" className="tw:text-md tw:text-heading">
                        City *
                    </label>
                    <Input
                        id="city"
                        placeholder="City"
                        bg="light"
                        feedbackText={errors?.city?.message}
                        state={hasKey(errors, "city") ? "error" : "success"}
                        showState={!!hasKey(errors, "city")}
                        {...register("city", {
                            required: "City is required",
                        })}
                    />
                </div>
                <div className="tw:mb-7.5">
                    <label htmlFor="state" className="tw:text-md tw:text-heading">
                        State *
                    </label>
                    <Input
                        id="state"
                        placeholder="State"
                        bg="light"
                        feedbackText={errors?.state?.message}
                        state={hasKey(errors, "state") ? "error" : "success"}
                        showState={!!hasKey(errors, "state")}
                        {...register("state", {
                            required: "State is required",
                        })}
                    />
                </div>
                <div className="tw:mb-7.5">
                    <label htmlFor="zipCode" className="tw:text-md tw:text-heading">
                        Zip Code *
                    </label>
                    <Input
                        id="zipCode"
                        placeholder="23450"
                        bg="light"
                        feedbackText={errors?.zipCode?.message}
                        state={hasKey(errors, "zipCode") ? "error" : "success"}
                        showState={!!hasKey(errors, "zipCode")}
                        {...register("zipCode", {
                            required: "Zip Code is required",
                        })}
                    />
                </div>
                <div className="tw:mb-7.5">
                    <label htmlFor="country" className="tw:text-md tw:text-heading">
                        Country *
                    </label>
                    <Input
                        id="country"
                        placeholder="United States"
                        bg="light"
                        feedbackText={errors?.country?.message}
                        state={hasKey(errors, "country") ? "error" : "success"}
                        showState={!!hasKey(errors, "country")}
                        {...register("country", {
                            required: "Country is required",
                        })}
                    />
                </div>
                <div className="tw:mb-7.5">
                    <label htmlFor="branchOfService" className="tw:text-md tw:text-heading">
                        Branch of Service *
                    </label>
                    <Input
                        id="branchOfService"
                        placeholder="Civilian Baby!"
                        bg="light"
                        feedbackText={errors?.branchOfService?.message}
                        state={hasKey(errors, "branchOfService") ? "error" : "success"}
                        showState={!!hasKey(errors, "branchOfService")}
                        {...register("branchOfService", {
                            required: "Branch of Service is required",
                        })}
                    />
                </div>
                <div className="tw:mb-7.5">
                    <label htmlFor="yearJoined" className="tw:text-md tw:text-heading">
                        Year Joined *
                    </label>
                    <Input
                        id="yearJoined"
                        placeholder="Never!"
                        bg="light"
                        feedbackText={errors?.yearJoined?.message}
                        state={hasKey(errors, "yearJoined") ? "error" : "success"}
                        showState={!!hasKey(errors, "yearJoined")}
                        {...register("yearJoined", {
                            required: "Year Joined is required",
                        })}
                    />
                </div>
                <div className="tw:mb-7.5">
                    <label htmlFor="yearSeparated" className="tw:text-md tw:text-heading">
                        Year Separated *
                    </label>
                    <Input
                        id="yearSeparated"
                        placeholder="Never Joined"
                        bg="light"
                        feedbackText={errors?.yearSeparated?.message}
                        state={hasKey(errors, "yearSeparated") ? "error" : "success"}
                        showState={!!hasKey(errors, "yearSeparated")}
                        {...register("yearSeparated", {
                            required: "Year Separated is required",
                        })}
                    />
                </div>
                <Checkbox
                    label="Have you previously attended any coding bootcamps or tech education programs?"
                    id="hasAttendedPreviousCourse"
                    {...register("hasAttendedPreviousCourse")}
                />
                <br />
                {watchHasAttendedPreviousCourses && (
                    <motion.div
                        layout
                        className="tw:mb-7.5"
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <label htmlFor="previousCourses" className="tw:text-md tw:text-heading">
                            List previous courses *
                        </label>
                        <TextArea
                            id="previousCourses"
                            placeholder="Javascript 101"
                            bg="light"
                            feedbackText={errors?.previousCourses?.message}
                            state={hasKey(errors, "previousCourses") ? "error" : "success"}
                            showState={!!hasKey(errors, "previousCourses")}
                            {...register("previousCourses", {
                                required: "List previous coursework or uncheck the box",
                            })}
                        />
                    </motion.div>
                )}
                <motion.div layout>
                    <Checkbox
                        label="Will you be attending any other courses or programs concurrently with Vets Who Code?"
                        id="willAttendAnotherCourse"
                        {...register("willAttendAnotherCourse")}
                    />
                    <br />
                </motion.div>
                {watchWillAttendAnotherCourse && (
                    <motion.div
                        layout
                        className="tw:mb-7.5"
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <label htmlFor="otherCourses" className="tw:text-md tw:text-heading">
                            List concurrent courses/programs *
                        </label>
                        <TextArea
                            id="otherCourses"
                            placeholder="Civvies Who Code"
                            bg="light"
                            feedbackText={errors?.otherCourses?.message}
                            state={hasKey(errors, "otherCourses") ? "error" : "success"}
                            showState={!!hasKey(errors, "otherCourses")}
                            {...register("otherCourses", {
                                required: "List concurrent coursework or uncheck the box",
                            })}
                        />
                    </motion.div>
                )}
                <motion.div layout className="tw:mb-7.5">
                    <label htmlFor="linkedInAccountName" className="tw:text-md tw:text-heading">
                        LinkedIn Account Name *
                    </label>
                    <Input
                        id="linkedInAccountName"
                        placeholder="linkedin.com/in/jody-civilian"
                        bg="light"
                        feedbackText={errors?.linkedInAccountName?.message}
                        state={hasKey(errors, "linkedInAccountName") ? "error" : "success"}
                        showState={!!hasKey(errors, "linkedInAccountName")}
                        {...register("linkedInAccountName", {
                            required: "LinkedIn Account Name is required",
                            pattern: {
                                value: linkedinRegex,
                                message:
                                    "Please enter your Linkedin profile URL. For example, linkedin.com/in/your-name",
                            },
                        })}
                    />
                </motion.div>
                <motion.div layout className="tw:mb-7.5">
                    <label htmlFor="githubAccountName" className="tw:text-md tw:text-heading">
                        GitHub Account Name *
                    </label>
                    <Input
                        id="githubAccountName"
                        placeholder="github.com/jody-civilian"
                        bg="light"
                        feedbackText={errors?.githubAccountName?.message}
                        state={hasKey(errors, "githubAccountName") ? "error" : "success"}
                        showState={!!hasKey(errors, "githubAccountName")}
                        {...register("githubAccountName", {
                            required: "GitHub Account Name is required",
                            pattern: {
                                value: githubRegex,
                                message:
                                    "Please enter your Github profile URL. For example, github.com/your-name",
                            },
                        })}
                    />
                </motion.div>
                <motion.div layout className="tw:mb-7.5">
                    <label htmlFor="preworkLink" className="tw:text-md tw:text-heading">
                        Prework Link *
                    </label>
                    <Input
                        id="preworkLink"
                        placeholder="jody-civilian.github.io/prework"
                        bg="light"
                        feedbackText={errors?.preworkLink?.message}
                        state={hasKey(errors, "preworkLink") ? "error" : "success"}
                        showState={!!hasKey(errors, "preworkLink")}
                        {...register("preworkLink", {
                            required: "Prework Link is required",
                        })}
                    />
                </motion.div>
                <motion.div layout className="tw:mb-7.5">
                    <label htmlFor="preworkRepo" className="tw:text-md tw:text-heading">
                        Prework Repository *
                    </label>
                    <Input
                        id="preworkRepo"
                        placeholder="github.com/jody-civilian/prework"
                        bg="light"
                        feedbackText={errors?.preworkRepo?.message}
                        state={hasKey(errors, "preworkRepo") ? "error" : "success"}
                        showState={!!hasKey(errors, "preworkRepo")}
                        {...register("preworkRepo", {
                            required: "Prework Repository is required",
                        })}
                    />
                </motion.div>

                <motion.div layout>
                    <Button
                        type="submit"
                        fullwidth
                        className="tw:mx-auto tw:mt-7.5 tw:w-full tw:sm:w-[200px]"
                    >
                        Apply
                    </Button>
                    {message && <Feedback state="success">{message}</Feedback>}
                    {showEmojiRain && <EmojiRain />}
                </motion.div>
            </form>
        </div>
    );
};

export default ApplyForm;
