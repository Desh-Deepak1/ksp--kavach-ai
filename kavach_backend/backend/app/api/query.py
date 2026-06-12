from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from backend.app.core.security import get_current_user, RoleChecker
from backend.app.models.schemas import InvestigationQuery, TokenData
from backend.app.services.rag_service import rag_orchestrator
from backend.app.services.voice_service import voice_service

router = APIRouter()

# Enforce access control: Restrict search execution to authenticated ranks
@router.post("/text")
async def execute_text_search(
    payload: InvestigationQuery,
    current_user: TokenData = Depends(get_current_user)
):
    try:
        response_data = rag_orchestrator.process_investigation_query(
            query_text=payload.query_text,
            current_user=current_user
        )
        return response_data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Secure query execution failure context: {str(e)}"
        )

@router.post("/voice")
async def execute_voice_search(
    file: UploadFile = File(...),
    language_code: str = Form("kn"),
    current_user: TokenData = Depends(get_current_user)
):
    # Validate the file extensions to block malicious payload uploads
    if not file.filename.endswith(('.wav', '.mp3', '.ogg', '.m4a')):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format signature. Only standardized audio payloads are permitted."
        )
        
    try:
        audio_bytes = await file.read()
        # Process the raw bytes through our bilingual translation layer
        translated_text = await voice_service.process_audio_stream(
            audio_bytes=audio_bytes,
            targeting_language=language_code
        )
        
        # Pass the extracted text cleanly to our RAG orchestrator
        response_data = rag_orchestrator.process_investigation_query(
            query_text=translated_text,
            current_user=current_user
        )
        return {
            "transcribed_intent": translated_text,
            **response_data
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Audio ingestion processing context failure: {str(e)}"
        )