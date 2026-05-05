import {
    type ApplyFormData,
    BRANCHES,
    GOALS,
    HOURS,
    JOURNEY,
    PREWORK,
    type RadioCardOption,
    TECH_INTERESTS,
    TIMEZONES,
    WHY,
} from "@data/apply-form";
import type { ApplyErrors } from "@lib/apply-validation";
import type { ReactNode } from "react";
import styles from "./apply.module.css";
import GithubPreview from "./github-preview";

type StepProps = {
    data: ApplyFormData;
    set: <K extends keyof ApplyFormData>(key: K, value: ApplyFormData[K]) => void;
    errors: ApplyErrors;
    whyOpen: string | null;
    onWhy: (id: string) => void;
};

type FieldProps = {
    id: string;
    label: string;
    required?: boolean;
    why?: string;
    error?: string;
    helper?: string;
    helperWarm?: boolean;
    whyOpen?: boolean;
    onWhy?: (id: string) => void;
    children: ReactNode;
};

const Field = ({
    id,
    label,
    required,
    why,
    error,
    helper,
    helperWarm,
    whyOpen,
    onWhy,
    children,
}: FieldProps) => (
    <div className={`${styles.field} ${error ? styles.fieldError : ""}`}>
        <div className={styles.fieldHead}>
            <label htmlFor={id} className={styles.fieldLabel}>
                {label}
                {required && (
                    <span className={styles.required} aria-hidden="true">
                        *
                    </span>
                )}
            </label>
            {why && onWhy && (
                <button
                    type="button"
                    className={styles.why}
                    onClick={(e) => {
                        e.stopPropagation();
                        onWhy(id);
                    }}
                    aria-expanded={!!whyOpen}
                >
                    Why we ask
                </button>
            )}
        </div>
        {children}
        {helper && !error && (
            <p className={`${styles.helper} ${helperWarm ? styles.helperWarm : ""}`}>{helper}</p>
        )}
        {error && (
            <p className={styles.err} role="alert">
                {error}
            </p>
        )}
        {whyOpen && why && (
            <div className={styles.whyPop} role="tooltip">
                {why}
            </div>
        )}
    </div>
);

type RadioCardsProps = {
    value?: string;
    onChange: (id: string) => void;
    options: RadioCardOption[];
    cols?: 2 | 3;
    name: string;
};

const RadioCards = ({ value, onChange, options, cols = 2, name }: RadioCardsProps) => (
    <div
        className={`${styles.radioCards} ${cols === 3 ? styles.radioCardsCols3 : ""}`}
        role="radiogroup"
        aria-label={name}
    >
        {options.map((o) => {
            const selected = value === o.id;
            return (
                <button
                    type="button"
                    key={o.id}
                    className={`${styles.radioCard} ${selected ? styles.radioCardOn : ""}`}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onChange(o.id)}
                >
                    <span className={styles.radioInd} aria-hidden="true" />
                    <span>
                        <span className={styles.rcTitle}>{o.t}</span>
                        <span className={styles.rcSub}>{o.s}</span>
                    </span>
                </button>
            );
        })}
    </div>
);

type ChipsProps = {
    values: string[];
    onToggle: (value: string) => void;
    options: string[];
    label: string;
};

const ChipsMulti = ({ values, onToggle, options, label }: ChipsProps) => (
    <div className={styles.chips} role="group" aria-label={label}>
        {options.map((o) => {
            const on = values.includes(o);
            return (
                <button
                    type="button"
                    key={o}
                    className={`${styles.chip} ${on ? styles.chipOn : ""}`}
                    aria-pressed={on}
                    onClick={() => onToggle(o)}
                >
                    {o}
                </button>
            );
        })}
    </div>
);

