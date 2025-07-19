import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import SpeechToText from "./SpeechToText";

const WorkExperience = () => {
  const {
    resumeData,
    setResumeData,
  } = useContext(ResumeContext);
  const [selectedField, setSelectedField] = React.useState(null);

  const handleSpeechResult = (transcript) => {
    if (selectedField) {
      const [fieldName, index] = selectedField.split('-');
      if (index !== undefined) {
        const newWorkExperience = [...resumeData.workExperience];
        newWorkExperience[parseInt(index)][fieldName] = transcript;
        setResumeData({ ...resumeData, workExperience: newWorkExperience });
      }
    }
  };

  const handleFieldFocus = (fieldName, index) => {
    setSelectedField(`${fieldName}-${index}`);
  };

  const handleWorkExperience = (e, index) => {
    const newworkExperience = [...resumeData.workExperience];
    newworkExperience[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, workExperience: newworkExperience });
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeWorkExperience = (index) => {
    const newworkExperience = [...resumeData.workExperience];
    newworkExperience[index] = newworkExperience[newworkExperience.length - 1];
    newworkExperience.pop();
    setResumeData({ ...resumeData, workExperience: newworkExperience });
  };

  return (
    <div className="flex-col-gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="input-title">
        Work Experience
        <SpeechToText onResult={handleSpeechResult} selectedField={selectedField} />
      </h2>
      {resumeData.workExperience.map((workExperience, index) => (
        <div key={index} className="f-col">
          <input
            type="text"
            placeholder="Company"
            name="company"
            className={`w-full other-input ${selectedField === `company-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={workExperience.company}
            onChange={(e) => handleWorkExperience(e, index)}
            onFocus={() => handleFieldFocus('company', index)}
          />
          <input
            type="text"
            placeholder="Job Title"
            name="position"
            className={`w-full other-input ${selectedField === `position-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={workExperience.position}
            onChange={(e) => handleWorkExperience(e, index)}
            onFocus={() => handleFieldFocus('position', index)}
          />
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            className={`w-full other-input h-32 ${selectedField === `description-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={workExperience.description}
            maxLength="250"
            onChange={(e) => handleWorkExperience(e, index)}
            onFocus={() => handleFieldFocus('description', index)}
          />
          <textarea
            type="text"
            placeholder="Key Achievements"
            name="keyAchievements"
            className={`w-full other-input h-40 ${selectedField === `keyAchievements-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={workExperience.keyAchievements}
            onChange={(e) => handleWorkExperience(e, index)}
            onFocus={() => handleFieldFocus('keyAchievements', index)}
          />
          <div className="flex-wrap-gap-2">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className={`other-input ${selectedField === `startYear-${index}` ? 'ring-2 ring-blue-500' : ''}`}
              value={workExperience.startYear}
              onChange={(e) => handleWorkExperience(e, index)}
              onFocus={() => handleFieldFocus('startYear', index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className={`other-input ${selectedField === `endYear-${index}` ? 'ring-2 ring-blue-500' : ''}`}
              value={workExperience.endYear}
              onChange={(e) => handleWorkExperience(e, index)}
              onFocus={() => handleFieldFocus('endYear', index)}
            />
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />
    </div>
  );
};

export default WorkExperience;
