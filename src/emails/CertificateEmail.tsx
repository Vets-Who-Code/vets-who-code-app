import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface CertificateEmailProps {
  studentName: string;
  courseName: string;
  certificateUrl: string;
  certificateNumber: string;
  completionDate: Date;
}

export const CertificateEmail = ({
  studentName,
  courseName,
  certificateUrl,
  certificateNumber,
  completionDate,
}: CertificateEmailProps) => {
  const formattedDate = completionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Html>
      <Head />
      <Preview>
        Congratulations on completing {courseName}! Your certificate is ready.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Vets Who Code</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h2}>Congratulations, {studentName}!</Heading>

            <Text style={paragraph}>
              We are thrilled to inform you that you have successfully completed{' '}
              <strong>{courseName}</strong> on {formattedDate}.
            </Text>

            <Text style={paragraph}>
              Your dedication, hard work, and commitment to learning have paid off.
              This achievement is a testament to your skills and determination in
              mastering new technologies.
            </Text>

            {/* Certificate Badge/Icon */}
            <Section style={certificateBadge}>
              <Text style={badgeEmoji}>🎓</Text>
              <Text style={badgeText}>Certificate of Completion</Text>
            </Section>

            {/* Download Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={certificateUrl}>
                Download Your Certificate
              </Button>
            </Section>

            <Text style={certificateInfo}>
              <strong>Certificate Number:</strong> {certificateNumber}
            </Text>

            <Text style={paragraph}>
              You can verify your certificate at any time by visiting:{' '}
              <a
                href={`https://vetswhocode.io/verify/${certificateNumber}`}
                style={link}
              >
                vetswhocode.io/verify/{certificateNumber}
              </a>
            </Text>

            {/* Divider */}
            <hr style={divider} />

            {/* Next Steps */}
            <Heading style={h3}>What's Next?</Heading>

            <Text style={paragraph}>
              Now that you've completed this course, here are some ways to continue
              your journey:
            </Text>

            <ul style={list}>
              <li>
                <strong>Share your achievement:</strong> Add this certificate to
                your LinkedIn profile and share it with your network
              </li>
              <li>
                <strong>Explore more courses:</strong> Continue building your
                skills with our other courses
              </li>
              <li>
                <strong>Join our community:</strong> Connect with fellow veterans
                and mentors in our Slack community
              </li>
              <li>
                <strong>Give back:</strong> Consider mentoring other veterans who
                are just starting their coding journey
              </li>
            </ul>

            <Text style={paragraph}>
              Thank you for being part of the Vets Who Code family. We're proud of
              your accomplishment and excited to see what you build next!
            </Text>

            <Text style={signature}>
              <strong>Jerome Hardaway</strong>
              <br />
              Executive Director, Vets Who Code
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Vets Who Code. All rights reserved.
            </Text>
            <Text style={footerText}>
              <a href="https://vetswhocode.io" style={footerLink}>
                Website
              </a>
              {' | '}
              <a
                href="https://twitter.com/vetswhocode"
                style={footerLink}
              >
                Twitter
              </a>
              {' | '}
              <a href="https://github.com/Vets-Who-Code" style={footerLink}>
                GitHub
              </a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default CertificateEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const header = {
  padding: '32px 20px',
  backgroundColor: '#1C263F', // VWC Navy
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
};

const content = {
  padding: '0 48px',
};

const h2 = {
  color: '#1C263F', // VWC Navy
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
};

const h3 = {
  color: '#1C263F', // VWC Navy
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '24px 0 16px',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  margin: '16px 0',
};

const certificateBadge = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const badgeEmoji = {
  fontSize: '64px',
  margin: '0',
};

const badgeText = {
  color: '#C21C21', // VWC Red
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '8px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#C21C21', // VWC Red
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
};

const certificateInfo = {
  color: '#525f7f',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '16px 0',
};

const link = {
  color: '#C21C21', // VWC Red
  textDecoration: 'underline',
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const list = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  paddingLeft: '20px',
  margin: '16px 0',
};

const signature = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '32px 0',
};

const footer = {
  padding: '20px 48px',
  borderTop: '1px solid #e6ebf1',
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  margin: '8px 0',
};

const footerLink = {
  color: '#8898aa',
  textDecoration: 'underline',
};
