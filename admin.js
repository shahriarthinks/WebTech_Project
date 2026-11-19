/* =====================================================
   Blood Connect - admin.js
   Used by all Admin pages: admin.html, users.html, blood-stock.html,
   requests.html and donations.html.

   Team work (who did what):
   - Sadib        : Registration (Create Account), Admin pages, Forgot Password
   - Sadiha       : Login (Sign In) and Staff dashboard
   - Natasha      : Landing page and Medical Officer dashboard
   - Sadia Mourin : Donor and Receiver dashboards
   This file is done by Sadib.
   Each page only has some of the tables, so before filling a table we
   check that it is on the page: document.getElementById(...) gives
   null when the element is not found.
   ===================================================== */


// ---------- Data (arrays of objects) ----------
// For now the data is written here. Later it will come from the database.

let stock = [
  { type: "A+", units: 452 },
  { type: "A-", units: 87 },
  { type: "B+", units: 321 },
  { type: "B-", units: 45 },
  { type: "AB+", units: 189 },
  { type: "AB-", units: 12 },
  { type: "O+", units: 1120 },
  { type: "O-", units: 6 }
];

let requests = [
  { id: "REQ-9012", patient: "Sakib Khan", hospital: "Dhaka Medical College Hospital", type: "O-", units: 2, urgency: "High", status: "Approved" },
  { id: "REQ-9013", patient: "Arnob Rahman", hospital: "Square Hospital", type: "AB-", units: 1, urgency: "Normal", status: "Pending" },
  { id: "REQ-9014", patient: "Rupom Sarkar", hospital: "Evercare Hospital", type: "A+", units: 3, urgency: "High", status: "Pending" },
  { id: "REQ-9015", patient: "Avijit Roy", hospital: "BIRDEM General Hospital", type: "B-", units: 2, urgency: "Normal", status: "Rejected" },
  { id: "REQ-9016", patient: "Jamil Hasan", hospital: "United Hospital", type: "O+", units: 4, urgency: "High", status: "Approved" }
];

let users = [
  { id: "USR-1001", name: "Nadia Islam", email: "nadia@example.com", role: "Donor", status: "Active" },
  { id: "USR-1002", name: "Arnob Rahman", email: "arnob@example.com", role: "Receiver", status: "Active" },
  { id: "USR-1003", name: "Dr. Nusrat Jahan", email: "nusrat@example.com", role: "Medical Officer", status: "Active" },
  { id: "USR-1004", name: "Rafiq Islam", email: "rafiq@example.com", role: "Staff", status: "Active" },
  { id: "USR-1005", name: "Tanvir Hasan", email: "tanvir@example.com", role: "Donor", status: "Suspended" },
  { id: "USR-1006", name: "Mitu Akter", email: "mitu@example.com", role: "Receiver", status: "Active" }
];

let donations = [
  { id: "DON-3101", donor: "Nadia Islam", type: "B+", units: 1, date: "August 29, 2026", status: "Completed" },
  { id: "DON-3102", donor: "Karim Uddin", type: "O+", units: 1, date: "August 29, 2026", status: "Completed" },
  { id: "DON-3103", donor: "Farhana Yasmin", type: "A-", units: 1, date: "August 28, 2026", status: "Completed" },
  { id: "DON-3104", donor: "Tanvir Hasan", type: "AB+", units: 1, date: "August 28, 2026", status: "Pending" },
  { id: "DON-3105", donor: "Rahim Ahmed", type: "O-", units: 1, date: "August 27, 2026", status: "Rejected" }
];


// ---------- Helper functions ----------

// Make one table cell, put text in it and add it to the row
function addCell(row, text, className) {
  let cell = document.createElement("td");
  cell.textContent = text;
  if (className !== "") {
    cell.classList.add(className);
  }
  row.appendChild(cell);
  return cell;
}

// Make a small button
function makeButton(text, colour) {
  let button = document.createElement("button");
  button.textContent = text;
  button.classList.add(colour);
  button.classList.add("small-btn");
  return button;
}

// Status word -> CSS class for its colour
function statusClass(status) {
  switch (status) {
    case "Available":
    case "Approved":
    case "Active":
    case "Completed":
      return "available";
    case "Low":
    case "Pending":
      return "low";
    default:
      return "critical";   // Critical, Very Critical, Rejected, Suspended
  }
}

