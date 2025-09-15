import React, { useState, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

function App() {
  const [step, setStep] = useState("welcome");
  const [user, setUser] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (step === "questions") {
      fetch("http://127.0.0.1:8000/questions")
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((err) => console.error(err));
    }
  }, [step]);

  const handleSubmitDetails = (details) => {
    setUser(details);
    setStep("questions");
  };

  const handleAnswer = (answer) => {
    setAnswers((prev) => [...prev, answer]);
  };

  const finishInterview = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user.name,
          answers: answers.map((a) => ({
            user: user.name,
            question_id: a.question_id,
            answer_text: a.answer_text,
          })),
        }),
      });
      const data = await res.json();
      console.log("Report received:", data);
      setReport(data);
      setStep("result");
    } catch (err) {
      console.error("Error generating report:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl">
        {step === "welcome" && <WelcomeScreen onSubmit={handleSubmitDetails} />}
        {step === "questions" && (
          <QuestionScreen
            user={user}
            questions={questions}
            onAnswer={handleAnswer}
            onFinish={finishInterview}
          />
        )}
        {step === "result" && <ResultScreen report={report} />}
      </div>
    </div>
  );
}

export default App;
