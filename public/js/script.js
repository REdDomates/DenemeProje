function getMenu(callback) {
    fetch("menu.json")
        .then((response) => response.json())
        .then((data) => {
            const products = data.menu;
            callback(products);
        })
        .catch((error) => console.error(error));
}

function delInput(button) {
    button.parentElement.parentElement.remove();
}

function addMenuInputValue(products) {
    for (const product of products) {
        // HTML kodunu oluştur
        const productHtml = `
<div class="row mb-3">
<div class="col-sm-6">
  <input type="text" class="form-control" name="productName" placeholder="Ürün Adı" value="${product["productName"]}">
</div>
<div class="col-sm">
  <input type="text" class="form-control" name="productPrice" placeholder="Fiyat" value="${product["productPrice"]}">
</div>
<div class="col-sm">
  <input type="text" class="form-control" name="oldPrice" placeholder="Eski Fiyat" value="${product["oldPrice"]}">
</div>
<div class="col-sm">
  <input type="text" class="form-control" name="productQty" placeholder="Miktar" value="${product["productQty"]}">
</div>
<div class="col-sm">
  <button type="button" class="btn btn-danger btn-remove" onclick="delInput(this)">Sil</button>
</div>
</div>
`;

        // productInputs elementini seç
        const productInputs = document.getElementById("productInputs");

        // innerHTML özelliği kullanarak HTML kodunu ekle
        productInputs.innerHTML += productHtml;
    }
}

function addAddButtonEvent() {
    // Yeni ürün ekleme butonuna tıklandığında
    document.querySelector(".btn-add").addEventListener("click", function () {
        let productInputs = document.querySelector("#productInputs");
        let newProductInput = document.createElement("div");
        newProductInput.classList.add("row", "mb-3");
        newProductInput.innerHTML =
            '<div class="col-sm-6">' +
            '<input type="text" class="form-control" name="productName" placeholder="Ürün Adı">' +
            "</div>" +
            '<div class="col-sm">' +
            '<input type="text" class="form-control" name="productPrice" placeholder="Fiyat">' +
            "</div>" +
            '<div class="col-sm">' +
            '<input type="text" class="form-control" name="oldPrice" placeholder="Eski Fiyat">' +
            "</div>" +
            '<div class="col-sm">' +
            '<input type="text" class="form-control" name="productQty" placeholder="Miktar">' +
            "</div>" +
            '<div class="col-sm">' +
            '<button type="button" class="btn btn-danger btn-remove">Sil</button>' +
            "</div>";
        productInputs.appendChild(newProductInput); // Yeni ürün girişini inputlar bölümüne ekler

        // Silme butonuna tıklanınca ilgili ürün girişi silinir
        newProductInput
            .querySelector(".btn-remove")
            .addEventListener("click", function () {
                newProductInput.remove();
            });
    });
}

function createMenu(products) {
    const productList = document.getElementById("product-list");

    while (productList.firstChild) {
        productList.removeChild(productList.firstChild);
    }

    for (const product of products) {
        const productDiv = document.createElement("div");
        productDiv.className = "col";
        if (product["productPrice"] > product["oldPrice"]) {
            productDiv.innerHTML = `
<div class="left">
<div class="p-name">${product["productName"]}</div>
</div>
<div class="right">
<div class="p-amount">${product["productQty"]}</div>
<div class="p-price red">${product["productPrice"]} TL</div>
<div class="p-change red-background">
  <div class="arrow-up"></div>
  <div class="right-container">
    <div class="change-amount">${
        product["productPrice"] - product["oldPrice"]
    }</div>
    <div class="change-amount-percentage">${(
        ((product["productPrice"] - product["oldPrice"]) /
            product["oldPrice"]) *
        100
    ).toFixed(1)}%</div>
  </div>
</div>
</div>
`;
        } else {
            productDiv.innerHTML = `
<div class="left">
<div class="p-name">${product["productName"]}</div>
</div>
<div class="right">
<div class="p-amount">${product["productQty"]}</div>
<div class="p-price green">${product["productPrice"]} TL</div>
<div class="p-change green-background">
  <div class="arrow-down"></div>
  <div class="right-container">
    <div class="change-amount">${
        product["productPrice"] - product["oldPrice"]
    }</div>
    <div class="change-amount-percentage">${(
        ((product["productPrice"] - product["oldPrice"]) /
            product["oldPrice"]) *
        100
    ).toFixed(1)}%</div>
  </div>
</div>
</div>
`;
        }

        productList.appendChild(productDiv);
    }

    if ((products.length / 2) % 1) {
        const lastDiv = document.createElement("div");
        lastDiv.className = "col";
        productList.appendChild(lastDiv);
    }
}
