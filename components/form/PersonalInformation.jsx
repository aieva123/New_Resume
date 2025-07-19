import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import SpeechToText from "./SpeechToText";

const PersonalInformation = ({}) => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  const [selectedField, setSelectedField] = React.useState(null);

  const handleSpeechResult = (transcript) => {
    if (selectedField) {
      setResumeData({ ...resumeData, [selectedField]: transcript });
    }
  };

  const handleFieldFocus = (fieldName) => {
    setSelectedField(fieldName);
  };

  return (
    <div className="flex-col-gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="input-title">
        Personal Information
        <SpeechToText onResult={handleSpeechResult} selectedField={selectedField} />
      </h2>
      <div className="grid-4">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          className={`pi ${selectedField === 'name' ? 'ring-2 ring-blue-500' : ''}`}
          value={resumeData.name}
          onChange={handleChange}
          onFocus={() => handleFieldFocus('name')}
        />
        <input
          type="text"
          placeholder="Job Title"
          name="position"
          className={`pi ${selectedField === 'position' ? 'ring-2 ring-blue-500' : ''}`}
          value={resumeData.position}
          onChange={handleChange}
          onFocus={() => handleFieldFocus('position')}
        />
        <input
          type="text"
          placeholder="Contact Information"
          name="contactInformation"
          className={`pi ${selectedField === 'contactInformation' ? 'ring-2 ring-blue-500' : ''}`}
          value={resumeData.contactInformation}
          onChange={handleChange}
          onFocus={() => handleFieldFocus('contactInformation')}
          minLength="10"
          maxLength="15"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className={`pi ${selectedField === 'email' ? 'ring-2 ring-blue-500' : ''}`}
          value={resumeData.email}
          onChange={handleChange}
          onFocus={() => handleFieldFocus('email')}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          className={`pi ${selectedField === 'address' ? 'ring-2 ring-blue-500' : ''}`}
          value={resumeData.address}
          onChange={handleChange}
          onFocus={() => handleFieldFocus('address')}
        />
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          className="profileInput"
          onChange={handleProfilePicture}
          placeholder="Profile Picture"
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
