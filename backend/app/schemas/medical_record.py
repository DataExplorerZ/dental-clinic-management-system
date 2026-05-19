from pydantic import BaseModel

from typing import Optional

class MedicalRecordCreate(BaseModel):

    patient_id: int

    appointment_id: int

    symptoms: Optional[str] = None

    diagnosis: Optional[str] = None

    treatment_notes: Optional[str] = None

    follow_up_notes: Optional[str] = None