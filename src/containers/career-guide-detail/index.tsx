import AnchorNav from "./anchor-nav";
import CtaBand from "./cta-band";
import Hero from "./hero";
import NonObviousMatches from "./non-obvious-matches";
import PathwaysGrid from "./pathways-grid";
import SkillBridgeSection from "./skill-bridge";
import StatusBar from "./status-bar";
import StrengthsGrid from "./strengths-grid";
import SystemsTable from "./systems-table";
import TechRolesSection from "./tech-roles";
import TrainingSection from "./training-section";
import type { CareerGuideDetail } from "./types";

interface Props {
    detail: CareerGuideDetail;
}

const ANCHORS = [
    { id: "sec-overview", label: "Overview" },
    { id: "sec-roles", label: "Tech roles" },
    { id: "sec-skills", label: "Skills" },
    { id: "sec-pathways", label: "Pathways" },
    { id: "sec-strengths", label: "Strengths" },
    { id: "sec-matches", label: "Matches" },
    { id: "sec-training", label: "Training" },
    { id: "sec-systems", label: "Systems" },
];

const CareerGuideDetailContainer = ({ detail }: Props) => (
    <>
        <StatusBar code={detail.code} />
        <AnchorNav items={ANCHORS} />
        <Hero detail={detail} />
        <div className="tw-bg-secondary tw-py-4">
            <div className="tw-container">
                <p className="tw-flex tw-items-start tw-gap-2.5 tw-rounded-md tw-border tw-border-cream/15 tw-bg-cream/5 tw-px-4 tw-py-3 tw-font-body tw-text-[12.5px] tw-leading-[1.55] tw-text-[#6C757D]">
                    <i className="fas fa-info-circle tw-mt-0.5 tw-text-accent" aria-hidden={true} />
                    <span>
                        This career guide was generated using AI analysis of military job code
                        data. Salary figures, certification coverage percentages, and career matches
                        are estimates — verify with official sources before making career decisions.
                    </span>
                </p>
            </div>
        </div>
        {detail.techPathway && (
            <TechRolesSection code={detail.code} roles={detail.techPathway.roles} />
        )}
        {detail.techPathway && (
            <SkillBridgeSection
                code={detail.code}
                skillsYouHave={detail.techPathway.skillsYouHave}
                skillsToLearn={detail.techPathway.skillsToLearn}
            />
        )}
        <PathwaysGrid pathways={detail.pathways} />
        {detail.cognitiveProfile && (
            <StrengthsGrid code={detail.code} skills={detail.cognitiveProfile.cognitiveSkills} />
        )}
        {detail.cognitiveProfile && (
            <NonObviousMatches matches={detail.cognitiveProfile.nonObviousCareers} />
        )}
        <TrainingSection training={detail.training} certs={detail.certs} />
        <SystemsTable systems={detail.systems} />
        <CtaBand code={detail.code} />
    </>
);

export default CareerGuideDetailContainer;
