from fastapi import APIRouter
from app.schemas.schemas import AskQuestionRequest, AskQuestionResponse
from app.analytics.ai_engine import HospitalityAIEngine

router = APIRouter()
ai_engine = HospitalityAIEngine()

@router.post("/", response_model=AskQuestionResponse)
def ask_question(request: AskQuestionRequest):
    result = ai_engine.answer_question(request.question)
    return result

@router.get("/suggested")
def get_suggested_questions():
    return {
        "suggestions": [
            "Why is energy consumption high?",
            "What should we fix first?",
            "How much could we save?",
            "What happened to water consumption?",
            "Which area is generating the most waste?"
        ]
    }
