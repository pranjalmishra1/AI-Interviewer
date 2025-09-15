import { useState, useEffect } from "react";

function WelcomeScreen({ onSubmit }) {
  const [details, setDetails] = useState({ name: "", age: "", course: "" });
  const [customCourse, setCustomCourse] = useState("");
  const [intro, setIntro] = useState("");

  const message = "👋 Hi, I am your AI Interviewer. Let's get started!";
  const characters = Array.from(message);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < characters.length) {
        setIntro((prev) => prev + characters[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    setDetails({ ...details, course: e.target.value });
    if (e.target.value !== "Other") {
      setCustomCourse("");
    }
  };

  const handleSubmit = () => {
    const finalCourse =
      details.course === "Other" ? customCourse : details.course;
    if (details.name && details.age && finalCourse) {
      onSubmit({ ...details, course: finalCourse });
    }
  };

  return (
    <div className="space-y-6 text-center">
      <h1 className="text-2xl font-bold text-gray-800">
        {intro}
        <span className="animate-pulse">|</span>
      </h1>

      <div className="space-y-4 mt-6">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={details.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring focus:ring-indigo-400"
        />
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={details.age}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring focus:ring-indigo-400"
        />

        <select
          name="course"
          value={details.course}
          onChange={handleCourseChange}
          className="w-full border rounded-lg p-3 focus:ring focus:ring-indigo-400"
        >
          <option value="">Select your course</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="B.Tech">B.Tech</option>
          <option value="Other">Other</option>
        </select>

        {details.course === "Other" && (
          <input
            type="text"
            placeholder="Enter your course"
            value={customCourse}
            onChange={(e) => setCustomCourse(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-indigo-400"
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
      >
        Start Interview
      </button>
    </div>
  );
}

export default WelcomeScreen;
