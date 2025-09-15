from dotenv import load_dotenv
import os
import json, re
import requests

load_dotenv()

# Load API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Base URL for Gemini API (v1beta)
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

def llm_grade_answer(question, answer):
    """Uses Gemini API to evaluate candidate answers with rubric scoring."""
    if not GEMINI_API_KEY:
        return {
            "correctness": 0,
            "clarity": 0,
            "bestPractice": 0,
            "feedback": "⚠ No Gemini API key found. Only deterministic grading used.",
            "needsFollowUp": False,
        }

    # Build request body (matches working Postman format)
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": f"""
You are an objective Excel interviewer. Evaluate this open-ended answer based on the following rubric.

Question: {question["question"]}
Candidate answer: {answer}

Return a single JSON object with the following keys and integer values:
- correctness (0-5: 0=completely wrong, 5=highly accurate)
- clarity (0-3: 0=unclear, 3=easy to understand)
- bestPractice (0-2: 0=no mention, 2=excellent best practices)
- feedback (1-2 short sentences of constructive feedback)
- needsFollowUp (true/false)
"""
                    }
                ]
            }
        ]
    }

    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        data = response.json()

        # Extract text from Gemini response
        text_output = data["candidates"][0]["content"]["parts"][0]["text"]

        # Try to parse JSON object from Gemini output
        match = re.search(r"\{.*\}", text_output, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        else:
            return {
                "feedback": text_output.strip(),
                "correctness": 0,
                "clarity": 0,
                "bestPractice": 0,
                "needsFollowUp": False,
            }

    except Exception as e:
        return {
            "feedback": f"⚠ LLM Error: {e}",
            "correctness": 0,
            "clarity": 0,
            "bestPractice": 0,
            "needsFollowUp": False,
        }

def grade_answer_open_ended(question, user_answer):
    """Hybrid grading: LLM feedback for open-ended questions."""
    llm_result = llm_grade_answer(question, user_answer)

    return {
        "correct": None,  # Not applicable for open-ended
        "deterministic_feedback": None,  # Not applicable
        "llm_feedback": llm_result,
    }
