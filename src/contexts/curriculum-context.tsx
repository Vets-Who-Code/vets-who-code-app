import { createContext, useContext, useMemo, useReducer } from "react";
import { ICurriculum } from "@utils/types";

// Curriculum Context

export type CurriculumContextType = {
    allCurriculum: ICurriculum[];
    curriculum: ICurriculum[];
    totalLessons: number;
    searchCurriculum: (search: string) => void;
};

export const CurriculumContext = createContext({} as CurriculumContextType);

// Curriculum Reducer
interface CurAction {
    type: "SEARCH_LESSON";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
}

function reducer(
    state: Omit<CurriculumContextType, "searchCurriculum">,
    action: CurAction
) {
    switch (action.type) {
        case "SEARCH_LESSON": {
            const search = action.payload as string;

            const curriculum = state.allCurriculum
                .map((cc) => {
                    const lessons = cc.lessons.filter((lsn) => {
                        return lsn.title
                            .toLowerCase()
                            .includes(search.toLowerCase());
                    });
                    return {
                        ...cc,
                        lessons,
                    };
                })
                .filter(Boolean);

            return {
                ...state,
                curriculum,
            };
        }
        default:
            return state;
    }
}

// Curriculum Context Provider

type TProps = {
    children: React.ReactNode;
    curriculum: ICurriculum[];
};

export const CurriculumProvider = ({ children, curriculum }: TProps) => {
    const totalLessons = curriculum.reduce(
        (acc, cur) => acc + cur.lessons.length,
        0
    );
    const [state, dispatch] = useReducer(reducer, {
        totalLessons,
        allCurriculum: curriculum,
        curriculum,
    });

    const value = useMemo(
        () => ({
            ...state,
            searchCurriculum: (data: string) => {
                dispatch({
                    type: "SEARCH_LESSON",
                    payload: data,
                });
            },
        }),
        [state]
    );

    return (
        <CurriculumContext.Provider value={value}>
            {children}
        </CurriculumContext.Provider>
    );
};

// Curriculum Context Consumer hooks

export const useCurriculumContext = () => useContext(CurriculumContext);
