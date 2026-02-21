from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.controllers.machine_controller import router as machine_router

app = FastAPI(title="Machinery Listing API")

#Allow CORS for the frontend running on localhost
app.add_middleware(CORSMiddleware,allow_origins=["*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"],)

app.include_router(machine_router)

@app.get("/")
def read_root():
    return {"message": "Machinery Listing API is running"}
