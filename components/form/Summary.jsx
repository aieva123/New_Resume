import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
const Summary = () => {
  const { resumeData, setResumeData, handleChange } = useContext(ResumeContext);
  return (
    <div className="flex-col-gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="input-title">
        Summary
        <SpeechToText onResult={handleSpeechResult} selectedField={selectedField} />
      </h2>
      <div>
        <textarea
          placeholder="Summary"
          name="summary"
          className="w-full other-input h-40"
          value={resumeData.summary}
          onChange={handleChange}
          maxLength="500"
        />
      </div>
    </div>
  );
};

export default Summary;
