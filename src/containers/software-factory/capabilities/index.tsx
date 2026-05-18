import ServiceMark from "@components/software-factory/service-mark";
import { CAPABILITIES } from "@data/software-factory";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import styles from "./capabilities.module.css";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const Eyebrow = ({ children }: { children: string }) => (
    <div
        className="tw-flex tw-items-center tw-gap-3"
        style={{
            ...monoLabel,
            fontSize: "12px",
            color: "#FFFFFF",
        }}
    >
        <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red" />
        <span>{children}</span>
    </div>
);

const CapabilitiesSection = () => {
    return (
        <section className="dark-section tw-bg-navy tw-py-[60px] md:tw-py-[100px]">
            <div className="tw-container">
                <motion.div
                    className="tw-mb-12 tw-flex tw-flex-wrap tw-items-end tw-justify-between tw-gap-6"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                >
                    <div>
                        <Eyebrow>SECTION 02 / CAPABILITIES</Eyebrow>
                        <h2
                            className="tw-mt-4 tw-mb-0 tw-uppercase tw-text-white"
                            style={{
                                fontFamily: "var(--font-headline)",
                                fontWeight: 800,
                                fontSize: "clamp(32px, 4vw, 56px)",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.1,
                            }}
                        >
                            What we deploy.
                        </h2>
                    </div>
                    <div
                        style={{
                            ...monoLabel,
                            fontSize: "11px",
                            color: "rgba(185, 214, 242, 0.7)",
                        }}
                    >
                        8 capability areas · led by staff engineers
                    </div>
                </motion.div>

                <motion.div
                    className={styles.capGrid}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {CAPABILITIES.map((c, i) => (
                        <div key={c.title} className={styles.capCard}>
                            <ServiceMark shape={c.shape} tone={i % 2 === 0 ? "red" : "gold"} />
                            <div className={styles.capNum}>0{i + 1}</div>
                            <h3 className={styles.capTitle}>{c.title}</h3>
                            <p className={styles.capBody}>{c.body}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CapabilitiesSection;
