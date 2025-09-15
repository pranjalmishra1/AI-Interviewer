import useState from "react";

export default function IntroScreen({ onSubmit }) {
  const [form, setForm] = useState({ name: "", age: "", course: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.course) return;
    onSubmit(form);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center text-white space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold animate-bounce">👋 Hi, I am your AI Excel Interviewer</h1>
      <p className="text-lg">Let’s start with some basic details</p>

      <form onSubmit={handleSubmit} className="bg-white/20 p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md text-black"
        />
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={form.age}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md text-black"
        />
        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md text-black"
        >
          <option value="">Select your course</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="MBA">MBA</option>
          <option value="B.Tech">B.Tech</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="w-full py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-105 transition">
          Start Interview 🚀
        </button>
      </form>
    </div>
  );
}
