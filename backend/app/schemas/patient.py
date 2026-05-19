from pydantic import BaseModel
from typing import Optional

class PatientCreate(BaseModel):
    full_name: str
    phone_number: str
    email: Optional[str] = None
    address: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    allergies: Optional[str] = None
    diseases: Optional[str] = None
    smoking_history: Optional[str] = None
    notes: Optional[str] = None