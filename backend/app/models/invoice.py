from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    ForeignKey,
    DateTime,
    Text
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.database.database import Base

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    total_amount = Column(
        Float,
        nullable=False
    )

    payment_status = Column(
        String,
        default="Unpaid"
    )

    notes = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    patient = relationship("Patient")

    items = relationship(
        "InvoiceItem",
        back_populates="invoice",
        cascade="all, delete"
    )