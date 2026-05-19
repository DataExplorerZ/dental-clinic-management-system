from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.models.appointment import Appointment

from app.schemas.appointment import (
    AppointmentCreate
)
from sqlalchemy import or_
from sqlalchemy import String
router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"]
)

@router.post("/")
def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db)
):

    existing_appointment = db.query(
        Appointment
    ).filter(
        Appointment.appointment_date == appointment.appointment_date,
        Appointment.appointment_time == appointment.appointment_time
    ).first()

    if existing_appointment:
        raise HTTPException(
            status_code=400,
            detail="Appointment slot already booked"
        )

    new_appointment = Appointment(
        **appointment.dict()
    )

    db.add(new_appointment)

    db.commit()

    db.refresh(new_appointment)

    return {
        "message": "Appointment created successfully"
    }

@router.get("/")
def get_appointments(
    search: str = "",
    status: str = "",
    db: Session = Depends(get_db)
):

    appointments = db.query(
        Appointment
    )

    if search:

        appointments = appointments.filter(

            or_(

                Appointment.treatment_type.ilike(
                    f"%{search}%"
                ),

                Appointment.patient_id.cast(String).ilike(
                    f"%{search}%"
                )
            )
        )

    if status:

        appointments = appointments.filter(
            Appointment.status == status
        )

    return appointments.all()
@router.put("/{appointment_id}/status")
def update_appointment_status(
    appointment_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    appointment = db.query(
        Appointment
    ).filter(
        Appointment.id == appointment_id
    ).first()

    if not appointment:

        raise HTTPException(
            status_code=404,
            detail="Appointment not found"
        )

    appointment.status = status

    db.commit()

    db.refresh(appointment)

    return {
        "message":
            "Appointment status updated"
    }
@router.get("/patient/{patient_id}")
def get_patient_appointments(
    patient_id: int,
    db: Session = Depends(get_db)
):

    appointments = db.query(
        Appointment
    ).filter(
        Appointment.patient_id == patient_id
    ).all()

    return appointments