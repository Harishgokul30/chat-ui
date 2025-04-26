"use client";
import { useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import questions from "@/questions/Questions";

const ChatForm = ({ chatHistory, setChatHistory }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userInput = inputRef.current.value.trim();
    if (!userInput) return;

    const updatedHistory = [...chatHistory, { role: "user", text: userInput }];
    const modelCount = chatHistory.filter((msg) => msg.role === "model").length;
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

    inputRef.current.value = "";
    setChatHistory(updatedHistory);
  };

  // 🧠 Check if input field should be shown
  const lastMessage = chatHistory[chatHistory.length - 1];
  const allowedInputTypes = ["text", "code", "datetime"];
  const showInput = lastMessage?.role === "model" && allowedInputTypes.includes(lastMessage.questionObj?.type);

  if (!showInput) return null; // ❌ Do not show input for options-based questions

  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      <input ref={inputRef} type="text" className="message-input" placeholder="Type your answer..." required />
      <button type="submit" className="material-symbols-rounded">
        <FaArrowUp />
      </button>
    </form>
  );
};

export default ChatForm;