// Number of units -> stock status
function stockStatus(units) {
  if (units < 10) {
    return "Very Critical";
  } else if (units < 50) {
    return "Critical";
  } else if (units < 100) {
    return "Low";
  } else {
    return "Available";
  }
}

// Writes a number into a card, only if that card is on the page
function setCard(id, value) {
  let card = document.getElementById(id);
  if (card !== null) {
    card.textContent = value;
  }
}


// ---------- Today's date (all admin pages) ----------

// getDate() is in the practice sheet; getMonth() (0 = January) and
// getFullYear() work the same way for the month and the year.
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
let today = new Date();
let todayText = months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();
document.getElementById("today").textContent = todayText;


// ---------- Logout (all admin pages) ----------

document.getElementById("logoutLink").addEventListener("click", function (event) {
  if (!confirm("Are you sure you want to logout?")) {
    event.preventDefault();   // stay on this page
  }
});


// ---------- Summary cards (admin.html) ----------

function updateCards() {
  let totalUnits = 0;
  stock.forEach(function (item) {
    totalUnits = totalUnits + item.units;
  });

  let pending = 0;
  requests.forEach(function (request) {
    if (request.status === "Pending") {
      pending++;
    }
  });

  let activeUsers = 0;
  users.forEach(function (user) {
    if (user.status === "Active") {
      activeUsers++;
    }
  });

  let completed = 0;
  donations.forEach(function (donation) {
    if (donation.status === "Completed") {
      completed++;
    }
  });

  setCard("totalUnits", totalUnits);
  setCard("pendingCount", pending);
  setCard("donationCount", completed);
  setCard("activeUsers", activeUsers);
}


// ---------- Blood stock table (admin.html and blood-stock.html) ----------

function showStock() {
  let table = document.getElementById("stockTable");
  if (table === null) {
    return;
  }

  table.innerHTML = "";   // remove the old rows

  stock.forEach(function (item) {
    let row = document.createElement("tr");
    let status = stockStatus(item.units);
    addCell(row, item.type, "type");
    addCell(row, item.units + " Units", "");
    addCell(row, status, statusClass(status));
    table.appendChild(row);
  });
}

// "Add Units" form (blood-stock.html)
let stockForm = document.getElementById("stockForm");

if (stockForm !== null) {
  stockForm.addEventListener("submit", function (event) {
    event.preventDefault();   // stops page reload on submit

    let type = document.getElementById("stockType").value;
    let units = document.getElementById("stockUnits").value;
    let message = document.getElementById("stockMessage");

    if (type === "") {
      message.innerHTML = "Please choose a blood type.";
      message.classList.add("critical");
      return;
    }

    let number = Number(units);
    if (units.trim() === "" || !Number.isInteger(number) || number < 1 || number > 500) {
      message.innerHTML = "Enter a whole number of units from 1 to 500.";
      message.classList.add("critical");
      return;
    }

    for (let i = 0; i < stock.length; i++) {
      if (stock[i].type === type) {
        stock[i].units = stock[i].units + number;
      }
    }

    message.classList.remove("critical");
    message.innerHTML = number + " unit(s) of " + type + " added to stock.";
    stockForm.reset();
    refreshAll();
  });
}


// ---------- Requests table (requests.html) and recent requests (admin.html) ----------

function showRequests() {

  // Short table on the dashboard (no buttons)
  let recent = document.getElementById("recentRequests");
  if (recent !== null) {
    recent.innerHTML = "";
    requests.forEach(function (request) {
      let row = document.createElement("tr");
      addCell(row, request.id, "req-id");
      addCell(row, request.patient, "");
      addCell(row, request.type, "type");
      addCell(row, request.units + " Unit(s)", "");
      addCell(row, request.status, statusClass(request.status));
      recent.appendChild(row);
    });
  }

  // Full table with Approve / Reject buttons
  let table = document.getElementById("requestTable");
  if (table === null) {
    return;
  }

  table.innerHTML = "";

  requests.forEach(function (request) {
    let row = document.createElement("tr");
    addCell(row, request.id, "req-id");
    addCell(row, request.patient, "");
    addCell(row, request.hospital, "");
    addCell(row, request.type, "type");
    addCell(row, request.units + " Unit(s)", "");
    addCell(row, request.urgency, "");
    addCell(row, request.status, statusClass(request.status));

    let actionCell = addCell(row, "", "");

    if (request.status === "Pending") {
      let approve = makeButton("Approve", "red-btn");
      let reject = makeButton("Reject", "grey-btn");

      approve.addEventListener("click", function () {
        approveRequest(request);
      });
      reject.addEventListener("click", function () {
        rejectRequest(request);
      });

      actionCell.appendChild(approve);
      actionCell.appendChild(reject);
    } else {
      actionCell.textContent = "-";
    }

    table.appendChild(row);
  });
}

