const productName = document.getElementById("product-name");
const productQuantity = document.getElementById("quantity");
const productPrice = document.getElementById("price");
const Addbutton = document.getElementById("button");
const updateButton = document.getElementById("update_btn");
const tbody = document.getElementById("tBody");
console.log(tbody);

let generalProductList = [];

const readProductList = () => {
  try {
    let productList = JSON.parse(localStorage.getItem("productList")) || [];
    generalProductList = productList;
    console.log(productList);

    productList.map((product, index) => {
      const productName = document.createElement("td");
      const productQuantity = document.createElement("td");
      const productPrice = document.createElement("td");
      const productSn = document.createElement("td");
      const productAction = document.createElement("td");
      const productActionEdit = document.createElement("span");
      const productActionDelete = document.createElement("span");
      const tblrow = document.createElement("tr");

      productSn.classList.add("tblrow");
      productName.classList.add("tblrow");
      productQuantity.classList.add("tblrow");
      productPrice.classList.add("tblrow");

      productName.innerText = product.name;
      productQuantity.innerText = product.quantity;
      productPrice.innerText = product.price;
      productSn.innerText = index + 1;
      productActionEdit.innerText = "Edit";
      productActionDelete.innerText = "Delete";

      productActionEdit.classList.add("edit");
      productActionDelete.classList.add("delete");
      productAction.appendChild(productActionEdit);
      productAction.appendChild(productActionDelete);

      productActionEdit.addEventListener("click", () =>
        editFunction(product.id)
      );
      productActionDelete.addEventListener("click", () =>
        deleteFunction(product.id)
      );

      tblrow.appendChild(productSn);
      tblrow.appendChild(productName);
      tblrow.appendChild(productPrice);
      tblrow.appendChild(productQuantity);
      tblrow.appendChild(productAction);
      tbody.appendChild(tblrow);
    });
  } catch (error) {
    console.log(error);
  }
};
readProductList();

Addbutton.addEventListener("click", () => {
  // alert(productName.value)
  // alert(productQuantity.value)
  // alert(productPrice.value)

  const productListobject = {
    id: crypto.randomUUID(),
    name: productName.value,
    quantity: productQuantity.value,
    price: productPrice.value,
  };

  try {
    let productList = JSON.parse(localStorage.getItem("productList")) || [];

    if (
      productList.find(
        (product) =>
          product.name.toLowerCase() === productListobject.name.toLowerCase()
      )
    ) {
      alert("product already exist");
    } else {
      console.log(productList);
      productList.push(productListobject);
      localStorage.setItem("productList", JSON.stringify(productList));
      window.location.reload();
      // readProductList();
    }
  } catch {
    err;
  }
  {
    console.log(error);
  }
});

function editFunction(EditId) {
  // console.log("edit id", id);
  // console.log(generalProductList);
  // get the product we want to edit
  const editProduct = generalProductList.find((product) => (product.id === EditId));
  // console.log("this is the product we want to edit", editProduct);

  // populate the input method with the value of the product
  if (editProduct) {
    productName.value = editProduct.name;
    productQuantity.value = editProduct.quantity;
    productPrice.value = editProduct.price;

    // we toggle the between add button and the update button.
    Addbutton.style.display = "none";
    updateButton.style.display = "block";

    updateButton.addEventListener("click", ()=>{
      editProduct.name= productName.value 
      editProduct.quantity= productQuantity.value 
      editProduct.price= productPrice.value 

      // console.log("after edit",editProduct);
      // console.log("after edit",generalProductList);

      localStorage.setItem("productList", JSON.stringify(generalProductList));
      window.location.reload();
      
    })
  }
}
function deleteFunction(delId) {
  console.log("delete id", delId);
  
  const deleteProduct = generalProductList.filter((product)=> product.id !== delId);
  console.log(deleteProduct);
  localStorage.setItem("productList", JSON.stringify(deleteProduct));
  window.location.reload();
}
