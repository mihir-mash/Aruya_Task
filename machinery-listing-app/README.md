# Machinery Rental Platform — Listing MVP

## Project Overview

A full-stack Machinery Listing application where the FastAPI backend serves machine data from a JSON repository layer and the frontend dynamically renders machine cards with client-side multi-parameter filtering.  
This MVP represents the listing layer of a future contractor-driven machinery request system.

---

## Tech Stack

| Layer       | Technology                                   |
| ----------- | -------------------------------------------- |
| Backend     | Python 3.10+, FastAPI, Uvicorn               |
| Data Store  | JSON file (repository layer, DB-replaceable) |
| Frontend    | Plain HTML5, CSS3, Vanilla JS (ES6+)         |
| Data Models | Pydantic v2                                  |

---

## Folder Structure

```
machinery-listing-app/
├── backend/
│   ├── __init__.py
│   ├── main.py                      # FastAPI app entry point
│   ├── machines.json                # JSON data source
│   ├── controllers/
│   │   ├── __init__.py
│   │   └── machine_controller.py    # HTTP router (GET /machines)
│   ├── services/
│   │   ├── __init__.py
│   │   └── machine_service.py       # Business logic / abstraction
│   ├── repositories/
│   │   ├── __init__.py
│   │   └── machine_repository.py    # JSON data access
│   └── models/
│       ├── __init__.py
│       └── machine.py               # Pydantic data model
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## How to Run

### 1. Install Backend Dependencies

```bash
pip install fastapi "uvicorn[standard]"
```

### 2. Start the Backend

Run from the `machinery-listing-app/` directory:

```bash
uvicorn backend.main:app --host 127.0.0.1 --port 8001 --reload
```

API is available at: `http://127.0.0.1:8001`  
Swagger docs: `http://127.0.0.1:8001/docs`

### 3. Open the Frontend

Open `frontend/index.html` directly in any modern browser (e.g. double-click the file).  
No build step or web server required.

---

## Assumptions Made

- Machine availability is a static boolean in this MVP (future: calculated from booking windows).
- No authentication, write APIs, or database are implemented in this iteration.
- CORS is set to `allow_origins=["*"]` for local development — must be restricted in production.
- Filtering is intentionally client-side to reduce backend load and ease iteration speed.
- `machines.json` serves as a stand-in for a relational table that matches the `Machine` Pydantic model.

---

## Filtering Logic Explanation

Filtering is handled entirely in the browser in `script.js`:

1. On page load, `fetchMachines()` calls `GET /machines` once and stores the response in a local `allMachines` array.
2. The **filtering module** (`filterMachines()`) is a pure function: it takes a criteria object and returns a filtered array with no DOM side-effects.
3. The **rendering module** (`renderMachines()`) is responsible only for creating DOM nodes from an array — it never touches filter state.
4. Event listeners on each filter control call `applyFilters()`, which collects criteria and calls `filterMachines()`, then passes the result to `renderMachines()`.
5. All four filters (Category, Location, Availability, Price Range) are compoundable — they stack with logical AND.

This separation simulates the future split between request validation (filtering/business rules) and request presentation.

---

## Future Improvements

- **Relational DB migration** — replace `MachineRepository` with SQLAlchemy (PostgreSQL) without touching service logic.
- **Contractor booking module** — `POST /bookings` with contractor ID, machine ID, and date range.
- **Date-range based availability** — `available` computed dynamically from active reservations.
- **Conflict detection** — prevent overlapping booking windows for the same machine.
- **Reservation queueing** — waitlist when machine is unavailable for requested dates.
- **SMS / email confirmations** — Twilio/SendGrid integration on booking confirmation.
- **Vendor onboarding** — multi-tenant machine listing with vendor-specific dashboards.
- **Deployment strategy** — Dockerised containers, Nginx reverse proxy, CI/CD via GitHub Actions.
