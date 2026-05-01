import Button from "./Button";
// import Header from "./Header";

const OnboardingLayout = ({
  step,
  totalSteps,
  label,
  prevTo,
  nextTo,
  nextLabel = "Start Cooking",
  onNext,
  children,
}) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-full flex flex-col bg-bg-background relative overflow-hidden pt-10">
      {/* Decorative blobs */}
      <img
        src="/images/blob-1.svg"
        alt="blob image"
        className="absolute -top-20 -left-4 w-40 h-40 opacity-10"
      />
      <img
        src="/images/blob-2.svg"
        className="absolute top-24 -right-12 opacity-15 w-70 h-70 "
      />
      <img
        src="/images/blob-3.svg"
        className="absolute bottom-4 -right-6 w-75 "
      />

      <div className="px-5 pt-2 pb-10 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-text-primary font-inter uppercase">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm text-text-primary font-inter">{label}</span>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden transition-all">
          <div
            className="h-full bg-accent-orange rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-1 px-5 py-4 relative z-10">{children}</div>

      <div className="px-5 pb-3 pt-2 relative z-10">
        <div className="flex items-center justify-between gap-4 mb-4">
          {prevTo ? (
            <Button
              variant="outline"
              to={prevTo}
              className="py-3 px-6 text-sm min-w-[80px]"
            >
              Prev
            </Button>
          ) : (
            <div></div>
          )}
          {onNext ? (
            <Button
              variant="primary"
              onClick={onNext}
              className="py-3 px-6 text-sm"
            >
              {nextLabel} <span>→</span>
            </Button>
          ) : nextTo ? (
            <Button variant="primary" to={nextTo} className="py-3 px-6 text-sm">
              {nextLabel} <span>→</span>
            </Button>
          ) : null}
        </div>

        <div className="flex items-center justify-center gap-4 pt-3 border-t border-text-muted/20 relative z-10 bg-bg-background">
          <span className="text-[10px] text-text-muted font-inter">
            Help Center
          </span>
          <span className="text-[10px] text-text-muted font-inter">
            Privacy
          </span>
          <span className="text-[10px] text-text-muted font-inter">Terms</span>
          <span className="text-[10px] text-text-muted font-inter">
            © 2026 NaijaEats
          </span>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
