from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database.database import Base

class InvoiceItem(Base):
    __tablename__ = "invoice_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    invoice_id = Column(
        Integer,
        ForeignKey("invoices.id")
    )

    treatment_name = Column(
        String,
        nullable=False
    )

    amount = Column(
        Float,
        nullable=False
    )

    invoice = relationship(
        "Invoice",
        back_populates="items"
    )