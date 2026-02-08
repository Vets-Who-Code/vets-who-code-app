import React from "react";

interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    enrolled: string;
    progress: number;
}

interface VerticalStats {
    name: string;
    enrolled: number;
    avgProgress: number;
}

// Simple progress bar component with proper TypeScript
const ProgressBar = ({ progress }: { progress: number }) => {
    const getWidthClass = (value: number) => {
        const rounded = Math.round(value / 5) * 5; // Round to nearest 5
        return `tw-w-[${Math.min(rounded, 100)}%]`;
    };

    return (
        <div className="tw-h-2 tw-w-full tw-rounded-full tw-bg-gray-50">
            <div className={`tw-h-2 tw-rounded-full tw-bg-primary ${getWidthClass(progress)}`} />
        </div>
    );
};

export const OverviewStats = () => {
    const stats = [
        { label: "Total Enrolled", value: "1,234", change: "+12%" },
        { label: "Active Learners", value: "892", change: "+8%" },
        { label: "Completed Courses", value: "456", change: "+15%" },
        { label: "Success Rate", value: "87%", change: "+3%" },
    ];

    return (
        <div className="tw-mb-8 tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.label} className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                    <h3 className="tw-text-lg tw-font-semibold tw-text-gray-400">{stat.label}</h3>
                    <p className="tw-mt-2 tw-text-3xl tw-font-bold tw-text-primary">{stat.value}</p>
                    <p className="tw-mt-2 tw-text-sm tw-text-gold">{stat.change} from last month</p>
                </div>
            ))}
        </div>
    );
};

