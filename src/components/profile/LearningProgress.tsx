import { motion } from "framer-motion";
import type { LearningStatsData } from "@/types/profile";

interface LearningProgressProps {
    data: LearningStatsData | null;
    isLoading: boolean;
    error: string | null;
}

function formatMinutes(mins: number): string {
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    const remaining = mins % 60;
    return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
}

function relativeDate(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
}

const LearningProgress = ({ data, isLoading, error }: LearningProgressProps) => {
    if (isLoading) {
        return (
            <div className="tw-space-y-6">
                {[1, 2].map((i) => (
                    <div
                        key={i}
                        className="tw-h-32 tw-rounded-lg tw-bg-navy/5 tw-animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="tw-rounded-lg tw-border tw-border-red/20 tw-bg-red/5 tw-p-6 tw-text-center">
                <i className="fas fa-exclamation-triangle tw-text-red tw-text-2xl tw-mb-2" />
                <p className="tw-font-mono tw-text-sm tw-text-red/80">{error}</p>
            </div>
        );
    }

    if (!data || (data.enrollments.length === 0 && data.certificates.length === 0)) {
        return (
            <div className="tw-rounded-lg tw-border tw-border-dashed tw-border-navy/20 tw-p-12 tw-text-center">
                <i className="fas fa-graduation-cap tw-text-4xl tw-text-navy/20 tw-mb-3" />
                <p className="tw-font-mono tw-text-sm tw-text-gray-300">
                    No training records found. Enroll in a course to begin.
                </p>
            </div>
        );
    }

    return (
        <div className="tw-space-y-8">
            {/* Summary stats */}
            <div className="tw-grid tw-grid-cols-2 tw-gap-4 md:tw-grid-cols-3">
                <StatCard
                    label="Lessons Completed"
                    value={data.completedLessons.toString()}
                    icon="fas fa-check-double"
                />
                <StatCard
                    label="Time Invested"
                    value={formatMinutes(data.totalTimeSpent)}
                    icon="fas fa-clock"
                />
                <StatCard
                    label="Certificates"
                    value={data.certificates.length.toString()}
                    icon="fas fa-certificate"
                />
            </div>

            {/* Enrollments */}
            {data.enrollments.length > 0 && (
                <section>
                    <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                        Active Enrollments
                    </h3>
                    <div className="tw-space-y-4">
                        {data.enrollments.map((enrollment, i) => (
                            <motion.div
                                key={enrollment.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-5 tw-shadow-sm"
                            >
                                <div className="tw-flex tw-items-center tw-justify-between tw-mb-3">
                                    <h4 className="tw-font-mono tw-text-sm tw-font-bold tw-text-navy">
                                        {enrollment.courseTitle}
                                    </h4>
                                    <span
                                        className={`tw-rounded-full tw-px-2.5 tw-py-0.5 tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-wider ${
                                            enrollment.status === "COMPLETED"
                                                ? "tw-bg-gold/10 tw-text-gold-deep"
                                                : enrollment.status === "ACTIVE"
                                                  ? "tw-bg-navy/5 tw-text-navy"
                                                  : "tw-bg-gray-50 tw-text-gray-300"
                                        }`}
                                    >
                                        {enrollment.status}
                                    </span>
                                </div>
                                <div className="tw-h-2 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-navy/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(enrollment.progress, 100)}%` }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                        className="tw-h-full tw-rounded-full tw-bg-gradient-to-r tw-from-navy tw-to-gold"
                                    />
                                </div>
                                <div className="tw-mt-2 tw-flex tw-justify-between tw-font-mono tw-text-[10px] tw-text-gray-300">
                                    <span>{Math.round(enrollment.progress)}% complete</span>
                                    <span>Last active: {relativeDate(enrollment.lastActivity)}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certificates */}
            {data.certificates.length > 0 && (
                <section>
                    <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                        Certificates Earned
                    </h3>
                    <div className="tw-grid tw-gap-4 md:tw-grid-cols-2">
                        {data.certificates.map((cert) => (
                            <div
                                key={cert.id}
                                className="tw-flex tw-items-center tw-gap-4 tw-rounded-lg tw-border tw-border-gold/20 tw-bg-gradient-to-r tw-from-gold/5 tw-to-transparent tw-p-4"
                            >
                                <div className="tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-bg-gold/10">
                                    <i className="fas fa-certificate tw-text-gold" />
                                </div>
                                <div>
                                    <div className="tw-font-mono tw-text-sm tw-font-bold tw-text-navy">
                                        {cert.courseTitle}
                                    </div>
                                    <div className="tw-font-mono tw-text-[10px] tw-text-gray-300">
                                        {cert.certificateNumber && `#${cert.certificateNumber} • `}
                                        Issued {relativeDate(cert.issuedAt)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Recent activity */}
            {data.recentActivity.length > 0 && (
                <section>
                    <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                        Recent Training Activity
                    </h3>
                    <div className="tw-space-y-2">
                        {data.recentActivity.map((activity, i) => (
                            <div
                                key={i}
                                className="tw-flex tw-items-center tw-gap-3 tw-rounded tw-py-2 tw-px-3 hover:tw-bg-navy/3"
                            >
                                <div className="tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-gold tw-flex-shrink-0" />
                                <div className="tw-flex-1 tw-min-w-0">
                                    <span className="tw-font-mono tw-text-xs tw-text-ink tw-truncate tw-block">
                                        {activity.lessonTitle}
                                    </span>
                                    <span className="tw-font-mono tw-text-[10px] tw-text-gray-300">
                                        {activity.courseTitle} &gt; {activity.moduleTitle}
                                    </span>
                                </div>
                                <span className="tw-font-mono tw-text-[10px] tw-text-gray-300 tw-flex-shrink-0">
                                    {activity.completedAt ? relativeDate(activity.completedAt) : "In progress"}
                                    {activity.timeSpent > 0 && ` • ${formatMinutes(activity.timeSpent)}`}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
    return (
        <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-5 tw-text-center tw-shadow-sm">
            <i className={`${icon} tw-text-gold/60 tw-mb-1`} />
            <div className="tw-font-mono tw-text-2xl tw-font-bold tw-text-navy">{value}</div>
            <div className="tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-widest tw-text-ink/60">
                {label}
            </div>
        </div>
    );
}

export default LearningProgress;
