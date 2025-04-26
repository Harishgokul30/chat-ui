const questions = [
    {
      type: "text",
      question: "What's your full name?"
    },
    {
      type: "radio",
      question: "Choose your gender:",
      options: ["Male", "Female", "Other"]
    },
    {
      type: "checkbox",
      question: "Select your skills:",
      options: ["JavaScript", "Python", "Java", "C++"]
    },
    {
      type: "dropdown",
      question: "Select your highest education:",
      options: ["High School", "Bachelor's", "Master's", "PhD"]
    },
    {
      type: "yesno",
      question: "Are you willing to relocate?"
    },
    {
      type: "file",
      question: "Upload your resume"
    },
    {
      type: "video",
      question: "Upload a short self-introduction video"
    },
    {
      type: "voice",
      question: "Upload a voice message describing your experience"
    },
    {
      type: "code",
      question: "Write a function to reverse a string"
    },
    {
      type: "datetime",
      question: "When are you available for the interview?"
    }
  ];
  
  export default questions;
  