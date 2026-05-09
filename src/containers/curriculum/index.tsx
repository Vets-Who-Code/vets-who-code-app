import { PHASES, type PhaseId } from "@data/curriculum";
import { useCallback, useEffect, useState } from "react";
import CurriculumCapstone from "./capstone";
import CurriculumCta from "./cta";
import CurriculumHero from "./hero";
import PhaseNav from "./phase-nav";
import PhaseSection from "./phase-section";
import CurriculumPrinciples from "./principles";
import CurriculumStackInventory from "./stack-inventory";

// Sticky header (80px) + phase-nav row (~60px) need clearance when jumping.
const SCROLL_OFFSET = 140;
// Active-pill detection trips when a section's offsetTop has scrolled past this many pixels.
const ACTIVE_THRESHOLD = 240;

const CurriculumContainer = () => {
    const [openMods, setOpenMods] = useState<Set<number>>(new Set());
    const [activePhase, setActivePhase] = useState<PhaseId>("foundations");

    const onToggleMod = useCallback((n: number) => {
        setOpenMods((prev) => {
            const next = new Set(prev);
            if (next.has(n)) {
                next.delete(n);
            } else {
                next.add(n);
            }
            return next;
        });
    }, []);

    const jumpTo = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY + ACTIVE_THRESHOLD;
            let active: PhaseId = PHASES[0].id;
            for (const phase of PHASES) {
                const el = document.getElementById(phase.id);
                if (el && el.offsetTop <= y) {
                    active = phase.id;
                }
            }
            setActivePhase(active);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <CurriculumHero onJump={jumpTo} />
            <CurriculumPrinciples />
            <PhaseNav activeId={activePhase} onJump={jumpTo} />
            {PHASES.map((phase, idx) => (
                <PhaseSection
                    key={phase.id}
                    phase={phase}
                    alt={idx % 2 === 1}
                    openMods={openMods}
                    onToggleMod={onToggleMod}
                />
            ))}
            <CurriculumCapstone />
            <CurriculumStackInventory />
            <CurriculumCta />
        </>
    );
};

export default CurriculumContainer;
