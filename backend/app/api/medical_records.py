from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.models.medical_record import (
    MedicalRecord
)

from app.schemas.medical_record import (
    MedicalRecordCreate
)

router = APIRouter(
    prefix="/medical-records",
    tags=["Medical Records"]
)

@router.post("/")
def create_medical_record(
    record: MedicalRecordCreate,
    db: Session = Depends(get_db)
):

    new_record = MedicalRecord(
        **record.dict()
    )

    db.add(new_record)

    db.commit()

    db.refresh(new_record)

    return {
        "message": "Medical record created successfully"
    }

@router.get("/patient/{patient_id}")
def get_patient_medical_history(
    patient_id: int,
    db: Session = Depends(get_db)
):

    records = db.query(
        MedicalRecord
    ).filter(
        MedicalRecord.patient_id == patient_id
    ).all()

    return records