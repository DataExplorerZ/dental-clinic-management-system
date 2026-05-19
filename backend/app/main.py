from fastapi import FastAPI

app = FastAPI(
    title="Dental Clinic Management System",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Dental Clinic Management System API"}