function approveRequest(request) {
  // Find the blood type in the stock
  for (let i = 0; i < stock.length; i++) {
    if (stock[i].type === request.type) {

      if (stock[i].units < request.units) {
        alert("Not enough " + request.type + " blood in stock. Only " + stock[i].units + " unit(s) left.");
        return;
      }

      stock[i].units = stock[i].units - request.units;
    }
  }

  request.status = "Approved";
  alert(request.id + " approved. " + request.units + " unit(s) of " + request.type + " taken from stock.");
  refreshAll();
}

function rejectRequest(request) {
  if (confirm("Reject request " + request.id + " for " + request.patient + "?")) {
    request.status = "Rejected";
    refreshAll();
  }
}


// ---------- Users table (users.html) ----------

function showUsers(list) {
  let table = document.getElementById("userTable");
  if (table === null) {
    return;
  }

  table.innerHTML = "";

  if (list.length === 0) {
    document.getElementById("noUsers").style.display = "block";
  } else {
    document.getElementById("noUsers").style.display = "none";
  }

  list.forEach(function (user) {
    let row = document.createElement("tr");
    addCell(row, user.id, "req-id");
    addCell(row, user.name, "");
    addCell(row, user.email, "");
    addCell(row, user.role, "");
    addCell(row, user.status, statusClass(user.status));

    let actionCell = addCell(row, "", "");
    let button;

    if (user.status === "Active") {
      button = makeButton("Suspend", "grey-btn");
    } else {
      button = makeButton("Activate", "red-btn");
    }

    button.addEventListener("click", function () {
      changeUserStatus(user);
    });

    actionCell.appendChild(button);
    table.appendChild(row);
  });
}

function changeUserStatus(user) {
  if (user.status === "Active") {
    if (!confirm("Suspend " + user.name + "?")) {
      return;
    }
    user.status = "Suspended";
  } else {
    user.status = "Active";
  }
  refreshAll();   // shows the users table again, with the same search
}

// Search by name, email or role
function searchUsers() {
  let box = document.getElementById("userSearch");
  if (box === null) {
    return;
  }

  let text = box.value.trim().toLowerCase();
  let found = [];

  users.forEach(function (user) {
    if (user.name.toLowerCase().includes(text) ||
        user.email.toLowerCase().includes(text) ||
        user.role.toLowerCase().includes(text)) {
      found.push(user);
    }
  });

  showUsers(found);
}

let userSearchButton = document.getElementById("userSearchBtn");
if (userSearchButton !== null) {
  userSearchButton.addEventListener("click", searchUsers);
}


// ---------- Donations table (donations.html) ----------

function showDonations() {
  let table = document.getElementById("donationTable");
  if (table === null) {
    return;
  }

  let filter = document.getElementById("donationFilter").value;
  let shown = 0;

  table.innerHTML = "";

  donations.forEach(function (donation) {
    if (filter === "" || filter === donation.type) {
      let row = document.createElement("tr");
      addCell(row, donation.id, "req-id");
      addCell(row, donation.donor, "");
      addCell(row, donation.type, "type");
      addCell(row, donation.units + " Unit", "");
      addCell(row, donation.date, "");
      addCell(row, donation.status, statusClass(donation.status));
      table.appendChild(row);
      shown++;
    }
  });

  if (shown === 0) {
    document.getElementById("noDonations").style.display = "block";
  } else {
    document.getElementById("noDonations").style.display = "none";
  }
}

let donationFilterButton = document.getElementById("donationFilterBtn");
if (donationFilterButton !== null) {
  donationFilterButton.addEventListener("click", showDonations);
}


// ---------- Show everything when the page opens ----------

// Shows all tables and cards again. It is also called after every change,
// so the cards and the stock always match the tables.
function refreshAll() {
  showStock();
  showRequests();
  searchUsers();
  showDonations();
  updateCards();
}

refreshAll();
