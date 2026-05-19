from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.models.invoice import Invoice

from app.models.invoice_item import (
    InvoiceItem
)

from app.schemas.invoice import (
    InvoiceCreate
)
from sqlalchemy import or_, String
router = APIRouter(
    prefix="/invoices",
    tags=["Invoices"]
)

@router.post("/")
def create_invoice(
    invoice: InvoiceCreate,
    db: Session = Depends(get_db)
):

    total_amount = sum(
        item.amount
        for item in invoice.items
    )

    new_invoice = Invoice(
        patient_id=invoice.patient_id,
        total_amount=total_amount,
        payment_status=invoice.payment_status,
        notes=invoice.notes
    )

    db.add(new_invoice)

    db.commit()

    db.refresh(new_invoice)

    for item in invoice.items:

        invoice_item = InvoiceItem(
            invoice_id=new_invoice.id,
            treatment_name=item.treatment_name,
            amount=item.amount
        )

        db.add(invoice_item)

    db.commit()

    return {
        "message": "Invoice created successfully"
    }

@router.get("/")
def get_invoices(
    search: str = "",
    status: str = "",
    db: Session = Depends(get_db)
):

    invoices = db.query(
        Invoice
    )

    if status:

        invoices = invoices.filter(
            Invoice.payment_status == status
        )

    all_invoices = invoices.all()

    result = []

    for invoice in all_invoices:

        matches_search = True

        if search:

            search_lower = search.lower()

            patient_match = (
                search_lower in
                str(invoice.patient_id).lower()
            )

            treatment_match = any(

                search_lower in
                item.treatment_name.lower()

                for item in invoice.items
            )

            matches_search = (
                patient_match or
                treatment_match
            )

        if matches_search:

            result.append({

                "id": invoice.id,

                "patient_id":
                    invoice.patient_id,

                "total_amount":
                    invoice.total_amount,

                "payment_status":
                    invoice.payment_status,

                "notes":
                    invoice.notes,

                "created_at":
                    invoice.created_at,

                "items": [

                    {
                        "treatment_name":
                            item.treatment_name,

                        "amount":
                            item.amount
                    }

                    for item in invoice.items

                ]
            })

    return result
@router.get("/{invoice_id}")
def get_single_invoice(
    invoice_id: int,
    db: Session = Depends(get_db)
):

    invoice = db.query(
        Invoice
    ).filter(
        Invoice.id == invoice_id
    ).first()

    return {

        "id": invoice.id,

        "patient_id": invoice.patient_id,

        "total_amount":
            invoice.total_amount,

        "payment_status":
            invoice.payment_status,

        "notes":
            invoice.notes,

        "created_at":
            invoice.created_at,

        "items": [

            {
                "treatment_name":
                    item.treatment_name,

                "amount":
                    item.amount
            }

            for item in invoice.items

        ]
    }

    invoices = db.query(
        Invoice
    ).all()

    return invoices