import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import FormButton from "./FormButton";
import SpeechToText from "./SpeechToText";

const Skill = ({ title }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [selectedField, setSelectedField] = React.useState(null);

  const handleSpeechResult = (transcript) => {
    if (selectedField) {
      const [fieldName, index] = selectedField.split('-');
      if (index !== undefined && fieldName === title) {
        const newSkills = [
          ...resumeData.skills.find((skillType) => skillType.title === title)
            .skills,
        ];
        newSkills[parseInt(index)] = transcript;
        setResumeData((prevData) => ({
          ...prevData,
          skills: prevData.skills.map((skill) =>
            skill.title === title ? { ...skill, skills: newSkills } : skill
          ),
        }));
      }
    }
  };

  const handleFieldFocus = (index) => {
    setSelectedField(`${title}-${index}`);
  };

  // skills
  const handleSkill = (e, index, title) => {
    const newSkills = [
      ...resumeData.skills.find((skillType) => skillType.title === title)
        .skills,
    ];
    newSkills[index] = e.target.value;
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      ),
    }));
  };

  const addSkill = (title) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      const newSkills = [...skillType.skills, ""];
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const removeSkill = (title, index) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      const newSkills = [...skillType.skills];
      newSkills.pop();
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  return (
    <div className="flex-col-gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="input-title">
        {title}
        <SpeechToText onResult={handleSpeechResult} selectedField={selectedField} />
      </h2>
      {skillType.skills.map((skill, index) => (
        <div key={index} className="f-col">
          <input
            type="text"
            placeholder={title}
            name={title}
            className={`w-full other-input ${selectedField === `${title}-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={skill}
            onChange={(e) => handleSkill(e, index, title)}
            onFocus={() => handleFieldFocus(index)}
          />
        </div>
      ))}
      <FormButton
        size={skillType.skills.length}
        add={() => addSkill(title)}
        remove={() => removeSkill(title)}
      />
    </div>
  );
};

export default Skill;
