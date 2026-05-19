from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Date,
    Time,
    Text
)

from sqlalchemy.orm import relationship

from app.database.database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    appointment_date = Column(Date)

    appointment_time = Column(Time)

    treatment_type = Column(String)

    status = Column(
        String,
        default="Scheduled"
    )

    notes = Column(Text)

    patient = relationship("Patient")