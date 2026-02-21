const API_URL = "http://127.0.0.1:8001/machines"; //FastAPI endpoint

let allMachines = [];
let filteredMachines = [];

//DOM elements
const machinesContainer = document.getElementById("machinesContainer");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const availabilityFilter = document.getElementById("availabilityFilter");
const priceMinInput = document.getElementById("priceMin");
const priceMaxInput = document.getElementById("priceMax");
const applyBtn = document.getElementById("applyFilters");

//Fetch machines from backend
async function fetchMachines() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allMachines = data;
    populateFilterOptions();
    applyFilters(); 
  } catch (err) {
    console.error("Failed to fetch machines:", err);
    machinesContainer.innerHTML =
      "<p class='error'>Unable to load machine data.</p>";
  }
}

//Populate category and location dropdowns based on dataset
function populateFilterOptions() {
  const categories = new Set();
  const locations = new Set();
  allMachines.forEach((m) => {
    categories.add(m.category);
    locations.add(m.location);
  });

  const createOption = (value) => `<option value="${value}">${value}</option>`;
  categoryFilter.innerHTML =
    "<option value=''>All Categories</option>" +
    [...categories].map(createOption).join("");
  locationFilter.innerHTML =
    "<option value=''>All Locations</option>" +
    [...locations].map(createOption).join("");
}

function filterMachines({
  category,
  location,
  availability,
  priceMin,
  priceMax,
}) {
  return allMachines.filter((m) => {
    if (category && m.category !== category) return false;
    if (location && m.location !== location) return false;
    if (availability !== "") {
      const wantAvailable = availability === "true";
      if (m.available !== wantAvailable) return false;
    }
    if (priceMin !== "" && m.price_per_day < parseFloat(priceMin)) return false;
    if (priceMax !== "" && m.price_per_day > parseFloat(priceMax)) return false;
    return true;
  });
}

function renderMachines(machines) {
  if (machines.length === 0) {
    machinesContainer.innerHTML =
      "<p>No machines match the selected filters.</p>";
    return;
  }
  const cardsHtml = machines
    .map((m) => {
      const statusClass = m.available ? "available" : "unavailable";
      const statusText = m.available ? "Available" : "Not Available";
      return `
      <div class="card">
        <h3>${m.name}</h3>
        <div class="details">
          <p><strong>Category:</strong> ${m.category}</p>
          <p><strong>Location:</strong> ${m.location}</p>
          <p><strong>Price/Day:</strong> $${m.price_per_day.toFixed(2)}</p>
        </div>
        <div class="status ${statusClass}">${statusText}</div>
      </div>`;
    })
    .join("");
  machinesContainer.innerHTML = cardsHtml;
}

function applyFilters() {
  const criteria = {
    category: categoryFilter.value,
    location: locationFilter.value,
    availability: availabilityFilter.value,
    priceMin: priceMinInput.value,
    priceMax: priceMaxInput.value,
  };
  filteredMachines = filterMachines(criteria);
  renderMachines(filteredMachines);
}

applyBtn.addEventListener("click", applyFilters);

fetchMachines();