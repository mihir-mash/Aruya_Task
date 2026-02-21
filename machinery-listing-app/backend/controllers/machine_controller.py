from fastapi import APIRouter, Depends
from typing import List
from backend.services.machine_service import MachineService
from backend.models.machine import Machine

router = APIRouter()

def get_service() -> MachineService:
    return MachineService()

@router.get("/machines", response_model=List[Machine])
def get_machines(service: MachineService = Depends(get_service)):
    return service.list_machines()