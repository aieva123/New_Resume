import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import SpeechToText from "./SpeechToText";

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [selectedField, setSelectedField] = React.useState(null);

  const handleSpeechResult = (transcript) => {
    if (selectedField) {
      const [fieldName, index] = selectedField.split('-');
      if (index !== undefined) {
        const newProjects = [...resumeData.projects];
        newProjects[parseInt(index)][fieldName] = transcript;
        setResumeData({ ...resumeData, projects: newProjects });
      }
    }
  };

  const handleFieldFocus = (fieldName, index) => {
    setSelectedField(`${fieldName}-${index}`);
  };

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          title: "",
          link: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeProjects = (index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = newProjects[newProjects.length - 1];
    newProjects.pop();
    setResumeData({ ...resumeData, projects: newProjects });
  };

  return (
    <div className="flex-col-gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="input-title">
        Projects
        <SpeechToText onResult={handleSpeechResult} selectedField={selectedField} />
      </h2>
      {resumeData.projects.map((project, index) => (
        <div key={index} className="f-col">
          <input
            type="text"
            placeholder="Project Name"
            name="name"
            className={`w-full other-input ${selectedField === `name-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={project.name}
            onChange={(e) => handleProjects(e, index)}
            onFocus={() => handleFieldFocus('name', index)}
          />
          <input
            type="text"
            placeholder="Link"
            name="link"
            className={`w-full other-input ${selectedField === `link-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={project.link}
            onChange={(e) => handleProjects(e, index)}
            onFocus={() => handleFieldFocus('link', index)}
          />
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            className={`w-full other-input h-32 ${selectedField === `description-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={project.description}
            maxLength="250"
            onChange={(e) => handleProjects(e, index)}
            onFocus={() => handleFieldFocus('description', index)}
          />
          <textarea
            type="text"
            placeholder="Key Achievements"
            name="keyAchievements"
            className={`w-full other-input h-40 ${selectedField === `keyAchievements-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={project.keyAchievements}
            onChange={(e) => handleProjects(e, index)}
            onFocus={() => handleFieldFocus('keyAchievements', index)}
          />
          <div className="flex-wrap-gap-2">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className={`other-input ${selectedField === `startYear-${index}` ? 'ring-2 ring-blue-500' : ''}`}
              value={project.startYear}
              onChange={(e) => handleProjects(e, index)}
              onFocus={() => handleFieldFocus('startYear', index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className={`other-input ${selectedField === `endYear-${index}` ? 'ring-2 ring-blue-500' : ''}`}
              value={project.endYear}
              onChange={(e) => handleProjects(e, index)}
              onFocus={() => handleFieldFocus('endYear', index)}
            />
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.projects.length}
        add={addProjects}
        remove={removeProjects}
      />
    </div>
  );
};

export default Projects;