export const Step1 = ({ data, set, errors, whyOpen, onWhy }: StepProps) => (
    <div className={styles.formStack}>
        <div className={styles.formRow}>
            <Field id="firstName" label="First name" required={true} error={errors.firstName}>
                <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    className={styles.input}
                    value={data.firstName ?? ""}
                    onChange={(e) => set("firstName", e.target.value)}
                    placeholder="Maria"
                />
            </Field>
            <Field id="lastName" label="Last name" required={true} error={errors.lastName}>
                <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    className={styles.input}
                    value={data.lastName ?? ""}
                    onChange={(e) => set("lastName", e.target.value)}
                    placeholder="Rodriguez"
                />
            </Field>
        </div>
        <Field
            id="email"
            label="Email"
            required={true}
            why={WHY.email}
            whyOpen={whyOpen === "email"}
            onWhy={onWhy}
            error={errors.email}
            helper="We'll use this for your interview invite. No marketing lists."
            helperWarm={true}
        >
            <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className={styles.input}
                value={data.email ?? ""}
                onChange={(e) => set("email", e.target.value)}
                placeholder="maria@example.com"
            />
        </Field>
        <Field
            id="phone"
            label="Phone (optional)"
            helper="Used only if your application moves to interview and email bounces."
        >
            <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={styles.input}
                value={data.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="(555) 123-4567"
            />
        </Field>
    </div>
);

export const Step2 = ({ data, set, errors }: StepProps) => (
    <div className={styles.formStack}>
        <div className={styles.formRow}>
            <Field id="city" label="City" required={true} error={errors.city}>
                <input
                    id="city"
                    type="text"
                    autoComplete="address-level2"
                    className={styles.input}
                    value={data.city ?? ""}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="San Antonio"
                />
            </Field>
            <Field id="state" label="State / Province" required={true} error={errors.state}>
                <input
                    id="state"
                    type="text"
                    autoComplete="address-level1"
                    className={styles.input}
                    value={data.state ?? ""}
                    onChange={(e) => set("state", e.target.value)}
                    placeholder="Texas"
                />
            </Field>
        </div>
        <div className={styles.formRow}>
            <Field id="zip" label="Zip / Postal" required={true} error={errors.zip}>
                <input
                    id="zip"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className={styles.input}
                    value={data.zip ?? ""}
                    onChange={(e) => set("zip", e.target.value)}
                    placeholder="78201"
                />
            </Field>
            <Field id="country" label="Country" required={true} error={errors.country}>
                <input
                    id="country"
                    type="text"
                    autoComplete="country-name"
                    className={styles.input}
                    value={data.country ?? "United States"}
                    onChange={(e) => set("country", e.target.value)}
                    placeholder="United States"
                />
            </Field>
        </div>
        <Field
            id="timezone"
            label="Timezone (optional)"
            helper="Pick the timezone you'll attend stand-ups in. Cohort hours are 0900–1100 ET."
        >
            <select
                id="timezone"
                className={styles.select}
                value={data.timezone ?? ""}
                onChange={(e) => set("timezone", e.target.value)}
            >
                <option value="">Select…</option>
                {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                        {tz}
                    </option>
                ))}
            </select>
        </Field>
    </div>
);

export const Step3 = ({ data, set, errors, whyOpen, onWhy }: StepProps) => (
    <div className={styles.formStack}>
        <Field
            id="branch"
            label="Branch of service"
            required={true}
            why={WHY.branch}
            whyOpen={whyOpen === "branch"}
            onWhy={onWhy}
            error={errors.branch}
        >
            <div className={styles.chips} role="radiogroup" aria-label="Branch of service">
                {BRANCHES.map((b) => {
                    const on = data.branch === b.id;
                    return (
                        <button
                            type="button"
                            key={b.id}
                            className={`${styles.chip} ${on ? styles.chipOn : ""}`}
                            role="radio"
                            aria-checked={on}
                            onClick={() => set("branch", b.id)}
                        >
                            {b.label}
                        </button>
                    );
                })}
            </div>
        </Field>
        <div className={styles.formRow}>
            <Field id="yearJoined" label="Year joined" required={true} error={errors.yearJoined}>
                <input
                    id="yearJoined"
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    className={styles.input}
                    value={data.yearJoined ?? ""}
                    onChange={(e) => set("yearJoined", e.target.value.replace(/\D/g, ""))}
                    placeholder="2010"
                />
            </Field>
            <Field
                id="yearSeparated"
                label="Year separated"
                helper="Leave blank if you're still serving."
            >
                <input
                    id="yearSeparated"
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    className={styles.input}
                    value={data.yearSeparated ?? ""}
                    onChange={(e) => set("yearSeparated", e.target.value.replace(/\D/g, ""))}
                    placeholder="2018"
                />
            </Field>
        </div>
        <Field
            id="mos"
            label="MOS / Rate / AFSC (optional)"
            helper="Just helps us find common ground. We've trained 11A's, 0311's, 3D0X2's — all of them."
        >
            <input
                id="mos"
                type="text"
                className={styles.input}
                value={data.mos ?? ""}
                onChange={(e) => set("mos", e.target.value)}
                placeholder="e.g. 25B · IT Specialist"
            />
        </Field>
    </div>
);

