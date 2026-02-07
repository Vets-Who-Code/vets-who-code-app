import SectionTitle from "@components/section-title";
import TeamCard from "@components/team-card";
import { ISocial, ItemType, SectionTitleType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedTeamCard = motion(TeamCard);

type Team = Pick<ItemType, "id" | "name" | "designation" | "images" | "role"> & {
    socials?: ISocial[];
};

type TProps = {
    data: {
        section_title?: SectionTitleType;
        items?: Team[];
    };
    titleSize?: "default" | "large";
};

const TeamArea = ({ data: { section_title, items }, titleSize }: TProps) => {
    const admins = items?.filter((item) => item.role === "admin");
    const employees = items?.filter((item) => item.role === "employee");
    return (
        <section className="team-area tw-pt-15 md:tw-pt-20 lg:tw-pt-[100px]">
            <div className="tw-container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                <div className="tw-mb-7.5 tw-grid tw-grid-cols-1 tw-gap-7.5 sm:tw-grid-cols-2 lg:tw-mb-[50px] lg:tw-grid-cols-3 xl:tw-gap-10">
                    {admins?.map((admin) => (
                        <AnimatedTeamCard
                            key={admin.id}
                            name={admin.name}
                            designation={admin.designation}
                            image={admin.images?.[0]}
                            socials={admin.socials}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
                <div className="tw-grid tw-grid-cols-1 tw-gap-7.5 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
                    {employees?.map((employee) => (
                        <AnimatedTeamCard
                            key={employee.id}
                            name={employee.name}
                            designation={employee.designation}
                            image={{
                                ...employee.images?.[0],
                                width: 270,
                                height: 330,
                            }}
                            socials={employee.socials}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamArea;
