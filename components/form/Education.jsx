import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import SpeechToText from "./SpeechToText";

const Education = () => {
    const { resumeData, setResumeData} = useContext(ResumeContext);
    const [selectedField, setSelectedField] = React.useState(null);

    const handleSpeechResult = (transcript) => {
      if (selectedField) {
        const [fieldName, index] = selectedField.split('-');
        const newEducation = [...resumeData.education];
        newEducation[parseInt(index)][fieldName] = transcript;
        setResumeData({ ...resumeData, education: newEducation });
      }
    };

    const handleFieldFocus = (fieldName, index) => {
      setSelectedField(`${fieldName}-${index}`);
    };

    const handleEducation = (e, index) => {
      const newEducation = [...resumeData.education];
      newEducation[index][e.target.name] = e.target.value;
      setResumeData({ ...resumeData, education: newEducation });
    };
  
    const addEducation = () => {
      setResumeData({
        ...resumeData,
        education: [
          ...resumeData.education,
          { school: "", degree: "", startYear: "", endYear: "" },
        ],
      });
    };
  
    const removeEducation = (index) => {
      const newEducation = [...resumeData.education];
      newEducation[index] = newEducation[newEducation.length - 1];
      newEducation.pop();
      setResumeData({ ...resumeData, education: newEducation });
    };
    
    return (
      <div className="flex-col-gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="input-title">
          Education
          <SpeechToText onResult={handleSpeechResult} selectedField={selectedField} />
        </h2>
        {resumeData.education.map((education, index) => (
          <div key={index} className="f-col">
            <input
              type="text"
              placeholder="School"
              name="school"
              className={`w-full other-input ${selectedField === `school-${index}` ? 'ring-2 ring-blue-500' : ''}`}
              value={education.school}
              onChange={(e) => handleEducation(e, index)}
            <input
              type="text"
              placeholder="Degree"
              name="degree"
              className="w-full other-input"
              value={education.degree}
              onChange={(e) => handleEducation(e, index)} />
            <div className="flex-wrap-gap-2">
              <input
                type="date"
                placeholder="Start Year"
                name="startYear"
                className={`other-input ${selectedField === `startYear-${index}` ? 'ring-2 ring-blue-500' : ''}`}
                value={education.startYear}
                onChange={(e) => handleEducation(e, index)}
                onFocus={() => handleFieldFocus('startYear', index)} />
              <input
                type="date"
                placeholder="End Year"
                name="endYear"
                className={`other-input ${selectedField === `endYear-${index}` ? 'ring-2 ring-blue-500' : ''}`}
                value={education.endYear}
                onChange={(e) => handleEducation(e, index)}
                onFocus={() => handleFieldFocus('endYear', index)} />
            </div>
          </div>
        ))}
        <FormButton size={resumeData.education.length} add={addEducation} remove={removeEducation} />
      </div>
    )
  }

export default Education;