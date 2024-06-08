document.addEventListener("DOMContentLoaded", function() {
    loadTableData();
    var table = document.getElementById("methodsTable");
    table.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-button")) deleteRow(event.target);
    });
});
var selectedImage; // Global variable to keep track of the currently selected image element
function changeImage(event, imgElement) {
    event.stopPropagation(); // Prevents the click event from bubbling up
    selectedImage = imgElement; // Store the image element that was clicked
    document.getElementById("fileInput").click(); // Trigger the file input dialog
}
document.getElementById("fileInput").addEventListener("change", function() {
    console.log("File chosen", this.files[0]); // Debug log
    updateImage(selectedImage, this);
});
function updateImage(imgElement, inputElement) {
    if (inputElement.files && inputElement.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            imgElement.src = e.target.result;
            saveTableData(); // Save after image change
        };
        reader.readAsDataURL(inputElement.files[0]);
    }
}
function addMethod() {
    var method = document.getElementById("methodInput").value;
    var lastUsed = document.getElementById("lastUsedInput").value;
    var timeSpent = document.getElementById("timeSpentInput").value;
    var achievements = document.getElementById("achievementsInput").value;
    if (!method || !lastUsed || !timeSpent || !achievements) {
        alert("Please fill in all fields before adding a method.");
        return;
    }
    var table = document.getElementById("methodsTable").getElementsByTagName("tbody")[0];
    var row = table.insertRow(-1);
    addRowCells(row, "default.jpg", method, lastUsed, timeSpent, achievements);
    clearInputFields();
    saveTableData();
}
function addMethodRow(imageUrl, method, lastUsed, timeSpent, achievements) {
    var table = document.getElementById("methodsTable").getElementsByTagName("tbody")[0];
    var row = table.insertRow(-1);
    addRowCells(row, imageUrl, method, lastUsed, timeSpent, achievements);
}
function addRowCells(row, imageUrl, method, lastUsed, timeSpent, achievements) {
    var pictureCell = row.insertCell(0);
    var img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Default Image";
    img.style.width = "100px";
    img.onclick = function(event) {
        changeImage(event, img);
    };
    pictureCell.appendChild(img);
    var methodCell = row.insertCell(1);
    var lastUsedCell = row.insertCell(2);
    var timeSpentCell = row.insertCell(3);
    var achievementsCell = row.insertCell(4);
    methodCell.textContent = method;
    lastUsedCell.textContent = lastUsed;
    timeSpentCell.textContent = timeSpent;
    achievementsCell.textContent = achievements;
    var deleteCell = row.insertCell(5);
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button"; // Add class for event delegation
    deleteCell.appendChild(deleteButton);
}
function saveTableData() {
    var table = document.getElementById("methodsTable").getElementsByTagName("tbody")[0];
    var data = []; // Array to hold data of each row
    for(var i = 0, row; row = table.rows[i]; i++){
        var rowData = {
            method: row.cells[1].textContent,
            lastUsed: row.cells[2].textContent,
            timeSpent: row.cells[3].textContent,
            achievements: row.cells[4].textContent,
            imageUrl: row.cells[0].getElementsByTagName("img")[0].src
        };
        data.push(rowData);
    }
    localStorage.setItem("tableData", JSON.stringify(data));
}
function loadTableData() {
    var data = localStorage.getItem("tableData");
    if (data) {
        console.log("Loading data...", data);
        data = JSON.parse(data);
        var table = document.getElementById("methodsTable").getElementsByTagName("tbody")[0];
        table.innerHTML = ""; // Clear existing rows
        data.forEach(addRowFromData);
    } else {
        // Initial rows if no data in local storage
        addMethodRow("pics/sous_vide.jpg", "Sous Vide", "19/12/2023 19:23:40", "12H 30M", "Master");
        addMethodRow("pics/pan_fried.jpg", "Pan", "21/11/2023 13:49:21", "30M", "Specialist");
        addMethodRow("pics/grill.jpg", "Grill", "13/01/2024 14:10", "1H", "N.A.");
    }
}
function addRowFromData(rowData) {
    var table = document.getElementById("methodsTable").getElementsByTagName("tbody")[0];
    var row = table.insertRow(-1);
    addRowCells(row, rowData.imageUrl, rowData.method, rowData.lastUsed, rowData.timeSpent, rowData.achievements);
}
function deleteRow(button) {
    try {
        var row = button.closest("tr");
        if (row) {
            row.parentNode.removeChild(row); // Remove the row
            saveTableData(); // Update local storage data
        } else console.error("Failed to find the row to delete.");
    } catch (error) {
        console.error("Error deleting row:", error);
    }
}
function clearInputFields() {
    document.getElementById("methodInput").value = "";
    document.getElementById("lastUsedInput").value = "";
    document.getElementById("timeSpentInput").value = "";
    document.getElementById("achievementsInput").value = "";
}
function resetTable() {
    localStorage.removeItem("tableData");
    location.reload(); // Reload the page to reset the table
}

//# sourceMappingURL=index.f3bd186e.js.map
