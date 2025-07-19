import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import SpeechToText from "./SpeechToText";

const Summary = () => {
  const { resumeData, setResumeData, handleChange } = useContext(ResumeContext);
  const [selectedField, setSelectedField] = React.useState(null);

  const handleSpeechResult = (transcript) => {
    if (selectedField === 'summary') {
      setResumeData({ ...resumeData, summary: transcript });
    }
  };

  const handleFieldFocus = () => {
    setSelectedField('summary');
  };

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
          className={`w-full other-input h-32 ${selectedField === 'summary' ? 'ring-2 ring-blue-500' : ''}`}
          value={resumeData.summary}
          onChange={handleChange}
          onFocus={handleFieldFocus}
          maxLength="500"
        />
      </div>
    </div>
  );
};

export default Summary;
