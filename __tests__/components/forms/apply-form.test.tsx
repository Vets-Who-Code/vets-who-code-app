import ApplyForm from "@components/forms/apply-form";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

vi.mock("axios");

vi.mock("@components/EmojiRain", () => ({
    default: () => <div data-testid="emoji-rain" />,
}));

// happy-dom cannot run motion's animations: AnimatePresence mode="wait" keeps the
// exiting step mounted, and every cancelled animation rejects with an AbortError.
vi.mock("motion/react", () => ({
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
        div: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
            <div className={className}>{children}</div>
        ),
    },
}));

const mockPost = vi.mocked(axios.post);

const VALID = {
    firstName: "Jody",
    lastName: "Vet",
    email: "jody@example.com",
    city: "Nashville",
    state: "Tennessee",
    zipCode: "37203",
    country: "United States",
    branchOfService: "Army",
    yearJoined: "2010",
    yearSeparated: "2015",
    linkedInAccountName: "https://www.linkedin.com/in/jody-vet",
    githubAccountName: "https://github.com/jodyvet",
    preworkLink: "https://jodyvet.github.io/prework",
    preworkRepo: "https://github.com/jodyvet/prework",
};

type Values = typeof VALID;

const STEP_HEADINGS = [
    "Personal Information",
    "Location Details",
    "Military Background",
    "Education History",
    "Technical Profiles & Prework",
];

// Step 4 has no required fields while both checkboxes stay unchecked.
const STEP_FIELDS: Array<Array<[keyof Values, RegExp]>> = [
    [
        ["firstName", /first name/i],
        ["lastName", /last name/i],
        ["email", /email address/i],
    ],
    [
        ["city", /city/i],
        ["state", /state\/province/i],
        ["zipCode", /zip\/postal code/i],
        ["country", /country/i],
    ],
    [
        ["branchOfService", /branch of service/i],
        ["yearJoined", /year joined/i],
        ["yearSeparated", /year separated/i],
    ],
    [],
    [
        ["linkedInAccountName", /linkedin profile url/i],
        ["githubAccountName", /github profile url/i],
        ["preworkLink", /prework live link/i],
        ["preworkRepo", /prework repository url/i],
    ],
];

const LINKEDIN_ERROR =
    "Please enter a valid LinkedIn profile URL (e.g., linkedin.com/in/your-name)";
const GITHUB_ERROR = "Please enter a valid GitHub profile URL (e.g., github.com/your-username)";
const SUCCESS_MESSAGE = "Thank you for your application! We'll review it and get back to you soon.";
const FAILURE_MESSAGE = "Failed to submit the form. Please try again later.";

// The form validates on blur, so blur after every change.
const fill = (label: RegExp, value: string) => {
    const field = screen.getByLabelText(label);
    fireEvent.change(field, { target: { value } });
    fireEvent.blur(field);
};

const fillStep = (step: number, overrides: Partial<Values> = {}) => {
    for (const [name, label] of STEP_FIELDS[step - 1]) {
        fill(label, overrides[name] ?? VALID[name]);
    }
};

const clickNext = () => fireEvent.click(screen.getByRole("button", { name: /next/i }));
const clickPrevious = () => fireEvent.click(screen.getByRole("button", { name: /previous/i }));
const clickSubmit = () =>
    fireEvent.click(screen.getByRole("button", { name: "Submit Application" }));

const expectStep = (step: number) => {
    expect(screen.getByRole("heading", { name: STEP_HEADINGS[step - 1] })).toBeInTheDocument();
    expect(screen.getByText(`Step ${step}`).parentElement).toHaveTextContent(`Step ${step} of 5`);
};

// Fills every step before `target` with valid data and lands on `target`.
const walkToStep = async (target: number, overrides: Partial<Values> = {}) => {
    for (let step = 1; step < target; step++) {
        fillStep(step, overrides);
        clickNext();
        await screen.findByRole("heading", { name: STEP_HEADINGS[step] });
    }
};

const submitValidApplication = async (overrides: Partial<Values> = {}) => {
    await walkToStep(5, overrides);
    fillStep(5, overrides);
    clickSubmit();
};