export const VerticalProgress = () => {
    const verticals: VerticalStats[] = [
        { name: "Software Engineering", enrolled: 456, avgProgress: 65 },
        { name: "Data Engineering", enrolled: 234, avgProgress: 52 },
        { name: "AI Engineering", enrolled: 189, avgProgress: 48 },
    ];

    return (
        <div className="tw-mb-8 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
            <h3 className="tw-mb-4 tw-text-xl tw-font-semibold tw-text-gray-400">
                Course Verticals Progress
            </h3>
            <div className="tw-space-y-4">
                {verticals.map((vertical) => (
                    <div
                        key={vertical.name}
                        className="tw-border-b tw-border-gray-200 tw-pb-4 last:tw-border-b-0"
                    >
                        <div className="tw-mb-2 tw-flex tw-items-center tw-justify-between">
                            <span className="tw-font-medium tw-text-gray-400">{vertical.name}</span>
                            <span className="tw-text-sm tw-text-gray-300">
                                {vertical.enrolled} enrolled · {vertical.avgProgress}% avg progress
                            </span>
                        </div>
                        <ProgressBar progress={vertical.avgProgress} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const AnalyticsCharts = () => {
    return (
        <div className="tw-mb-8 tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-2">
            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                <h3 className="tw-mb-4 tw-text-xl tw-font-semibold tw-text-gray-400">
                    Enrollment Trends
                </h3>
                <div className="tw-flex tw-h-64 tw-items-center tw-justify-center tw-rounded tw-bg-gray-50">
                    <p className="tw-text-gray-500">
                        Chart placeholder - Integration with chart library needed
                    </p>
                </div>
            </div>
            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                <h3 className="tw-mb-4 tw-text-xl tw-font-semibold tw-text-gray-400">
                    Completion Rates
                </h3>
                <div className="tw-flex tw-h-64 tw-items-center tw-justify-center tw-rounded tw-bg-gray-50">
                    <p className="tw-text-gray-500">
                        Chart placeholder - Integration with chart library needed
                    </p>
                </div>
            </div>
        </div>
    );
};

export const TabNavigation = ({
    activeTab,
    setActiveTab,
}: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}) => {
    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "users", label: "User Management" },
        { id: "courses", label: "Course Management" },
        { id: "analytics", label: "Analytics" },
        { id: "reports", label: "Reports" },
    ];

    return (
        <div className="tw-mb-8 tw-border-b tw-border-gray-200">
            <nav className="tw-flex tw-space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`tw-border-b-2 tw-px-1 tw-py-2 tw-text-sm tw-font-medium ${
                            activeTab === tab.id
                                ? "tw-border-primary tw-text-primary"
                                : "tw-border-transparent tw-text-gray-500 hover:tw-border-gray-300 hover:tw-text-gray-200"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export const UserProgress = ({ progress }: { progress: number }) => {
    const getProgressWidth = (value: number) => {
        const rounded = Math.round(value / 10) * 10;
        const widthMap: Record<number, string> = {
            0: "tw-w-0",
            10: "tw-w-[10%]",
            20: "tw-w-[20%]",
            30: "tw-w-[30%]",
            40: "tw-w-[40%]",
            50: "tw-w-1/2",
            60: "tw-w-[60%]",
            70: "tw-w-[70%]",
            80: "tw-w-[80%]",
            90: "tw-w-[90%]",
            100: "tw-w-full",
        };
        return widthMap[Math.min(rounded, 100)] || "tw-w-0";
    };

    return (
        <div className="tw-w-full tw-rounded-full tw-bg-gray-50">
            <div className={`tw-h-2 tw-rounded-full tw-bg-primary ${getProgressWidth(progress)}`} />
            <span className="tw-mt-1 tw-block tw-text-xs tw-text-gray-300">{progress}%</span>
        </div>
    );
};

export const UserManagement = () => {
    const users: User[] = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            status: "Active",
            enrolled: "Software Engineering",
            progress: 75,
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            status: "Active",
            enrolled: "Data Engineering",
            progress: 60,
        },
        {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            status: "Inactive",
            enrolled: "AI Engineering",
            progress: 30,
        },
    ];

    return (
        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
                <h3 className="tw-text-xl tw-font-semibold tw-text-gray-400">User Management</h3>
                <button
                    type="button"
                    className="tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-white hover:tw-bg-primary/90"
                >
                    Add User
                </button>
            </div>

            <div className="tw-overflow-x-auto">
                <table className="tw-min-w-full tw-divide-y tw-divide-gray-200">
                    <thead className="tw-bg-gray-50">
                        <tr>
                            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                User
                            </th>
                            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                Status
                            </th>
                            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                Enrolled In
                            </th>
                            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                Progress
                            </th>
                            <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-uppercase tw-tracking-wider tw-text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="tw-divide-y tw-divide-gray-200 tw-bg-white">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="tw-whitespace-nowrap tw-px-6 tw-py-4">
                                    <div>
                                        <div className="tw-text-sm tw-font-medium tw-text-ink">
                                            {user.name}
                                        </div>
                                        <div className="tw-text-sm tw-text-gray-500">
                                            {user.email}
                                        </div>
                                    </div>
                                </td>
                                <td className="tw-whitespace-nowrap tw-px-6 tw-py-4">
                                    <span
                                        className={`tw-inline-flex tw-rounded-full tw-px-2 tw-text-xs tw-font-semibold ${
                                            user.status === "Active"
                                                ? "tw-bg-gold-light/30 tw-text-gold-deep"
                                                : "tw-bg-red-100 tw-text-red-800"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="tw-whitespace-nowrap tw-px-6 tw-py-4 tw-text-sm tw-text-ink">
                                    {user.enrolled}
                                </td>
                                <td className="tw-whitespace-nowrap tw-px-6 tw-py-4">
                                    <UserProgress progress={user.progress} />
                                </td>
                                <td className="tw-whitespace-nowrap tw-px-6 tw-py-4 tw-text-sm tw-font-medium">
                                    <button
                                        type="button"
                                        className="tw-mr-4 tw-text-primary hover:tw-text-primary/80"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="tw-text-red-600 hover:tw-text-red-900"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
