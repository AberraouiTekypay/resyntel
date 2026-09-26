from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.providers.csv_provider import CSVProvider

router = APIRouter()

@router.post("/csv")
async def upload_csv(
    file: UploadFile = File(...),
    data_type: str = Form("electricity")
):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files (.csv) are supported")

    content = await file.read()
    text = content.decode("utf-8", errors="ignore")

    provider = CSVProvider()
    result = provider.validate_and_parse(text, data_type=data_type)

    if not result.get("success"):
        raise HTTPException(status_code=422, detail=result.get("error", "CSV validation failed"))

    return {
        "status": "success",
        "filename": file.filename,
        "data_type": data_type,
        "rows_processed": result["row_count"],
        "columns_detected": result["headers"],
        "normalization_status": "Normalized to Moroccan Standard Units",
        "sample": result["sample"],
        "message": "CSV successfully validated and parsed. Ready for pilot analytics ingestion."
    }

@router.get("/templates/{data_type}")
def get_sample_template(data_type: str):
    """
    Returns CSV headers template for hotel engineering teams.
    """
    templates = {
        "electricity": "timestamp,meter_name,kwh,peak_kwh,cost_mad\n2026-09-01 00:00:00,Main Incomer 1,142.5,0.0,192.38\n2026-09-01 01:00:00,Main Incomer 1,138.2,0.0,186.57",
        "water": "timestamp,meter_name,m3,cost_mad\n2026-09-01 00:00:00,Main RADEEMA Incomer,2.1,30.45\n2026-09-01 01:00:00,Main RADEEMA Incomer,5.9,85.55",
        "occupancy": "date,occupied_rooms,total_rooms,guest_nights\n2026-09-01,132,180,248\n2026-09-02,140,180,265"
    }
    return {
        "data_type": data_type,
        "template_csv": templates.get(data_type, templates["electricity"])
    }