export const Step4 = ({ data, set, errors }: StepProps) => (
    <div className={styles.formStack}>
        <div>
            <button
                type="button"
                className={`${styles.checkRow} ${data.priorBootcamp ? styles.checkRowOn : ""}`}
                onClick={() => set("priorBootcamp", !data.priorBootcamp)}
                aria-pressed={!!data.priorBootcamp}
            >
                <span className={styles.checkBox} aria-hidden="true">
                    ✓
                </span>
                <span className={styles.checkLabel}>
                    I&rsquo;ve taken another coding bootcamp or tech program before.
                </span>
            </button>
            {data.priorBootcamp && (
                <div style={{ marginTop: 12 }}>
                    <Field id="priorList" label="Which programs?">
                        <textarea
                            id="priorList"
                            className={styles.textarea}
                            value={data.priorList ?? ""}
                            onChange={(e) => set("priorList", e.target.value)}
                            placeholder="e.g. Codecademy Pro · The Odin Project · Lambda School"
                        />
                    </Field>
                </div>
            )}
        </div>

        <div>
            <button
                type="button"
                className={`${styles.checkRow} ${data.concurrent ? styles.checkRowOn : ""}`}
                onClick={() => set("concurrent", !data.concurrent)}
                aria-pressed={!!data.concurrent}
            >
                <span className={styles.checkBox} aria-hidden="true">
                    ✓
                </span>
                <span className={styles.checkLabel}>
                    I&rsquo;ll be in another program at the same time as VWC.
                </span>
            </button>
            {data.concurrent && (
                <div style={{ marginTop: 12 }}>
                    <Field
                        id="concurrentList"
                        label="What are you running concurrently?"
                        helper="Cohort pace assumes 10–20 hrs/week. We need to know if there's competition for your time."
                    >
                        <textarea
                            id="concurrentList"
                            className={styles.textarea}
                            value={data.concurrentList ?? ""}
                            onChange={(e) => set("concurrentList", e.target.value)}
                            placeholder="e.g. CompTIA Security+ study · GI Bill program at Austin CC"
                        />
                    </Field>
                </div>
            )}
        </div>

        <Field
            id="hours"
            label="Hours per week you can commit"
            required={true}
            error={errors.hours}
        >
            <RadioCards
                name="Hours per week"
                value={data.hours}
                onChange={(v) => set("hours", v)}
                options={HOURS}
                cols={3}
            />
        </Field>
    </div>
);

