import { STEPS } from "@data/apply-form";
import styles from "./apply.module.css";

type StepRailProps = {
    current: number;
    completed: number[];
    onJump: (step: number) => void;
};

const StepRail = ({ current, completed, onJump }: StepRailProps) => {
    const pct = (current / STEPS.length) * 100;

    return (
        <aside className={styles.rail} aria-label="Application steps">
            <div className={styles.railHead}>
                <span>Form A-26 · Intake</span>
                <span className={styles.railProgressNum}>
                    {current}/{STEPS.length}
                </span>
            </div>
            <div className={styles.railProgress}>
                <div
                    className={styles.railProgressFill}
                    style={{ width: `${pct}%` }}
                    aria-hidden="true"
                />
            </div>

            <ul className={styles.railSteps}>
                {STEPS.map((s) => {
                    const done = completed.includes(s.id);
                    const active = s.id === current;
                    const reachable = done || active;
                    const state = active ? "active" : done ? "done" : "pending";
                    return (
                        <li key={s.id}>
                            <button
                                type="button"
                                className={styles.railStep}
                                data-state={state}
                                disabled={!reachable}
                                onClick={() => reachable && onJump(s.id)}
                                aria-current={active ? "step" : undefined}
                            >
                                <span className={styles.railDot} aria-hidden="true">
                                    {done ? "✓" : s.num}
                                </span>
                                <span>
                                    <span className={styles.railStepNum}>Step {s.num}</span>
                                    <span className={styles.railStepLabel}>{s.short}</span>
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default StepRail;
