var selectedImage; // Global variable to keep track of the currently selected image element
function changeImage(event, imgElement) {
    event.stopPropagation(); // This should prevent the click on the image from triggering the row's onclick event
    selectedImage = imgElement; // Store the image element that was clicked
    document.getElementById("fileInput").click(); // Trigger the file input dialog
}
function updateImage(imgElement, inputElement) {
    if (inputElement.files && inputElement.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            imgElement.src = e.target.result; // Update the src of the image element with the new image
        };
        reader.readAsDataURL(inputElement.files[0]); // Read the file as a data URL
    }
}
function addMethod() {
    var table = document.getElementById("methodsTable");
    // Retrieve input values
    var method = document.getElementById("methodInput").value;
    var lastUsed = document.getElementById("lastUsedInput").value;
    var timeSpent = document.getElementById("timeSpentInput").value;
    var achievements = document.getElementById("achievementsInput").value;
    // Create a new row and cells
    var row = table.insertRow(-1); // Insert a row at the end of the table
    var pictureCell = row.insertCell(0);
    var methodCell = row.insertCell(1);
    var lastUsedCell = row.insertCell(2);
    var timeSpentCell = row.insertCell(3);
    var achievementsCell = row.insertCell(4);
    // Add text to the new cells
    pictureCell.innerHTML = '<img src="default.jpg" alt="Default Image" style="width:100px;">'; // Example placeholder image
    methodCell.textContent = method;
    lastUsedCell.textContent = lastUsed;
    timeSpentCell.textContent = timeSpent;
    achievementsCell.textContent = achievements;
    // Clear input fields after insertion
    document.getElementById("methodInput").value = "";
    document.getElementById("lastUsedInput").value = "";
    document.getElementById("timeSpentInput").value = "";
    document.getElementById("achievementsInput").value = "";
}

//# sourceMappingURL=index.f3bd186e.js.map
