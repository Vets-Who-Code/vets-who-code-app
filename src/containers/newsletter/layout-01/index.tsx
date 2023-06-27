import { motion } from "framer-motion";
import Section from "@ui/section";
import { useUI } from "@contexts/ui-context";
import SectionTitle from "@components/section-title";
import NewsletterForm from "@components/forms/newsletter-form";
import { SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = TSection & {
  data: {
    section_title?: SectionTitleType;
  };
};

const NewsletterArea: React.FC<TProps> = ({ data: { section_title }, space, bg }) => {
  const { trans1, trans2 } = useUI();

  const handleSubmit = (email: string) => {
    // Handle the submission logic here
    console.log(email);
  };

  return (
    <Section className="newsletter-area" space={space} bg={bg}>
      <motion.div
        className="tw-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.4 }}
        variants={scrollUpVariants}
      >
        {section_title && <SectionTitle {...section_title} />}
        <NewsletterForm className="tw-mx-auto tw-mt-[50px]" onSubmit={handleSubmit} />

        <motion.div
          className="tw-absolute tw-bottom-[50px] tw-left-[-3px] md:tw-left-0 tw-z-20"
          animate={{
            x: trans1().x,
            y: trans1().y,
          }}
        >
          <span className="tw-block -tw-indent-[99999px] tw-border-[6px] tw-border-primary-light tw-rounded-full tw-w-[45px] tw-h-[45px] md:tw-border-[7px] md:tw
