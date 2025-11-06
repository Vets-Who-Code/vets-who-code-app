import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout01 from "@layout/layout-01";
import type { NextPage } from "next";
import SEO from "@components/seo/page-seo";

type Certificate = {
    id: string;
    certificateNumber: string;
    issuedAt: string;
    completedAt: string;
    verified: boolean;
    shareableUrl: string;
    user: {
        name: string;
        branch?: string;
        rank?: string;
    };
    course: {
        title: string;
        description: string;
        category: string;
        difficulty: string;
        duration: number;
    };
    enrollment: {
        enrolledAt: string;
        completedAt: string;
        progress: number;
    };
};

type PageWithLayout = NextPage & {
    Layout?: typeof Layout01;
};

const CertificatePage: PageWithLayout = () => {
    const router = useRouter();
    const { certificateId } = router.query;
    const [certificate, setCertificate] = useState<Certificate | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!certificateId) return;

        const fetchCertificate = async () => {
            try {
                const response = await fetch(`/api/certificates/${certificateId}`);
                const data = await response.json();

                if (response.ok) {
                    setCertificate(data.certificate);
                } else {
                    setError(data.error || "Certificate not found");
                }
            } catch (err) {
                setError("Failed to load certificate");
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [certificateId]);

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        if (certificate?.shareableUrl) {
            navigator.clipboard.writeText(certificate.shareableUrl);
            alert("Certificate URL copied to clipboard!");
        }
    };

    if (loading) {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading certificate...</p>
                </div>
            </div>
        );
    }

    if (error || !certificate) {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <i className="fas fa-exclamation-circle tw-mb-4 tw-text-6xl tw-text-red-500" />
                    <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                        Certificate Not Found
                    </h1>
                    <p className="tw-text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO title={`Certificate - ${certificate.course.title}`} />

            <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-50 tw-to-purple-50 tw-py-12">
                <div className="tw-container">
                    {/* Action Buttons - Hidden when printing */}
                    <div className="print:tw-hidden tw-mb-8 tw-flex tw-justify-center tw-space-x-4">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="tw-rounded-lg tw-bg-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary-dark"
                        >
                            <i className="fas fa-print tw-mr-2" />
                            Print Certificate
                        </button>
                        <button
                            type="button"
                            onClick={handleShare}
                            className="tw-rounded-lg tw-border-2 tw-border-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-primary tw-transition-colors hover:tw-bg-primary hover:tw-text-white"
                        >
                            <i className="fas fa-share-alt tw-mr-2" />
                            Share
                        </button>
                    </div>

                    {/* Certificate */}
                    <div className="tw-mx-auto tw-max-w-4xl tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-2xl">
                        {/* Certificate Border */}
                        <div className="tw-border-8 tw-border-double tw-border-primary tw-p-12">
                            {/* Header */}
                            <div className="tw-mb-8 tw-text-center">
                                <div className="tw-mb-4">
                                    <i className="fas fa-award tw-text-6xl tw-text-primary" />
                                </div>
                                <h1 className="tw-mb-2 tw-text-4xl tw-font-bold tw-text-gray-900">
                                    Certificate of Completion
                                </h1>
                                <p className="tw-text-xl tw-text-gray-600">Vets Who Code</p>
                            </div>

                            {/* Body */}
                            <div className="tw-mb-8 tw-text-center">
                                <p className="tw-mb-6 tw-text-lg tw-text-gray-600">
                                    This is to certify that
                                </p>

                                <h2 className="tw-mb-2 tw-text-5xl tw-font-bold tw-text-primary">
                                    {certificate.user.name}
                                </h2>

                                {certificate.user.branch && certificate.user.rank && (
                                    <p className="tw-mb-6 tw-text-lg tw-italic tw-text-gray-600">
                                        {certificate.user.rank}, {certificate.user.branch}
                                    </p>
                                )}

                                <p className="tw-mb-6 tw-text-lg tw-text-gray-600">
                                    has successfully completed
                                </p>

                                <h3 className="tw-mb-6 tw-text-3xl tw-font-bold tw-text-gray-900">
                                    {certificate.course.title}
                                </h3>

                                <div className="tw-mx-auto tw-mb-8 tw-max-w-2xl tw-rounded-lg tw-bg-gray-50 tw-p-6">
                                    <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-text-sm">
                                        <div>
                                            <p className="tw-font-semibold tw-text-gray-900">
                                                Category
                                            </p>
                                            <p className="tw-text-gray-600">
                                                {certificate.course.category}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="tw-font-semibold tw-text-gray-900">
                                                Difficulty
                                            </p>
                                            <p className="tw-text-gray-600">
                                                {certificate.course.difficulty}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="tw-font-semibold tw-text-gray-900">
                                                Duration
                                            </p>
                                            <p className="tw-text-gray-600">
                                                {certificate.course.duration} hours
                                            </p>
                                        </div>
                                        <div>
                                            <p className="tw-font-semibold tw-text-gray-900">
                                                Completed
                                            </p>
                                            <p className="tw-text-gray-600">
                                                {new Date(
                                                    certificate.completedAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="tw-text-sm tw-text-gray-500">
                                    Certificate Number: {certificate.certificateNumber}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="tw-mt-12 tw-flex tw-items-center tw-justify-between tw-border-t tw-pt-8">
                                <div className="tw-text-center">
                                    <div className="tw-mb-2 tw-h-0.5 tw-w-48 tw-bg-gray-300" />
                                    <p className="tw-font-semibold tw-text-gray-900">
                                        Jerome Hardaway
                                    </p>
                                    <p className="tw-text-sm tw-text-gray-600">
                                        Executive Director
                                    </p>
                                </div>

                                <div className="tw-text-center">
                                    {certificate.verified && (
                                        <div className="tw-inline-flex tw-items-center tw-rounded-full tw-bg-green-100 tw-px-4 tw-py-2">
                                            <i className="fas fa-check-circle tw-mr-2 tw-text-green-600" />
                                            <span className="tw-font-semibold tw-text-green-900">
                                                Verified
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="tw-text-center">
                                    <div className="tw-mb-2 tw-h-0.5 tw-w-48 tw-bg-gray-300" />
                                    <p className="tw-text-sm tw-text-gray-600">
                                        Issue Date:
                                    </p>
                                    <p className="tw-font-semibold tw-text-gray-900">
                                        {new Date(certificate.issuedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Verification Info - Hidden when printing */}
                    <div className="print:tw-hidden tw-mt-8 tw-text-center tw-text-sm tw-text-gray-600">
                        <p>
                            Verify this certificate at:{" "}
                            <a
                                href={certificate.shareableUrl}
                                className="tw-font-semibold tw-text-primary hover:tw-underline"
                            >
                                {certificate.shareableUrl}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

CertificatePage.Layout = Layout01;

export default CertificatePage;