export const Step5 = ({ data, set, errors, whyOpen, onWhy }: StepProps) => {
    return (
        <div className={styles.formStack}>
            <Field
                id="github"
                label="GitHub username or URL"
                required={true}
                why={WHY.github}
                whyOpen={whyOpen === "github"}
                onWhy={onWhy}
                error={errors.github}
                helper="We'll look at it. Not to gatekeep — to brag about you to your future cohort."
                helperWarm={true}
            >
                <input
                    id="github"
                    type="text"
                    autoComplete="username"
                    className={styles.input}
                    value={data.github ?? ""}
                    onChange={(e) => set("github", e.target.value)}
                    placeholder="github.com/your-handle  or  your-handle"
                />
                <GithubPreview handle={data.github ?? ""} />
            </Field>

            <Field
                id="linkedin"
                label="LinkedIn profile (optional)"
                helper="Optional but helpful — recruiters peek before interviews."
            >
                <input
                    id="linkedin"
                    type="text"
                    autoComplete="url"
                    className={styles.input}
                    value={data.linkedin ?? ""}
                    onChange={(e) => set("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/your-name"
                />
            </Field>

            <Field
                id="prework"
                label="Prework status"
                required={true}
                why={WHY.prework}
                whyOpen={whyOpen === "prework"}
                onWhy={onWhy}
                error={errors.prework}
            >
                <RadioCards
                    name="Prework status"
                    value={data.prework}
                    onChange={(v) => set("prework", v)}
                    options={PREWORK}
                    cols={3}
                />
                {data.prework === "not-started" && (
                    <div className={styles.nudge}>
                        <strong>That&rsquo;s fine.</strong>
                        No penalty for starting fresh. We&rsquo;ll email you the prework repo with
                        your interview invite — most applicants knock it out in a weekend. Submit
                        when ready.
                    </div>
                )}
                {(data.prework === "started" || data.prework === "done") && (
                    <div className={styles.formRow} style={{ marginTop: 16 }}>
                        <Field id="preworkLink" label="Prework live URL">
                            <input
                                id="preworkLink"
                                type="url"
                                inputMode="url"
                                className={styles.input}
                                value={data.preworkLink ?? ""}
                                onChange={(e) => set("preworkLink", e.target.value)}
                                placeholder="https://your-handle.github.io/prework"
                            />
                        </Field>
                        <Field id="preworkRepo" label="Prework repo URL">
                            <input
                                id="preworkRepo"
                                type="url"
                                inputMode="url"
                                className={styles.input}
                                value={data.preworkRepo ?? ""}
                                onChange={(e) => set("preworkRepo", e.target.value)}
                                placeholder="github.com/your-handle/prework"
                            />
                        </Field>
                    </div>
                )}
            </Field>
        </div>
    );
};

export const Step6 = ({ data, set, errors, whyOpen, onWhy }: StepProps) => {
    const onToggleInterest = (label: string) => {
        const cur = data.interests ?? [];
        set("interests", cur.includes(label) ? cur.filter((c) => c !== label) : [...cur, label]);
    };
    const why = data.why ?? "";
    return (
        <div className={styles.formStack}>
            <Field
                id="journey"
                label="Where are you in your journey?"
                required={true}
                error={errors.journey}
            >
                <RadioCards
                    name="Journey"
                    value={data.journey}
                    onChange={(v) => set("journey", v)}
                    options={JOURNEY}
                    cols={3}
                />
            </Field>

            <Field
                id="goal"
                label="Pick the one that's most true"
                required={true}
                why={WHY.goal}
                whyOpen={whyOpen === "goal"}
                onWhy={onWhy}
                error={errors.goal}
            >
                <RadioCards
                    name="Goal"
                    value={data.goal}
                    onChange={(v) => set("goal", v)}
                    options={GOALS}
                    cols={3}
                />
            </Field>

            <Field id="interests" label="What do you want to build? (pick any)">
                <ChipsMulti
                    label="Tech interests"
                    values={data.interests ?? []}
                    onToggle={onToggleInterest}
                    options={TECH_INTERESTS}
                />
            </Field>

            <Field
                id="why"
                label="In one sentence: what do you want from VWC?"
                required={true}
                error={errors.why}
                helper="The single field most predictive of cohort fit. Specific beats polished. Real beats rehearsed."
            >
                <textarea
                    id="why"
                    maxLength={280}
                    className={styles.textarea}
                    value={why}
                    onChange={(e) => set("why", e.target.value)}
                    placeholder="e.g. I want to land a frontend role at a company that ships product I'd actually use, by next spring."
                    style={{ minHeight: 90 }}
                />
                <div className={styles.charCount}>{why.length} / 280</div>
            </Field>
        </div>
    );
};
