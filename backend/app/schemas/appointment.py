from pydantic import BaseModel

from datetime import date, time

from typing import Optional

class AppointmentCreate(BaseModel):
    patient_id: int
    appointment_date: date
    appointment_time: time
    treatment_type: str
    status: Optional[str] = "Scheduled"
    notes: Optional[str] = None