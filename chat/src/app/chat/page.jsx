"use client";
import { useState } from "react";
import ChatBox from "@/app/components/Chat/ChatBox";

const ChatPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div className="page-container">
      <ChatBox currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
    </div>
  );
};
export default ChatPage;
