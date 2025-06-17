import React, { useState, useEffect, useRef } from 'react';

interface EngagementModalProps {
  headline: string;
  body: string;
  cta1: {
    label: string;
    link: string;
  };
  cta2: {
    label: string;
    link: string;
  };
  onClose: () => void;
}

const EngagementModal: React.FC<EngagementModalProps> = ({
  headline,
  body,
  cta1,
  cta2,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Refs for CTA links to include them in focus trapping
  const cta1Ref = useRef<HTMLAnchorElement>(null);
  const cta2Ref = useRef<HTMLAnchorElement>(null);


  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('engagementModalShown');
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('engagementModalShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  // Effect for ESC key dismissal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      // Set initial focus to the close button when modal opens
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]); // Re-run if isVisible changes, including handleClose in dependencies

  // Effect for focus trapping
  useEffect(() => {
    if (!isVisible || !modalRef.current) return;

    const focusableElements = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ); // Temporarily remove .filter(el => el.offsetParent !== null)

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    // Attach event listener to the modal itself, not the document
    const modalElement = modalRef.current;
    modalElement.addEventListener('keydown', handleTabKeyPress);

    return () => {
      modalElement?.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [isVisible]);


  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-50 tw-p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline" // Use id from h2
    >
      <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-2xl tw-max-w-md tw-w-full">
        <div className="tw-flex tw-justify-end tw-mb-2">
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className="tw-text-gray-600 hover:tw-text-gray-800"
            aria-label="Close modal"
          >
            <svg
              className="tw-w-6 tw-h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <h2 id="modal-headline" className="tw-text-2xl tw-font-semibold tw-mb-4">{headline}</h2>
        <p className="tw-text-gray-700 tw-mb-6">{body}</p>
        <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-justify-between">
          <a
            ref={cta1Ref} // Add ref for focus trapping
            href={cta1.link}
            className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-3 tw-px-6 tw-rounded tw-w-full sm:tw-w-auto tw-mb-3 sm:tw-mb-0 sm:tw-mr-2 tw-text-center"
          >
            {cta1.label}
          </a>
          <a
            ref={cta2Ref} // Add ref for focus trapping
            href={cta2.link}
            className="tw-bg-green-600 hover:tw-bg-green-700 tw-text-white tw-font-bold tw-py-3 tw-px-6 tw-rounded tw-w-full sm:tw-w-auto tw-text-center"
          >
            {cta2.label}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EngagementModal;
