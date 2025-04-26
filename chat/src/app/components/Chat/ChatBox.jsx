"use client";
import { useState, useEffect, useRef } from "react";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import ChatbotIcon from "./ChatbotIcon";
import "../../../styles/chat.css";
import questions from "@/questions/Questions"; // Importing questions for the chatbot

const ChatBox = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      text: "Hey there 👋 How can I help you today?",
      questionObj: {
        type: "text",
      },
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]); // Auto scroll when chat history is updated

  return (
    <div className="chatbot-popup">
      <div className="chat-header">
        <div className="header-info">
          <ChatbotIcon />
          <h2>Chatbot</h2>
        </div>
      </div>

      <div className="chat-body">
        {chatHistory.map((chat, index) => (
          <ChatMessage
            key={index}
            chat={chat}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            bottomRef={bottomRef} // Pass bottomRef to each message component
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-footer">
        <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} />
      </div>
    </div>
  );
};

export default ChatBox;
