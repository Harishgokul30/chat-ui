"use client";
import ChatbotIcon from "./ChatbotIcon";
import questions from "@/questions/Questions";

const ChatMessage = ({ chat, chatHistory, setChatHistory, bottomRef }) => {
  if (!chat?.text) return null;

  const isAnswered = chat?.answered || false;

  const handleOptionClick = (value) => {
    const updatedHistory = [...chatHistory];

    // Push user answer
    updatedHistory.push({ role: "user", text: value });

    // Mark current model question as answered
    updatedHistory.forEach((msg) => {
      if (msg.role === "model" && msg.text === chat.text) {
        msg.answered = true;
      }
    });

    const modelCount = updatedHistory.filter((msg) => msg.role === "model").length;
    const nextQuestion = questions[modelCount];

    if (nextQuestion) {
      updatedHistory.push({
        role: "model",
        text: nextQuestion.question,
        questionObj: nextQuestion,
        answered: false,
      });
    } else {
      updatedHistory.push({ role: "model", text: "🎉 Interview complete!" });
    }

    setChatHistory(updatedHistory);

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCheckboxSubmit = () => {
    const selectedCheckboxes = Array.from(document.querySelectorAll(`input[name="checkbox-${chat.text}"]:checked`))
      .map(input => input.value);

    if (selectedCheckboxes.length === 0) {
      alert("Please select at least one option before submitting.");
      return;
    }

    handleOptionClick(selectedCheckboxes.join(", "));
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const codeInput = e.target.elements[`code-${chat.text}`]?.value;
    if (codeInput.trim() === "") {
      alert("Please enter some code.");
      return;
    }
    handleOptionClick(codeInput);
  };

  const handleDateTimeSubmit = (e) => {
    e.preventDefault();
    const datetimeInput = e.target.elements[`datetime-${chat.text}`]?.value;
    if (!datetimeInput) {
      alert("Please select date and time.");
      return;
    }
    handleOptionClick(datetimeInput);
  };

  return (
    <div className="chat-message-wrapper">
      <div className={`message ${chat.role === "model" ? "bot-message" : "user-message"}`}>
        {chat.role === "model" && <ChatbotIcon />}
        <div>
          <p>{chat.text}</p>
        </div>
      </div>

      {/* 📌 Options based on Question Type */}
      {chat.role === "model" && chat.questionObj?.type === "radio" && (
        <div className="input-options-vertical">
          {chat.questionObj.options.map((opt, i) => (
            <label key={i} className="option-label">
              <input
                type="radio"
                name={`radio-${chat.text}`}
                value={opt}
                disabled={isAnswered}
                onChange={() => handleOptionClick(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {chat.role === "model" && chat.questionObj?.type === "checkbox" && (
        <div className="input-options-vertical">
          {chat.questionObj.options.map((opt, i) => (
            <label key={i} className="option-label">
              <input
                type="checkbox"
                name={`checkbox-${chat.text}`}
                value={opt}
                disabled={isAnswered}
              />
              {opt}
            </label>
          ))}
          <button className="submit-button" onClick={handleCheckboxSubmit}>
            Submit Selected
          </button>
        </div>
      )}

      {chat.role === "model" && chat.questionObj?.type === "dropdown" && (
        <div className="input-options-vertical">
          <select className="dropdown-select" onChange={(e) => handleOptionClick(e.target.value)} disabled={isAnswered}>
            <option value="">Select an option</option>
            {chat.questionObj.options.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}

      {/* ✅ YES/NO input */}
      {chat.role === "model" && chat.questionObj?.type === "yesno" && (
        <div className="input-options-vertical">
          <label className="option-label">
            <input
              type="radio"
              name={`yesno-${chat.text}`}
              value="Yes"
              disabled={isAnswered}
              onChange={() => handleOptionClick("Yes")}
            />
            Yes
          </label>
          <label className="option-label">
            <input
              type="radio"
              name={`yesno-${chat.text}`}
              value="No"
              disabled={isAnswered}
              onChange={() => handleOptionClick("No")}
            />
            No
          </label>
        </div>
      )}

      {/* 📂 File Uploads */}
      {chat.role === "model" && chat.questionObj?.type === "file" && (
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          disabled={isAnswered}
          onChange={(e) => handleOptionClick(e.target.files[0]?.name)}
        />
      )}
      {chat.role === "model" && chat.questionObj?.type === "video" && (
        <input
          type="file"
          accept="video/*"
          disabled={isAnswered}
          onChange={(e) => handleOptionClick(e.target.files[0]?.name)}
        />
      )}
      {chat.role === "model" && chat.questionObj?.type === "voice" && (
        <input
          type="file"
          accept="audio/*"
          disabled={isAnswered}
          onChange={(e) => handleOptionClick(e.target.files[0]?.name)}
        />
      )}

      {/* 🖊️ Code Input */}
      {chat.role === "model" && chat.questionObj?.type === "code" && (
        <form onSubmit={handleCodeSubmit} className="input-options-vertical">
          <textarea
            name={`code-${chat.text}`}
            placeholder="Write your code here..."
            rows={5}
            className="code-textarea"
            disabled={isAnswered}
          />
          {!isAnswered && <button type="submit" className="submit-button">Submit Code</button>}
        </form>
      )}

      {/* 📅 DateTime Input */}
      {chat.role === "model" && chat.questionObj?.type === "datetime" && (
        <form onSubmit={handleDateTimeSubmit} className="input-options-vertical">
          <input
            type="datetime-local"
            name={`datetime-${chat.text}`}
            className="datetime-picker"
            disabled={isAnswered}
          />
          {!isAnswered && <button type="submit" className="submit-button">Submit Date & Time</button>}
        </form>
      )}
    </div>
  );
};

export default ChatMessage;
