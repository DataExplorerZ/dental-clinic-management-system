from pydantic import BaseModel

from typing import List, Optional

from datetime import datetime


class InvoiceItemCreate(BaseModel):

    treatment_name: str

    amount: float


class InvoiceCreate(BaseModel):

    patient_id: int

    payment_status: str

    notes: Optional[str] = None

    next_visit_date: Optional[str] = None

    items: List[InvoiceItemCreate]


class InvoiceItemResponse(BaseModel):

    id: int

    treatment_name: str

    amount: float

    class Config:
        from_attributes = True


class InvoiceResponse(BaseModel):

    id: int

    patient_id: int

    total_amount: float

    payment_status: str

    notes: Optional[str]

    next_visit_date: Optional[str]

    created_at: datetime

    items: List[InvoiceItemResponse]

    class Config:
        from_attributes = True