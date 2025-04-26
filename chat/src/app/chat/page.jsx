"use client";
import { useState } from "react";
import ChatBox from "@/app/components/Chat/ChatBox";

const ChatPage = () => {
  // Track the current question or other dynamic data
  const [currentQuestion, setCurrentQuestion] = useState(0); // Start at the first question

  return (
    <div>
    
      <ChatBox currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
    </div>
  );
};

export default ChatPage;
