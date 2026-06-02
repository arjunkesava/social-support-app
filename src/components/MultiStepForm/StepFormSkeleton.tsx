import './StepFormSkeleton.css';

export const StepFormSkeleton = () => (
  <div className="step-form-skeleton" aria-label="Loading form step" role="status">
    <div className="step-form-skeleton__row step-form-skeleton__row--wide" />
    <div className="step-form-skeleton__grid">
      <div className="step-form-skeleton__field" />
      <div className="step-form-skeleton__field" />
      <div className="step-form-skeleton__field" />
      <div className="step-form-skeleton__field" />
    </div>
    <div className="step-form-skeleton__row" />
    <div className="step-form-skeleton__actions">
      <div className="step-form-skeleton__button" />
      <div className="step-form-skeleton__button step-form-skeleton__button--primary" />
    </div>
  </div>
);

export default StepFormSkeleton;
