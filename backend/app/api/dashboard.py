from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from sqlalchemy import func

from datetime import date

from app.database.session import get_db

from app.models.patient import Patient

from app.models.appointment import Appointment

from app.models.invoice import Invoice

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db)
):

    total_patients = db.query(
        Patient
    ).count()

    total_appointments = db.query(
        Appointment
    ).count()

    total_invoices = db.query(
        Invoice
    ).count()

    total_revenue = db.query(
        func.sum(Invoice.total_amount)
    ).scalar()

    pending_payments = db.query(
        Invoice
    ).filter(
        Invoice.payment_status == "Unpaid"
    ).count()

    today_appointments = db.query(
        Appointment
    ).filter(
        Appointment.appointment_date == str(date.today())
    ).count()

    return {

        "total_patients":
            total_patients,

        "total_appointments":
            total_appointments,

        "today_appointments":
            today_appointments,

        "total_invoices":
            total_invoices,

        "total_revenue":
            total_revenue or 0,

        "pending_payments":
            pending_payments
    }