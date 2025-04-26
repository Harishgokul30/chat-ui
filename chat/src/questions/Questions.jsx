const questions = [
    { id: "q1", type: "text", question: "Tell me about yourself." },
    { id: "q2", type: "radio", question: "What is your experience level?", options: ["Beginner", "Intermediate", "Advanced"] },
    { id: "q3", type: "checkbox", question: "Which programming languages do you know?", options: ["C++", "Python", "JavaScript", "Java"] },
    { id: "q4", type: "dropdown", question: "Select your preferred work location.", options: ["Bangalore", "Chennai", "Hyderabad", "Remote"] },
    { id: "q5", type: "yesno", question: "Are you willing to relocate?", options: ["Yes", "No"] },
    { id: "q6", type: "file", question: "Upload your Resume." },
    { id: "q7", type: "video", question: "Upload a short video introduction." },
    { id: "q8", type: "voice", question: "Record a short voice note about your last project." },
    { id: "q9", type: "code", question: "Write a simple JavaScript function to reverse a string." },
    { id: "q10", type: "datetime", question: "Select a date and time for your final interview." }
  ];
  
  export default questions;
  