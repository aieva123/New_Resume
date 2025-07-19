import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import SpeechToText from "./SpeechToText";

const SocialMedia = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [selectedField, setSelectedField] = React.useState(null);

  const handleSpeechResult = (transcript) => {
    if (selectedField) {
      const [fieldName, index] = selectedField.split('-');
      if (index !== undefined) {
        const newSocialMedia = [...resumeData.socialMedia];
        newSocialMedia[parseInt(index)][fieldName] = transcript.replace("https://", "");
        setResumeData({ ...resumeData, socialMedia: newSocialMedia });
      }
    }
  };

  const handleFieldFocus = (fieldName, index) => {
    setSelectedField(`${fieldName}-${index}`);
  };

  // social media
  const handleSocialMedia = (e, index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index][e.target.name] = e.target.value.replace(
      "https://",
      ""
    );
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  const addSocialMedia = () => {
    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
    });
  };

  const removeSocialMedia = (index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index] = newSocialMedia[newSocialMedia.length - 1];
    newSocialMedia.pop();
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  return (
    <div className="flex-col-gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="input-title">
        Social Media
        <SpeechToText onResult={handleSpeechResult} selectedField={selectedField} />
      </h2>
      {resumeData.socialMedia.map((socialMedia, index) => (
        <div key={index} className="flex-wrap-gap-2">
          <input
            type="text"
            placeholder="Social Media"
            name="socialMedia"
            className={`other-input ${selectedField === `socialMedia-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={socialMedia.socialMedia}
            onChange={(e) => handleSocialMedia(e, index)}
            onFocus={() => handleFieldFocus('socialMedia', index)}
          />
          <input
            type="text"
            placeholder="Link"
            name="link"
            className={`other-input ${selectedField === `link-${index}` ? 'ring-2 ring-blue-500' : ''}`}
            value={socialMedia.link}
            onChange={(e) => handleSocialMedia(e, index)}
            onFocus={() => handleFieldFocus('link', index)}
          />
        </div>
      ))}
      <FormButton
        size={resumeData.socialMedia.length}
        add={addSocialMedia}
        remove={removeSocialMedia}
      />
    </div>
  );
};

export default SocialMedia;
