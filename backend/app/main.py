from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.models.user import User
from app.api.auth import router as auth_router
from app.models.patient import Patient
from app.api.patients import router as patient_router
from app.models.appointment import Appointment
from app.api.appointments import (
    router as appointment_router
)
from app.models.medical_record import MedicalRecord
from app.api.medical_records import (
    router as medical_record_router
)
from app.models.invoice import Invoice
from app.api.invoices import (
    router as invoice_router
)
from app.models.invoice_item import InvoiceItem
from app.api.dashboard import (
    router as dashboard_router
)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Dental Clinic Management System",
    version="1.0.0"
)

# CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTERS
app.include_router(auth_router)
app.include_router(patient_router)
app.include_router(appointment_router)
app.include_router(medical_record_router)
app.include_router(invoice_router)
app.include_router(dashboard_router)
@app.get("/")
def root():
    return {
        "message": "Dental Clinic Management System API"
    }