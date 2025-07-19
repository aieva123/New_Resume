import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const SpeechToText = ({ onResult, selectedField }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsRecording(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onResult]);

  const handleSpeechToText = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (!selectedField) {
      alert('Please select a field first by clicking on it.');
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      recognition.start();
    }
  };

  return (
    <button
      onClick={handleSpeechToText}
      className={`p-2 rounded-lg transition-all duration-200 shadow-sm ${
        isRecording 
          ? 'bg-red-500 text-white animate-pulse shadow-md' 
          : selectedField 
            ? 'bg-green-500 text-white hover:bg-green-600 shadow-md' 
            : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
      }`}
      disabled={!selectedField}
      title={
        isRecording 
          ? "Recording... Click to stop" 
          : selectedField 
            ? "Click to start voice input" 
            : "Select a field first, then click to start voice input"
      }
    >
      <FaMicrophone className="w-5 h-5" />
    </button>
  );
};

export default SpeechToText;