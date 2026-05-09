import { PHASES, type PhaseId } from "@data/curriculum";
import styles from "./curriculum.module.css";

type PhaseNavProps = {
    activeId: PhaseId;
    onJump: (id: PhaseId) => void;
};

const PhaseNav = ({ activeId, onJump }: PhaseNavProps) => {
    return (
        <nav className={styles.phaseNav} aria-label="Jump to phase">
            <div className="tw-container">
                <div className={styles.phaseNavInner}>
                    <span className={styles.pnLabel}>JUMP TO PHASE</span>
                    <div className={styles.pnPills}>
                        {PHASES.map((p) => {
                            const active = p.id === activeId;
                            return (
                                <button
                                    type="button"
                                    key={p.id}
                                    onClick={() => onJump(p.id)}
                                    className={`${styles.pnPill} ${active ? styles.pnPillOn : ""}`}
                                    aria-current={active ? "true" : undefined}
                                >
                                    <span className={styles.pnNum}>{p.num}</span>
                                    <span>{p.name}</span>
                                    <span className={styles.pnWeeks}>{p.weeks}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PhaseNav;
