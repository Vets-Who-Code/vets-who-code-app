import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { SafeLocalStorage } from "@utils/safe-storage";

// Constants for local storage keys
const AUTH_KEY = "vwcAuth";
// Session timeout in minutes (e.g., 24 hours)
const SESSION_TIMEOUT_MINUTES = 24 * 60;

// Define the UserContextType
export type UserContextType = {
    isLoggedIn: boolean;
    setLogin: () => void;
    logout: () => void;
};

// State interface
interface UserState {
    isLoggedIn: boolean;
}

// Define action types more specifically
type UserAction = { type: "LOGIN" } | { type: "LOGOUT" };

// Create the UserContext
export const UserContext = createContext<UserContextType>({} as UserContextType);

// Initial state
const initialState: UserState = {
    isLoggedIn: false,
};

// Initialize state from local storage with safe handling
const init = (): UserState => {
    if (typeof window === "undefined") return initialState;

    // Use SafeStorage to get auth state with fallback to false
    const isLoggedIn = SafeLocalStorage.getItem<boolean>(AUTH_KEY, false);

    return {
        ...initialState,
        isLoggedIn,
    };
};

// Reducer function to handle state changes
function reducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
        case "LOGIN": {
            // Use SafeStorage to set auth state with session timeout
            SafeLocalStorage.setItem(AUTH_KEY, true, SESSION_TIMEOUT_MINUTES);
            return {
                ...state,
                isLoggedIn: true,
            };
        }
        case "LOGOUT": {
            // Use SafeStorage to remove auth state
            SafeLocalStorage.removeItem(AUTH_KEY);
            return {
                ...state,
                isLoggedIn: false,
            };
        }
        default:
            return state;
    }
}

// UserContext Provider component
type TProps = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: TProps) => {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    // Ensure user is logged out on initial load if isLoggedIn is incorrect
    useEffect(() => {
        if (!state.isLoggedIn) {
            SafeLocalStorage.removeItem(AUTH_KEY);
        }
    }, [state.isLoggedIn]);

    const value = useMemo(
        () => ({
            ...state,
            setLogin: () => {
                dispatch({ type: "LOGIN" });
            },
            logout: () => {
                dispatch({ type: "LOGOUT" });
            },
        }),
        [state]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);
