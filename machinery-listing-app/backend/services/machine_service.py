from typing import List
from backend.repositories.machine_repository import MachineRepository
from backend.models.machine import Machine

class MachineService:
    #Service layer to encapsulate business logic for machines.

    def __init__(self, repository: MachineRepository = None):
        self._repository = repository or MachineRepository()

    def list_machines(self) -> List[Machine]:
        return self._repository.get_all_machines()