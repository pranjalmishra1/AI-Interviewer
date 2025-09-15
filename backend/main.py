from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from grader import grade_answer_open_ended
from typing import List
from dotenv import load_dotenv
import os
import random
import json

# Explicitly load the .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    print("✅ GEMINI_API_KEY found. Gemini API calls enabled.")
else:
    print("❌ GEMINI_API_KEY not found. LLM grading will be disabled.")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

QUESTION_POOL = [
    {"id": 1, "question": "Can you explain what VLOOKUP is used for in Excel?"},
    {"id": 2, "question": "How would you create and use a Pivot Table to analyze data?"},
    {"id": 3, "question": "Explain the difference between Absolute and Relative cell references."},
    {"id": 4, "question": "What steps would you take to clean messy data in Excel?"},
    {"id": 5, "question": "Can you describe a situation where you used conditional formatting effectively?"},
    {"id": 6, "question": "How would you explain the IF function to a beginner?"},
    {"id": 7, "question": "What are some best practices when designing Excel dashboards?"},
    {"id": 8, "question": "Explain how you would use Excel to find duplicate records."},
    {"id": 9, "question": "How do you handle large datasets efficiently in Excel?"},
    {"id": 10, "question": "What’s the difference between COUNT, COUNTA, and COUNTIF?"},
    {"id": 11, "question": "How do you protect sensitive cells or sheets in Excel?"},
    {"id": 12, "question": "Can you describe how INDEX and MATCH work together?"},
    {"id": 13, "question": "What are some limitations of Excel you have faced in real projects?"},
    {"id": 14, "question": "How would you automate repetitive tasks in Excel?"},
    {"id": 15, "question": "What Excel functions do you use most often and why?"},
]

SESSION_QUESTIONS = []

@app.get("/questions")
def get_questions():
    global SESSION_QUESTIONS
    SESSION_QUESTIONS = random.sample(QUESTION_POOL, 10)
    return SESSION_QUESTIONS

class AnswerSubmission(BaseModel):
    user: str
    question_id: int
    answer_text: str

class ReportRequest(BaseModel):
    user: str
    answers: List[AnswerSubmission]

@app.post("/report")
def generate_report(data: ReportRequest):
    feedback = []
    submitted_answers = [ans for ans in data.answers if ans.answer_text.lower() != "skipped"]
    
    for ans in submitted_answers:
        q = next((q for q in SESSION_QUESTIONS if q["id"] == ans.question_id), None)
        if not q:
            continue
        result = grade_answer_open_ended(q, ans.answer_text)
        feedback.append({
            "question": q["question"],
            "user_answer": ans.answer_text,
            "evaluation": result,
        })
    
    report_data = {
        "user": data.user,
        "total": len(SESSION_QUESTIONS),
        "summary": f"Interview completed. {len(submitted_answers)}/{len(SESSION_QUESTIONS)} answers submitted.",
        "feedback": feedback,
    }

    try:
        report_filename = f"report_{data.user.replace(' ', '_')}.json"
        with open(report_filename, "w") as f:
            json.dump(report_data, f, indent=4)
        print(f"✅ Report saved successfully to {report_filename}")
    except Exception as e:
        print(f"❌ Failed to save report: {e}")

    return report_data
