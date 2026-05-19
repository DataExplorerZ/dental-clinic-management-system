from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.models.patient import Patient

from app.schemas.patient import (
    PatientCreate
)
from sqlalchemy import or_
router = APIRouter(
    prefix="/patients",
    tags=["Patients"]
)

@router.post("/")
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db)
):

    existing_patient = db.query(Patient).filter(
        Patient.phone_number == patient.phone_number
    ).first()

    if existing_patient:
        raise HTTPException(
            status_code=400,
            detail="Phone number already exists"
        )

    new_patient = Patient(**patient.dict())

    db.add(new_patient)

    db.commit()

    db.refresh(new_patient)

    return {
        "message": "Patient created successfully"
    }

@router.get("/")
def get_patients(
    search: str = "",
    db: Session = Depends(get_db)
):

    patients = db.query(Patient)

    if search:

        patients = patients.filter(

            or_(

                Patient.full_name.ilike(
                    f"%{search}%"
                ),

                Patient.phone_number.ilike(
                    f"%{search}%"
                )
            )
        )

    return patients.all()
    patients = db.query(Patient).all()

    return patients