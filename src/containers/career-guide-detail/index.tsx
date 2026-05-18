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
