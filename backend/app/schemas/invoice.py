from pydantic import BaseModel

from typing import List, Optional

class InvoiceItemCreate(BaseModel):

    treatment_name: str

    amount: float

class InvoiceCreate(BaseModel):

    patient_id: int

    payment_status: Optional[str] = "Unpaid"

    notes: Optional[str] = None

    items: List[InvoiceItemCreate]