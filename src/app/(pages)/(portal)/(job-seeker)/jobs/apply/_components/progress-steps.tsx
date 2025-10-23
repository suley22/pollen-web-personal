export default function ProgressSteps({ currentStep }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      {[1, 2].map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm
                ${currentStep >= step ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-600"}`}
            style={currentStep >= step ? { backgroundColor: "#E2007A" } : {}}
          >
            {step}
          </div>
          <span
            className={`font-medium ${currentStep >= step ? "text-pink-600" : "text-gray-600"}`}
            style={currentStep >= step ? { color: "#E2007A" } : {}}
          >
            {step === 1 ? "Job Overview" : "Assessment"}
          </span>
          {step < 2 && (
            <div
              className={`w-12 h-1 ${currentStep > step ? "bg-pink-600" : "bg-gray-200"}`}
              style={currentStep > step ? { backgroundColor: "#E2007A" } : {}}
            />
          )}
        </div>
      ))}
    </div>
  );
}
