from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    Text,
    DateTime
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.database.database import Base

class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    appointment_id = Column(
        Integer,
        ForeignKey("appointments.id")
    )

    symptoms = Column(Text)

    diagnosis = Column(Text)

    treatment_notes = Column(Text)

    follow_up_notes = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    patient = relationship("Patient")

    appointment = relationship("Appointment")