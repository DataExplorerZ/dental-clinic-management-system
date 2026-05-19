from sqlalchemy import (
    Column,
    Integer,
    String,
    Text
)

from app.database.database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    phone_number = Column(
        String,
        unique=True,
        nullable=False
    )

    email = Column(String)

    address = Column(Text)

    age = Column(Integer)

    gender = Column(String)

    blood_group = Column(String)

    allergies = Column(Text)

    diseases = Column(Text)

    smoking_history = Column(String)

    notes = Column(Text)