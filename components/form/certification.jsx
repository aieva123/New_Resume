import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import FormButton from "./FormButton";
import SpeechToText from "./SpeechToText";

const Certification = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const skillType = "certifications";
  const title = "Certifications";
  const [selectedField, setSelectedField] = React.useState(null);

  const handleSpeechResult = (transcript) => {
    if (selectedField) {
      const [fieldName, index] = selectedField.split('-');
      if (index !== undefined && fieldName === skillType) {
        const newSkills = [...resumeData[skillType]];
        newSkills[parseInt(index)] = transcript;
        setResumeData({ ...resumeData, [skillType]: newSkills });
      }
    }
  };

  const handleFieldFocus = (index) => {
    setSelectedField(`${skillType}-${index}`);
  };

  const handleSkills = (e, index, skillType) => {
    const newSkills = [...resumeData[skillType]];
    newSkills[index] = e.target.value;
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const addSkill = () => {
    setResumeData({ ...resumeData, [skillType]: [...resumeData[skillType], ""] });
  };

  const removeSkill = (index) => {
    const newSkills = [...resumeData[skillType]];
    newSkills.splice(-1, 1);
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };  

  return (
    <div className="flex-col-gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="input-title">
        {title}
        <SpeechToText onResult={handleSpeechResult} selectedField={selectedField} />
      </h2>
      {resumeData[skillType].map((skill, index) => (
        <div key={index} className="f-col">
          <input
            type="text"
            placeholder={title}
            name={title}
            className={`w-full other-input ${selectedField === `${skillType}-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={skill}
            onChange={(e) => handleSkills(e, index, skillType)}
            onFocus={() => handleFieldFocus(index)}
          />
        </div>
      ))}
      <FormButton size={resumeData[skillType].length} add={addSkill} remove={removeSkill} />
    </div>
  );
};

export default Certification;