import { STACK_INVENTORY } from "@data/curriculum";
import styles from "./curriculum.module.css";

const CurriculumStackInventory = () => {
    return (
        <section
            id="stack"
            className={`dark-section tw-bg-navy ${styles.section}`}
            aria-labelledby="curriculum-stack-heading"
        >
            <div className="tw-container">
                <div className={styles.rowEnd}>
                    <div style={{ flex: "1 1 480px" }}>
                        <span className={styles.eyebrow}>THE HASHFLAG STACK</span>
                        <h2
                            id="curriculum-stack-heading"
                            className={styles.h2}
                            style={{ maxWidth: "16ch" }}
                        >
                            Every tool. One stack.
                        </h2>
                    </div>
                    <p className={styles.lead} style={{ maxWidth: "40ch", margin: 0 }}>
                        These are the tools you&rsquo;ll touch every week — the same ones used by
                        the engineering teams hiring our graduates.
                    </p>
                </div>

                <div className={styles.stackTable}>
                    {STACK_INVENTORY.map((group) => (
                        <div key={group.label} className={styles.stackRow}>
                            <span className={styles.stackLabel}>{group.label}</span>
                            <div className={styles.stackItems}>
                                {group.items.map((item) => (
                                    <span key={item} className={styles.stackTech}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CurriculumStackInventory;
