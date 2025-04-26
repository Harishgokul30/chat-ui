"use client";
import { useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import questions from "@/questions/Question";

const ChatForm = ({ chatHistory, setChatHistory }) => {
  const inputRef = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const modelCount = chatHistory.filter(msg => msg.role === "model").length;
    const questionIndex = modelCount - 1;
    const currentQuestion = questions[questionIndex];

    if (!currentQuestion) return;

    let userMessage = "";

    switch (currentQuestion.type) {
      case "text":
      case "code":
      case "datetime":
        userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        break;

      case "radio":
      case "dropdown":
      case "yesno":
        if (!selectedOption) return;
        userMessage = selectedOption;
        break;

      case "checkbox":
        if (selectedOptions.length === 0) return;
        userMessage = selectedOptions.join(", ");
        break;

      case "file":
        if (!selectedFile) return;
        userMessage = `Uploaded file: ${selectedFile.name}`;
        break;

      case "video":
        if (!selectedVideo) return;
        userMessage = `Uploaded video: ${selectedVideo.name}`;
        break;

      case "voice":
        if (!selectedVoice) return;
        userMessage = `Uploaded voice: ${selectedVoice.name}`;
        break;

      default:
        return;
    }

    // Clear
    if (inputRef.current) inputRef.current.value = "";
    setSelectedOption("");
    setSelectedOptions([]);
    setSelectedFile(null);
    setSelectedVideo(null);
    setSelectedVoice(null);

    const updatedHistory = [...chatHistory, { role: "user", text: userMessage }];

    const nextQuestion = questions[questionIndex + 1];
    if (nextQuestion) {
      updatedHistory.push({
        role: "model",
        text: nextQuestion.question,
        questionObj: {
          type: nextQuestion.type,
          options: nextQuestion.options || [],
        },
      });
    } else {
      updatedHistory.push({ role: "model", text: "🎉 Interview complete!" });
    }

    setChatHistory(updatedHistory);
  };

  const renderInput = () => {
    const modelCount = chatHistory.filter(msg => msg.role === "model").length;
    const questionIndex = modelCount - 1;
    const currentQuestion = questions[questionIndex];

    if (!currentQuestion || chatHistory[chatHistory.length - 1].role === "user") return null;

    switch (currentQuestion.type) {
      case "text":
      case "code":
      case "datetime":
        return (
          <input ref={inputRef} type="text" className="message-input" placeholder="Your answer..." required />
        );

      case "radio":
        return (
          <div className="options">
            {currentQuestion.options.map((opt, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name="radio"
                  value={opt}
                  checked={selectedOption === opt}
                  onChange={() => setSelectedOption(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="options">
            {currentQuestion.options.map((opt, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  value={opt}
                  checked={selectedOptions.includes(opt)}
                  onChange={() => {
                    const updated = selectedOptions.includes(opt)
                      ? selectedOptions.filter(o => o !== opt)
                      : [...selectedOptions, opt];
                    setSelectedOptions(updated);
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      case "dropdown":
        return (
          <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} required>
            <option value="">-- Select --</option>
            {currentQuestion.options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case "yesno":
        return (
          <div className="options">
            {["Yes", "No"].map((opt, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name="yesno"
                  value={opt}
                  checked={selectedOption === opt}
                  onChange={() => setSelectedOption(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      case "file":
        return (
          <div>
            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} required />
            {selectedFile && <span>File: {selectedFile.name}</span>}
          </div>
        );

      case "video":
        return (
          <div>
            <input type="file" accept="video/*" onChange={(e) => setSelectedVideo(e.target.files[0])} required />
            {selectedVideo && <span>Video: {selectedVideo.name}</span>}
          </div>
        );

      case "voice":
        return (
          <div>
            <input type="file" accept="audio/*" onChange={(e) => setSelectedVoice(e.target.files[0])} required />
            {selectedVoice && <span>Voice: {selectedVoice.name}</span>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      {renderInput()}
      <button type="submit" className="material-symbols-rounded">
        <FaArrowUp />
      </button>
    </form>
  );
};

export default ChatForm;
