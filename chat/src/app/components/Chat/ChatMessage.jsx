"use client";
import ChatbotIcon from "./ChatbotIcon";


const ChatMessage = ({ chat, chatHistory, setChatHistory }) => {
  if (!chat?.text) return null;

  const handleOptionClick = (value) => {
    const updatedHistory = [...chatHistory, { role: "user", text: value }];
    const modelCount = chatHistory.filter(msg => msg.role === "model").length;
    const nextQuestion = questions[modelCount];

    if (nextQuestion) {
      updatedHistory.push({
        role: "model",
        text: nextQuestion.question,
        questionObj: nextQuestion
      });
    } else {
      updatedHistory.push({ role: "model", text: "🎉 Interview complete!" });
    }

    setChatHistory(updatedHistory);
  };

  return (
    <div className="chat-message-wrapper">
      <div className={`message ${chat.role === "model" ? "bot-message" : "user-message"}`}>
        {chat.role === "model" && <ChatbotIcon />}
        <div><p>{chat.text}</p></div>
      </div>

      {chat.role === "model" && chat.questionObj?.options?.length > 0 && (
        <div className="input-options">
          {chat.questionObj.options.map((opt, i) => (
            <button key={i} className="option-button" onClick={() => handleOptionClick(opt)}>{opt}</button>
          ))}
        </div>
      )}

      {chat.role === "model" && chat.questionObj?.type === "file" && (
        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleOptionClick(e.target.files[0].name)} />
      )}

      {chat.role === "model" && chat.questionObj?.type === "video" && (
        <input type="file" accept="video/*" onChange={(e) => handleOptionClick(e.target.files[0].name)} />
      )}

      {chat.role === "model" && chat.questionObj?.type === "voice" && (
        <input type="file" accept="audio/*" onChange={(e) => handleOptionClick(e.target.files[0].name)} />
      )}
    </div>
  );
};
export default ChatMessage;