var selectedImage;  // Global variable to keep track of the currently selected image element

function changeImage(event, imgElement) {
    event.stopPropagation();  // Prevents the click event from bubbling up
    selectedImage = imgElement;  // Store the image element that was clicked
    document.getElementById('fileInput').click();  // Trigger the file input dialog
}

document.getElementById('fileInput').addEventListener('change', function() {
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
    var table = document.getElementById("methodsTable");
    var method = document.getElementById("methodInput").value;
    var lastUsed = document.getElementById("lastUsedInput").value;
    var timeSpent = document.getElementById("timeSpentInput").value;
    var achievements = document.getElementById("achievementsInput").value;

    if (!method || !lastUsed || !timeSpent || !achievements) {
        alert("Please fill in all fields before adding a method.");
        return;
    }

    var row = table.insertRow(-1);
    appendPictureCell(row);
    appendTextCell(row, method);
    appendTextCell(row, lastUsed);
    appendTextCell(row, timeSpent);
    appendTextCell(row, achievements);
    appendDeleteButton(row);

    clearFormFields();
    saveTableData();
}

function appendPictureCell(row) {
    var pictureCell = row.insertCell(0);
    var imageContainer = document.createElement('div');
    imageContainer.className = 'image-hover-container';

    var img = document.createElement('img');
    img.src = "default.jpg"; // Set to your default or placeholder image path
    img.alt = "Default Image";
    img.style.width = "100px";
    img.onclick = function(event) { changeImage(event, img); };

    var hoverContent = document.createElement('div');
    hoverContent.className = 'hover-content';
    hoverContent.innerHTML = '<span class="hover-icon">&#43;</span><span class="hover-text">Add New</span>';

    imageContainer.appendChild(img);
    imageContainer.appendChild(hoverContent);
    pictureCell.appendChild(imageContainer);
}

function appendTextCell(row, text) {
    var cell = row.insertCell();
    cell.textContent = text;
}

function appendDeleteButton(row) {
    var deleteCell = row.insertCell();
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() { deleteRow(deleteButton); };
    deleteCell.appendChild(deleteButton);
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveTableData();
}

function clearFormFields() {
    document.getElementById("methodInput").value = "";
    document.getElementById("lastUsedInput").value = "";
    document.getElementById("timeSpentInput").value = "";
    document.getElementById("achievementsInput").value = "";
}

function saveTableData() {
    var table = document.getElementById("methodsTable");
    var data = [];
    for (var i = 1, row; row = table.rows[i]; i++) {
        var rowData = {
            method: row.cells[1].textContent,
            lastUsed: row.cells[2].textContent,
            timeSpent: row.cells[3].textContent,
            achievements: row.cells[4].textContent,
            imageUrl: row.cells[0].getElementsByTagName('img')[0].src
        };
        data.push(rowData);
    }
    localStorage.setItem('tableData', JSON.stringify(data));
}

function loadTableData() {
    var data = JSON.parse(localStorage.getItem('tableData') || '[]');
    data.forEach(function(rowData) {
        var row = document.getElementById("methodsTable").insertRow();
        appendPictureCell(row, rowData.imageUrl);
        appendTextCell(row, rowData.method);
        appendTextCell(row, rowData.lastUsed);
        appendTextCell(row, rowData.timeSpent);
        appendTextCell(row, rowData.achievements);
        appendDeleteButton(row);
    });
}

document.addEventListener('DOMContentLoaded', loadTableData);