describe("ApplyForm", () => {
    beforeEach(() => {
        mockPost.mockReset();
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it("starts on step 1 of 5 with the personal info fields", () => {
        render(<ApplyForm />);

        expectStep(1);
        expect(screen.getByLabelText(/first name/i)).toHaveValue("");
        expect(screen.getByLabelText(/last name/i)).toHaveValue("");
        expect(screen.getByLabelText(/email address/i)).toHaveValue("");
        expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: "Submit Application" })
        ).not.toBeInTheDocument();
    });

    it("blocks Next and shows the required messages when step 1 is empty", async () => {
        render(<ApplyForm />);

        clickNext();

        expect(await screen.findByText("First name is required")).toBeInTheDocument();
        expect(screen.getByText("Last name is required")).toBeInTheDocument();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
        expectStep(1);
        expect(screen.queryByRole("heading", { name: "Location Details" })).not.toBeInTheDocument();
    });

    it("advances to step 2 with valid data and keeps the values when going back", async () => {
        render(<ApplyForm />);

        await walkToStep(2);
        expectStep(2);

        clickPrevious();

        expectStep(1);
        expect(screen.getByLabelText(/first name/i)).toHaveValue(VALID.firstName);
        expect(screen.getByLabelText(/last name/i)).toHaveValue(VALID.lastName);
        expect(screen.getByLabelText(/email address/i)).toHaveValue(VALID.email);
    });

    it("reveals and requires the previous courses field when the box is checked", async () => {
        render(<ApplyForm />);
        await walkToStep(4);

        expect(screen.queryByLabelText(/list previous courses/i)).not.toBeInTheDocument();

        fireEvent.click(screen.getByLabelText(/previously attended/i));

        expect(screen.getByLabelText(/list previous courses/i)).toBeInTheDocument();

        clickNext();

        expect(
            await screen.findByText("Please list your previous courses or uncheck the box")
        ).toBeInTheDocument();
        expectStep(4);
    });

    it("reveals and requires the concurrent courses field when the box is checked", async () => {
        render(<ApplyForm />);
        await walkToStep(4);

        expect(screen.queryByLabelText(/list concurrent courses/i)).not.toBeInTheDocument();

        fireEvent.click(screen.getByLabelText(/attending any other courses/i));

        expect(screen.getByLabelText(/list concurrent courses/i)).toBeInTheDocument();

        clickNext();

        expect(
            await screen.findByText("Please list concurrent courses or uncheck the box")
        ).toBeInTheDocument();
        expectStep(4);
    });

    it("rejects malformed LinkedIn and GitHub URLs and accepts valid ones", async () => {
        render(<ApplyForm />);
        await walkToStep(5);
        fillStep(5, {
            linkedInAccountName: "linkedin.com/in/jody-vet",
            githubAccountName: "github.com/jodyvet",
        });

        clickSubmit();

        expect(await screen.findByText(LINKEDIN_ERROR)).toBeInTheDocument();
        expect(screen.getByText(GITHUB_ERROR)).toBeInTheDocument();
        expect(mockPost).not.toHaveBeenCalled();

        fill(/linkedin profile url/i, VALID.linkedInAccountName);
        fill(/github profile url/i, VALID.githubAccountName);

        await waitFor(() => {
            expect(screen.queryByText(LINKEDIN_ERROR)).not.toBeInTheDocument();
        });
        expect(screen.queryByText(GITHUB_ERROR)).not.toBeInTheDocument();
    });

    it("posts the parsed application, celebrates, and stops the rain after 5s", async () => {
        mockPost.mockResolvedValue({ data: {} } as never);
        render(<ApplyForm />);

        await submitValidApplication();

        await waitFor(() => {
            expect(mockPost).toHaveBeenCalledTimes(1);
        });
        expect(mockPost).toHaveBeenCalledWith("/api/apply", {
            ...VALID,
            zipCode: 37203,
            yearJoined: 2010,
            yearSeparated: 2015,
            hasAttendedPreviousCourse: false,
            willAttendAnotherCourse: false,
        });

        expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument();
        expect(screen.getByTestId("emoji-rain")).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(screen.queryByTestId("emoji-rain")).not.toBeInTheDocument();
    });

    it("sends null for a postal code that is not numeric", async () => {
        mockPost.mockResolvedValue({ data: {} } as never);
        render(<ApplyForm />);

        await submitValidApplication({ zipCode: "SW1A 1AA" });

        await waitFor(() => {
            expect(mockPost).toHaveBeenCalledWith(
                "/api/apply",
                expect.objectContaining({ zipCode: null, yearJoined: 2010, yearSeparated: 2015 })
            );
        });
    });

    it("shows the failure message without emoji rain when the request fails", async () => {
        mockPost.mockRejectedValue(new Error("network down"));
        render(<ApplyForm />);

        await submitValidApplication();

        expect(await screen.findByText(FAILURE_MESSAGE)).toBeInTheDocument();
        expect(screen.queryByTestId("emoji-rain")).not.toBeInTheDocument();
        expect(screen.queryByText(SUCCESS_MESSAGE)).not.toBeInTheDocument();
    });

    it("shows a pending submit state until the request resolves", async () => {
        let resolvePost = (_value: unknown) => {};
        mockPost.mockReturnValue(
            new Promise((resolve) => {
                resolvePost = resolve;
            }) as never
        );
        render(<ApplyForm />);

        await submitValidApplication();

        expect(await screen.findByRole("button", { name: "Submitting..." })).toBeDisabled();
        expect(screen.queryByText(SUCCESS_MESSAGE)).not.toBeInTheDocument();

        await act(async () => {
            resolvePost({ data: {} });
        });

        expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Submitting..." })).not.toBeInTheDocument();
    });
});
