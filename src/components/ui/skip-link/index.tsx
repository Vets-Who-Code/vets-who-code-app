// Visually hidden until it receives keyboard focus, then pinned above the header
// (the sticky top bar is tw-z-[60]). Navy on gold follows the Donate button spec.
const SkipLink = () => (
    <a
        href="#main-content"
        className="tw-sr-only focus:tw-not-sr-only focus:tw-fixed focus:tw-left-4 focus:tw-top-4 focus:tw-z-[70] focus:tw-bg-gold focus:tw-px-4 focus:tw-py-2 focus:tw-font-heading focus:tw-text-xs focus:tw-font-bold focus:tw-uppercase focus:tw-tracking-wider focus:tw-text-navy"
    >
        Skip to main content
    </a>
);

export default SkipLink;
