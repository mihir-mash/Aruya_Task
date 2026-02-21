import json
import os
from typing import List
from backend.models.machine import Machine


class MachineRepository:
    #Repository layer to abstract data access for machines.

    def __init__(self, json_path: str = None):
        if json_path is None:
            base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
            json_path = os.path.join(base_dir, "backend", "machines.json")
        self._json_path = json_path
        self._machines: List[Machine] = []
        self._load_data()

    def _load_data(self) -> None:
        #Load machines from the JSON file into self._machines
        if not os.path.exists(self._json_path):
            raise FileNotFoundError(f"Machines data file not found: {self._json_path}")
        with open(self._json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        self._machines = [Machine(**item) for item in data]

    def get_all_machines(self) -> List[Machine]:
        return self._machines