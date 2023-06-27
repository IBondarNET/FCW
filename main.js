function decreaseValue() {
    var numberField = document.getElementById("numberField");
    var value = parseInt(numberField.value);
    if (value > 0) {
        numberField.value = value - 1;
    }
}

function increaseValue() {
    var numberField = document.getElementById("numberField");
    var value = parseInt(numberField.value);
    numberField.value = value + 1;
}

function submit() {
    var numberField = document.getElementById("numberField");
    var product1 = document.getElementById("product1");
    var product2 = document.getElementById("product2");

    var numberValue = parseInt(numberField.value);
    var product1Value = parseInt(product1.value);
    var product2Value = parseInt(product2.value);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "api.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.response === "OK") {
                    var total = response.total;
                    var totalElement = document.createElement("span");
                    totalElement.innerText = total;
                    var totalContainer = document.getElementById("totalContainer");
                    totalContainer.innerHTML = "Total: ";
                    totalContainer.appendChild(totalElement);
                } else {
                    alert(response.response);
                }
            } else {
                alert("Error: " + xhr.status);
            }
        }
    };

    var data = JSON.stringify({
        number: numberValue,
        products: {
            product1: product1Value,
            product2: product2Value
        }
    });
    xhr.send(data);
}
