import React from "react";

function ResultScreen({ report }) {
  if (!report) return <p>Loading results...</p>;

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-green-600">🎉 Interview Completed</h2>
      <p className="text-gray-700">{report.summary}</p>

      <div className="text-left space-y-4 mt-6 max-h-96 overflow-y-auto">
        {report.feedback && report.feedback.length > 0 ? (
          report.feedback.map((f, idx) => (
            <div key={idx} className="p-4 border rounded-lg shadow-sm bg-gray-50">
              <p className="font-semibold text-gray-800">Q: {f.question}</p>
              <p className="text-gray-700">Your Answer: {f.user_answer}</p>
              <p className="text-sm text-gray-500">
                Feedback: {f.evaluation?.llm_feedback?.feedback || "No feedback"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No feedback available.</p>
        )}
      </div>
    </div>
  );
}

export default ResultScreen;
