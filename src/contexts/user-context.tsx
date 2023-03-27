/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createContext, useContext, useMemo, useReducer } from "react";

const COURSESTORE_KEY = "maxCourse";
const AUTH_KEY = "maxAuth";

// User Context

type CourseType = {
    course: string;
    completedLessons: string[];
    currentLesson: string;
};

//  Context Type
export type UserContextType = {
    isLoggedIn: boolean | null;
    courseProgress: CourseType[];
    setLogin: () => void;
    enrolCourse: (data: { course: string; lessonLink: string }) => void;
    lessonComplete: (data: {
        course: string;
        lessonLink: string;
        lesson: string;
    }) => void;
};

export const UserContext = createContext({} as UserContextType);

// User Reducer

const initialState = {
    isLoggedIn: false,
    courseProgress: [] as CourseType[],
};

const init = () => {
    if (typeof window === "undefined") return initialState;
    const loginStore = localStorage.getItem(AUTH_KEY);
    const courseStore = localStorage.getItem(COURSESTORE_KEY);

    const courseParse =
        courseStore !== null
            ? (JSON.parse(courseStore) as CourseType[])
            : ([] as CourseType[]);
    const loginParse =
        loginStore !== null ? (JSON.parse(loginStore) as boolean) : false;

    return {
        ...initialState,
        isLoggedIn: loginParse,
        courseProgress: courseParse,
    };
};

interface UserAction {
    type: "LOGIN" | "ENROLL_COURSE" | "LESSON_COMPLETE";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
}

function reducer(state: typeof initialState, action: UserAction) {
    switch (action.type) {
        case "LOGIN": {
            localStorage.setItem(AUTH_KEY, JSON.stringify(true));
            return {
                ...state,
                isLoggedIn: true,
            };
        }
        case "ENROLL_COURSE": {
            const courseProgress = [
                ...state.courseProgress,
                {
                    course: action.payload.course,
                    currentLesson: action.payload.lessonLink,
                    completedLessons: [],
                },
            ];
            localStorage.setItem(
                COURSESTORE_KEY,
                JSON.stringify(courseProgress)
            );
            return {
                ...state,
                courseProgress,
            };
        }
        case "LESSON_COMPLETE": {
            const courseProgress = state.courseProgress.map((cs) => {
                // console.log(cs, action.payload.course, action.payload.lesson);
                if (cs.course === action.payload.course) {
                    return {
                        ...cs,
                        completedLessons: [
                            ...cs.completedLessons,
                            action.payload.lesson,
                        ],
                        currentLesson: action.payload.lessonLink,
                    };
                }
                return cs;
            });
            localStorage.setItem(
                COURSESTORE_KEY,
                JSON.stringify(courseProgress)
            );
            return {
                ...state,
                courseProgress,
            };
        }
        default:
            return state;
    }
}

// User Context Provider

type TProps = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: TProps) => {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    const value = useMemo(
        () => ({
            ...state,
            setLogin: () => {
                dispatch({
                    type: "LOGIN",
                });
            },
            enrolCourse: (data: { course: string; lessonLink: string }) => {
                dispatch({
                    type: "ENROLL_COURSE",
                    payload: data,
                });
            },
            lessonComplete: (data: {
                course: string;
                lessonLink: string;
                lesson: string;
            }) => {
                dispatch({
                    type: "LESSON_COMPLETE",
                    payload: data,
                });
            },
        }),
        [state]
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

// User Context Consumer hooks

export const useUser = () => useContext(UserContext);
