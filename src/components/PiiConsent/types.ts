export interface PiiConsentProps {
  consentGiven: boolean | null;
  onConsent: () => void;
  onDecline: () => void;
}
