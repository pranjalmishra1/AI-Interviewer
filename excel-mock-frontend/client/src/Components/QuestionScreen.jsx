import React, { useState, useEffect } from "react";

function QuestionScreen({ user, questions, onAnswer, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false); // 🔹 new state

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSkip();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (!questions.length) return <p>Loading questions...</p>;

  const currentQ = questions[current];
  const isMCQ = currentQ.options && currentQ.options.length > 0;

  const handleNext = () => {
    onAnswer({
      user: user.name,
      question_id: currentQ.id,
      answer_text: answer,
    });
    setAnswer("");
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimeLeft(60);
    } else {
      setIsSubmitting(true); // 🔹 disable button after final click
      onFinish();
    }
  };

  const handleSkip = () => {
    onAnswer({
      user: user.name,
      question_id: currentQ.id,
      answer_text: "Skipped",
    });
    setAnswer("");
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimeLeft(60);
    } else {
      setIsSubmitting(true); // 🔹 disable button after final click
      onFinish();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Question {current + 1} of {questions.length}
      </h2>
      <p className="text-gray-700">{currentQ.question}</p>

      {isMCQ ? (
        <div className="space-y-2">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setAnswer(opt)}
              className={`block w-full p-3 rounded-lg border ${
                answer === opt
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <textarea
          className="w-full border rounded-lg p-3 focus:ring focus:ring-pink-400"
          rows="4"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">⏳ Time left: {timeLeft}s</span>
        <div className="flex gap-3">
          {answer === "" && (
            <button
              onClick={handleSkip}
              disabled={isSubmitting} // 🔹 disable skip if submitting
              className={`px-6 py-2 rounded-lg shadow-md transition text-white ${
                isSubmitting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              Skip
            </button>
          )}
          {answer !== "" && (
            <button
              onClick={handleNext}
              disabled={isSubmitting} // 🔹 disable finish/next
              className={`px-6 py-2 rounded-lg shadow-md transition text-white ${
                isSubmitting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              {current < questions.length - 1 ? "Next" : "Finish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionScreen;
