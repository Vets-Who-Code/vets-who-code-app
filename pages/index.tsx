import React from 'react';
import EngagementModal from '../components/EngagementModal'; // Adjust path if necessary

const HomePage: React.FC = () => {
  // Props for the EngagementModal
  const modalProps = {
    headline: "You're Here for a Reason.",
    body: "Join thousands supporting veterans in software engineering roles — or help fund the journey.",
    cta1: {
      label: "Donate Now",
      link: "/support",
    },
    cta2: {
      label: "Join the Mission",
      link: "/signup",
    },
  };

  // Dummy onClose function for the modal
  const handleModalClose = () => {
    console.log("Modal closed by user.");
    // In a real app, you might update state or perform other actions here
  };

  return (
    <div style={{ height: '200vh', padding: '20px' }}> {/* Added style for scrollability to test modal appearance */}
      <h1>Welcome to Vets Who Code</h1>
      <p>This is a placeholder homepage.</p>
      <p>Scroll down to see more content...</p>
      {/* EngagementModal will be rendered here */}
      <EngagementModal
        headline={modalProps.headline}
        body={modalProps.body}
        cta1={modalProps.cta1}
        cta2={modalProps.cta2}
        onClose={handleModalClose} // Added onClose prop
      />
    </div>
  );
};

export default HomePage;
