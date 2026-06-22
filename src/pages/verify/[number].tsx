import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type VerifiedCertificate = {
    certificateNumber: string;
    student: {
        name: string;
        email: string;
    };
    course: {
        title: string;
        description: string;
        difficulty: string;
        estimatedHours: number;
        category: string;
    };
    issuedAt: string;
};

type PageProps = {
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const VerifyCertificatePage: PageWithLayout = () => {
    const router = useRouter();
    const { number } = router.query;
    const [certificate, setCertificate] = useState<VerifiedCertificate | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!number || typeof number !== "string") return;

        const verifyCertificate = async () => {
            try {
                const response = await fetch(
                    `/api/certificates/verify?number=${encodeURIComponent(number)}`
                );
                const data = await response.json();

                if (response.ok && data.valid && data.certificate) {
                    setCertificate(data.certificate);
                }
            } catch {
                // Treated as invalid below
            } finally {
                setLoading(false);
            }
        };

        verifyCertificate();
    }, [number]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-300">Verifying certificate...</p>
                </div>
            </div>
        );
    }

    if (!certificate) {
        return (
            <>
                <SEO
                    title="Certificate Verification"
                    description="Verify the authenticity of a Vets Who Code certificate"
                />
                <Breadcrumb
                    pages={[{ path: "/", label: "home" }]}
                    currentPage="Verify Certificate"
                    showTitle={false}
                />
                <div className="tw-container tw-py-16">
                    <div className="tw-text-center">
                        <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-ink">
                            Certificate Not Valid
                        </h1>
                        <p className="tw-mb-8 tw-text-gray-300">
                            We could not verify a certificate with the number{" "}
                            <span className="tw-font-semibold">{number}</span>. Check the number
                            printed on the certificate and try again.
                        </p>
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary-dark"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <SEO
                title={`Verified Certificate - ${certificate.course.title}`}
                description={`Verified certificate of completion for ${certificate.student.name} - ${certificate.course.title}`}
            />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Verify Certificate"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                <div className="tw-mx-auto tw-max-w-2xl tw-rounded-lg tw-bg-white tw-p-12 tw-shadow-2xl">
                    <div className="tw-border-8 tw-border-double tw-border-primary tw-p-8">
                        <div className="tw-mb-8 tw-text-center">
                            <h1 className="tw-mb-2 tw-text-4xl tw-font-bold tw-text-ink">
                                Certificate Verified
                            </h1>
                            <div className="tw-mx-auto tw-my-4 tw-h-1 tw-w-32 tw-bg-primary" />
                            <p className="tw-text-xl tw-text-gray-300">Vets Who Code</p>
                        </div>

                        <div className="tw-mb-8 tw-text-center">
                            <p className="tw-mb-6 tw-text-lg tw-text-gray-200">
                                This certifies that
                            </p>
                            <h2 className="tw-mb-6 tw-text-3xl tw-font-bold tw-text-primary">
                                {certificate.student.name}
                            </h2>
                            <p className="tw-mb-6 tw-text-lg tw-text-gray-200">
                                successfully completed the course
                            </p>
                            <h3 className="tw-mb-6 tw-text-2xl tw-font-semibold tw-text-ink">
                                {certificate.course.title}
                            </h3>
                            <p className="tw-text-sm tw-text-gray-300">Date of Completion</p>
                            <p className="tw-font-semibold tw-text-ink">
                                {formatDate(certificate.issuedAt)}
                            </p>
                        </div>

                        <div className="tw-mt-8 tw-text-center">
                            <p className="tw-text-xs tw-text-gray-500">
                                Certificate Number: {certificate.certificateNumber}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="tw-mx-auto tw-mt-8 tw-max-w-2xl tw-rounded-lg tw-bg-navy-sky/20 tw-p-6">
                    <h3 className="tw-mb-2 tw-text-lg tw-font-semibold tw-text-navy-deep">
                        Certificate Verification
                    </h3>
                    <p className="tw-text-sm tw-text-navy-deep">
                        This certificate has been verified as authentic and was issued by Vets Who
                        Code.
                    </p>
                </div>
            </div>
        </>
    );
};

VerifyCertificatePage.Layout = Layout01;

export default VerifyCertificatePage;
