import { trackApplyEvent } from "@lib/apply-analytics";
import { useEffect, useState } from "react";
import styles from "./apply.module.css";

type GhProfile = {
    login: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
};

type Status =
    | { kind: "idle" }
    | { kind: "loading" }
    | { kind: "found"; profile: GhProfile }
    | { kind: "not_found" }
    | { kind: "error" };

const cache = new Map<string, GhProfile | "not_found">();

const extractHandle = (input: string): string => {
    return input
        .trim()
        .replace(/^https?:\/\//, "")
        .replace(/^github\.com\//, "")
        .replace(/^@/, "")
        .replace(/\/.*$/, "")
        .trim();
};

type GithubPreviewProps = {
    handle: string;
};

const GithubPreview = ({ handle }: GithubPreviewProps) => {
    const [status, setStatus] = useState<Status>({ kind: "idle" });

    useEffect(() => {
        const clean = extractHandle(handle);
        if (!clean || clean.length < 2) {
            setStatus({ kind: "idle" });
            return;
        }

        const cached = cache.get(clean);
        if (cached === "not_found") {
            setStatus({ kind: "not_found" });
            return;
        }
        if (cached) {
            setStatus({ kind: "found", profile: cached });
            return;
        }

        setStatus({ kind: "loading" });
        const controller = new AbortController();
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://api.github.com/users/${encodeURIComponent(clean)}`,
                    {
                        signal: controller.signal,
                        headers: { Accept: "application/vnd.github+json" },
                    }
                );
                if (res.status === 404) {
                    cache.set(clean, "not_found");
                    setStatus({ kind: "not_found" });
                    trackApplyEvent({ action: "github_lookup", status: "not_found" });
                    return;
                }
                if (!res.ok) {
                    setStatus({ kind: "error" });
                    trackApplyEvent({ action: "github_lookup", status: "error" });
                    return;
                }
                const profile = (await res.json()) as GhProfile;
                cache.set(clean, profile);
                setStatus({ kind: "found", profile });
                trackApplyEvent({ action: "github_lookup", status: "found" });
            } catch (err) {
                if ((err as Error).name === "AbortError") return;
                setStatus({ kind: "error" });
            }
        }, 500);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [handle]);

    if (status.kind === "idle") return null;

    if (status.kind === "loading") {
        return (
            <div className={styles.ghPreview}>
                <div className={styles.ghAvatar} aria-hidden="true">
                    ···
                </div>
                <div className={styles.ghInfo}>
                    <div className={styles.ghHandle}>Looking up profile…</div>
                    <div className={styles.ghStats}>checking github.com</div>
                </div>
            </div>
        );
    }

    if (status.kind === "found") {
        const { profile } = status;
        return (
            <div className={styles.ghPreview}>
                <div className={styles.ghAvatar} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={profile.avatar_url}
                        alt=""
                        className={styles.ghAvatarImg}
                        loading="lazy"
                    />
                </div>
                <div className={styles.ghInfo}>
                    <div className={styles.ghHandle}>@{profile.login}</div>
                    <div className={styles.ghStats}>
                        <span>
                            <span className={styles.ghStatNum}>{profile.public_repos}</span> public
                            repos
                        </span>
                        <span>
                            <span className={styles.ghStatNum}>{profile.followers}</span> followers
                        </span>
                    </div>
                </div>
                <div className={styles.ghStatus}>✓ FOUND</div>
            </div>
        );
    }

    if (status.kind === "not_found") {
        return (
            <div className={styles.ghPreview}>
                <div className={styles.ghAvatar} aria-hidden="true">
                    ??
                </div>
                <div className={styles.ghInfo}>
                    <div className={styles.ghHandle}>No public profile at that handle</div>
                    <div className={styles.ghStats}>double-check the spelling</div>
                </div>
                <div className={`${styles.ghStatus} ${styles.ghStatusMiss}`}>NOT FOUND</div>
            </div>
        );
    }

    return (
        <div className={styles.ghPreview}>
            <div className={styles.ghAvatar} aria-hidden="true">
                !
            </div>
            <div className={styles.ghInfo}>
                <div className={styles.ghHandle}>Couldn&rsquo;t reach GitHub</div>
                <div className={styles.ghStats}>we&rsquo;ll still review your application</div>
            </div>
        </div>
    );
};

export default GithubPreview;
