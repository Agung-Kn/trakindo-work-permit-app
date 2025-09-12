export default function ProgressSteps({ steps = [], currentStep = 1 }) {
  return (
    <div className="relative flex items-center justify-between pb-6">
      {/* Base gray line */}
      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-300 z-0"></div>

      {/* Progress active line (animated) */}
      <div
        className="absolute top-4 left-0 h-1 bg-indigo-600 z-0 transition-all duration-700 ease-in-out"
        style={{
          width: `${
            ((currentStep - 1) / (steps.length - 1 || 1)) * 100
          }%`,
        }}
      ></div>

      {/* Step circles */}
      {steps.map((step, idx) => (
        <div
          key={step.id || idx}
          className="flex flex-col items-center z-10 relative"
          style={{ width: `${100 / steps.length}%` }}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
              currentStep > idx + 1
                ? "bg-indigo-600 text-white"
                : currentStep === idx + 1
                ? "bg-indigo-600 text-white ring-4 ring-indigo-200"
                : "bg-white border border-gray-400 text-gray-700"
            }`}
          >
            {idx + 1}
          </div>
          <span
            className={`mt-2 text-sm text-center transition-colors duration-300 ${
              currentStep >= idx + 1 ? "text-indigo-600" : "text-gray-400"
            }`}
          >
            {step.name}
          </span>
        </div>
      ))}
    </div>
  );
}
