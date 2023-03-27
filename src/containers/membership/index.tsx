import clsx from "clsx";
import Table from "@ui/table";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import Heading from "./heading";

type TProps = {
    membershipLevels: Array<{
        title: string;
        path: string;
        membership: string[];
    }>;
};

const MembershipArea = ({ membershipLevels }: TProps) => {
    return (
        <div className="membership-area">
            <Table bordered striped>
                <thead>
                    <tr>
                        <th>
                            <span className="tw-sr-only">df</span>
                        </th>
                        <th>
                            <Heading
                                price={{ amount: 500, currency: "£" }}
                                title="Silver Membership"
                                description="You can view few of courses"
                            />
                        </th>
                        <th>
                            <Heading
                                price={{ amount: 1000, currency: "£" }}
                                title="Gold Membership"
                                description="You can view most of courses"
                            />
                        </th>
                        <th>
                            <Heading
                                price={{ amount: 1500, currency: "£" }}
                                title="Diamond Membership"
                                description="You can view all of courses"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="first:tw-text-left">
                            Number of courses
                        </td>
                        <td>3</td>
                        <td>6</td>
                        <td>21</td>
                    </tr>
                    {membershipLevels.map((item) => {
                        const isSilver = item.membership.includes("silver");
                        const isGold = item.membership.includes("gold");
                        const isDiamond = item.membership.includes("diamond");
                        return (
                            <tr key={item.path}>
                                <td className="first:tw-text-left">
                                    <Anchor path={item.path}>
                                        {item.title}
                                    </Anchor>
                                </td>
                                <td
                                    className={clsx(
                                        "tw-text-[16px] ",
                                        isSilver
                                            ? "tw-text-success-100"
                                            : "tw-text-danger-100"
                                    )}
                                >
                                    <i
                                        className={clsx(
                                            "fas fa-check",
                                            isSilver ? "fa-check" : "fa-times"
                                        )}
                                    />
                                </td>
                                <td
                                    className={clsx(
                                        "tw-text-[16px] ",
                                        isGold
                                            ? "tw-text-success-100"
                                            : "tw-text-danger-100"
                                    )}
                                >
                                    <i
                                        className={clsx(
                                            "fas fa-check",
                                            isGold ? "fa-check" : "fa-times"
                                        )}
                                    />
                                </td>
                                <td
                                    className={clsx(
                                        "tw-text-[16px] ",
                                        isDiamond
                                            ? "tw-text-success-100"
                                            : "tw-text-danger-100"
                                    )}
                                >
                                    <i
                                        className={clsx(
                                            "fas fa-check",
                                            isDiamond ? "fa-check" : "fa-times"
                                        )}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td className="tw-px-2.5 tw-pt-7.5 tw-pb-10">
                            <span className="tw-sr-only">df</span>
                        </td>
                        <td className="tw-px-2.5 tw-pt-7.5 tw-pb-10">
                            <Button path="/courses/grid-01">Get it now</Button>
                        </td>
                        <td className="tw-px-2.5 tw-pt-7.5 tw-pb-10">
                            <Button path="/courses/grid-01">Get it now</Button>
                        </td>
                        <td className="tw-px-2.5 tw-pt-7.5 tw-pb-10">
                            <Button path="/courses/grid-01">Get it now</Button>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
};

export default MembershipArea;
