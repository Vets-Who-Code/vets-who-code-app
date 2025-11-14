import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Layout01 from "@layout/layout-01";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type Certificate = {
  id: string;
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

const CertificatePage: PageWithLayout = () => {
  const router = useRouter();
  const { certificateId } = router.query;
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!certificateId || typeof certificateId !== "string") return;

    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/certificates/${certificateId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load certificate");
        }

        setCertificate(data.certificate);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load certificate");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

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
          <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
            Certificate Not Found
          </h1>
          <p className="tw-mb-8 tw-text-gray-600">
            {error || "The certificate you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => router.push("/")}
            className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary-dark"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${certificate.student.name} - ${certificate.course.title} Certificate`,
        text: `Check out my certificate for completing ${certificate.course.title}!`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Certificate link copied to clipboard!");
    }
  };

  return (
    <>
      <SEO
        title={`Certificate - ${certificate.course.title}`}
        description={`Certificate of completion for ${certificate.student.name} - ${certificate.course.title}`}
      />
      <Breadcrumb
        pages={[{ path: "/", label: "home" }]}
        currentPage="Certificate"
        showTitle={false}
      />

      <div className="tw-container tw-py-16">
        {/* Action Buttons - Hidden on print */}
        <div className="tw-mb-8 tw-flex tw-justify-center tw-gap-4 print:tw-hidden">
          <button
            onClick={handlePrint}
            className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary-dark"
          >
            Print Certificate
          </button>
          <button
            onClick={handleShare}
            className="tw-rounded-md tw-border-2 tw-border-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-primary tw-transition-colors hover:tw-bg-primary hover:tw-text-white"
          >
            Share
          </button>
        </div>

        {/* Certificate */}
        <div className="tw-mx-auto tw-max-w-4xl tw-rounded-lg tw-bg-white tw-p-12 tw-shadow-2xl print:tw-shadow-none">
          {/* Certificate Border */}
          <div className="tw-border-8 tw-border-double tw-border-primary tw-p-8">
            {/* Header */}
            <div className="tw-mb-8 tw-text-center">
              <h1 className="tw-mb-2 tw-text-5xl tw-font-bold tw-text-gray-900">
                Certificate of Completion
              </h1>
              <div className="tw-mx-auto tw-my-4 tw-h-1 tw-w-32 tw-bg-primary"></div>
              <p className="tw-text-xl tw-text-gray-600">
                Vets Who Code
              </p>
            </div>

            {/* Body */}
            <div className="tw-mb-8 tw-text-center">
              <p className="tw-mb-6 tw-text-lg tw-text-gray-700">
                This is to certify that
              </p>
              <h2 className="tw-mb-6 tw-text-4xl tw-font-bold tw-text-primary">
                {certificate.student.name}
              </h2>
              <p className="tw-mb-6 tw-text-lg tw-text-gray-700">
                has successfully completed the course
              </p>
              <h3 className="tw-mb-6 tw-text-3xl tw-font-semibold tw-text-gray-900">
                {certificate.course.title}
              </h3>
            </div>

            {/* Course Details */}
            <div className="tw-mb-8 tw-rounded-lg tw-bg-gray-50 tw-p-6">
              <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3">
                <div className="tw-text-center">
                  <p className="tw-text-sm tw-font-semibold tw-text-gray-600">
                    Category
                  </p>
                  <p className="tw-text-lg tw-text-gray-900">
                    {certificate.course.category}
                  </p>
                </div>
                <div className="tw-text-center">
                  <p className="tw-text-sm tw-font-semibold tw-text-gray-600">
                    Difficulty
                  </p>
                  <p className="tw-text-lg tw-text-gray-900">
                    {certificate.course.difficulty}
                  </p>
                </div>
                <div className="tw-text-center">
                  <p className="tw-text-sm tw-font-semibold tw-text-gray-600">
                    Estimated Hours
                  </p>
                  <p className="tw-text-lg tw-text-gray-900">
                    {certificate.course.estimatedHours} hours
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
              <div className="tw-text-center">
                <div className="tw-mb-2 tw-h-px tw-w-48 tw-bg-gray-400"></div>
                <p className="tw-text-sm tw-text-gray-600">Date of Completion</p>
                <p className="tw-font-semibold tw-text-gray-900">
                  {formatDate(certificate.issuedAt)}
                </p>
              </div>
              <div className="tw-text-center">
                <div className="tw-mb-2 tw-h-px tw-w-48 tw-bg-gray-400"></div>
                <p className="tw-text-sm tw-text-gray-600">Authorized Signature</p>
                <p className="tw-font-semibold tw-text-gray-900">Vets Who Code</p>
              </div>
            </div>

            {/* Certificate Number */}
            <div className="tw-mt-8 tw-text-center">
              <p className="tw-text-xs tw-text-gray-500">
                Certificate Number: {certificate.certificateNumber}
              </p>
              <p className="tw-mt-1 tw-text-xs tw-text-gray-500">
                Verify this certificate at: {typeof window !== "undefined" && window.location.origin}/api/certificates/verify?number={certificate.certificateNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Verification Notice - Hidden on print */}
        <div className="tw-mx-auto tw-mt-8 tw-max-w-2xl tw-rounded-lg tw-bg-blue-50 tw-p-6 print:tw-hidden">
          <h3 className="tw-mb-2 tw-text-lg tw-font-semibold tw-text-blue-900">
            Certificate Verification
          </h3>
          <p className="tw-text-sm tw-text-blue-800">
            This certificate can be verified by anyone using the certificate number
            shown above. Employers and others can verify the authenticity of this
            certificate by visiting our verification page or using the API endpoint.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.5in;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:tw-hidden {
            display: none !important;
          }
          .print\\:tw-shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </>
  );
};

CertificatePage.Layout = Layout01;

export default CertificatePage;
