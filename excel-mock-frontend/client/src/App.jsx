import { useState, useEffect } from "react";
import WelcomeScreen from "./Components/WelcomeScreen";
import QuestionScreen from "./Components/QuestionScreen";
import ResultScreen from "./Components/ResultScreen";

// 🔹 Replace with your deployed backend URL from Render
const API_BASE = "https://ai-interviewer-e2bs.onrender.com";

function App() {
  const [step, setStep] = useState("welcome");
  const [user, setUser] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [report, setReport] = useState(null);

  // Fetch questions when interview starts
  useEffect(() => {
    if (step === "questions") {
      fetch(`${API_BASE}/questions`)
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((err) => console.error("❌ Error fetching questions:", err));
    }
  }, [step]);

  // Handle user details submission
  const handleSubmitDetails = (details) => {
    setUser(details);
    setStep("questions");
  };

  // Store each answer
  const handleAnswer = (answer) => {
    setAnswers((prev) => [...prev, answer]);
  };

  // Finish interview and get report
  const finishInterview = async () => {
    try {
      const res = await fetch(`${API_BASE}/report`, {
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

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ Report received:", data);
      setReport(data);
      setStep("result");
    } catch (err) {
      console.error("❌ Error generating report:", err);
      alert("Something went wrong while generating your report. Please try again.");
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
