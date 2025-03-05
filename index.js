

function addProduct(){
    let product = makeProductObject();
    
    let productArray = JSON.parse(localStorage.getItem("productArray"));
    if (productArray === null){
        productArray = [];
    }
    productArray.push(product);
    localStorage.setItem("productArray", JSON.stringify(productArray));

    loadTable();
}

function makeProductObject(){
    const inputProductName = document.getElementById('inputProductName').value;
    const inputPrice = document.getElementById('inputPrice').value;
    const selectedCategory = document.getElementById('selectedCategory').value;
    const imageLink = document.getElementById(`inputPictureLink`).value;

    if (inputPrice === isNaN) return;
    // if (typeof(inputProductName) !== String) return;
    if (selectedCategory === "select a product category"){
        alert("You must select a category.");
        return;
    }

    let currentProductObj = { 
        name: inputProductName,
        price: inputPrice,
        Category: selectedCategory,
        image: imageLink
    }
    return currentProductObj;
}

function loadTable() {
    clearTable();
    const productArray = JSON.parse(localStorage.getItem(`productArray`));
    const firstElement = productArray[0];
    const fields = Object.keys(firstElement);
    const theadTr = document.getElementById("table-cart-headers")
    if (theadTr) {
        for (let index = 0; index < fields.length; index++) {
            const th = document.createElement("th")
            th.innerText = fields[index].replaceAll("_", " ")
            theadTr.append(th)
        }
        theadTr.append(getTD("Actions", "", "th"))
    }
    const tBody = document.getElementById("table-cart-body")
    if (tBody) {
        for (let index = 0; index < productArray.length; index++) {
            const currentProduct = productArray[index];
            const tr = document.createElement("tr");
            tr.id = `${currentProduct.Name.replaceAll(" ", "-")}-${index}`
            for (let index = 0; index < fields.length; index++) {
                const currentField = fields[index];
                tr.append(getTD(currentProduct[currentField], "-"))
            }

        }
    }


}
function clearTable() {
    document.getElementById("table-cart-headers").innerHTML = "";
}
