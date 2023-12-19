const productName = document.getElementById("Product name");
const productQuantity = document.getElementById("Product quantity");
const productPrice = document.getElementById("Product price");
const Addbutton = document.getElementById("button");
const tbody = document.getElementById("tbody");
console.log(tbody);

const readProductList = () => {
  try {
    let productList = JSON.parse(localStorage.getItem("productList")) || [];
    console.log(productList);

    productList.map((product, index) => {
      const productName = document.createElement("td");
      const productQuantity = document.createElement("td");
      const productPrice = document.createElement("td");
      const productSn = document.createElement("td");
      const tablrow = document.createElement("tr");

      productSn.classList.add("tblrow");
      productName.classList.add("tblrow");
      productQuantity.classList.add("tblrow");
      productPrice.classList.add("tblrow");

      const button = document.createElement("td");

      productName.innerText = product.name;
      productQuantity.innerText = product.quantity;
      productPrice.innerText = product.price;
      productSn.innerText = index + 1;
      // button.innerText = ;
      if( product.quantity<=6 ){
        button.innerText="low";
        button.classList.add("low")
      }else if( product.quantity>=6 && product.quantity<=12){
        button.innerText="running low"
        button.classList.add("runninglow")
      }else if( product.quantity>12){
        button.innerText="Ok"
        button.classList.add("Ok")
      }

// Unary  have one condition 
// Binary have two conditions they are boleans
// ternary have three 

      // ternary operator
      // button.innerText = product.quantity < 6 ? "Low" : product.quantity > 6 && product.quantity < 12 ? "running low" : "Ok";

      tablrow.appendChild(productSn);
      tablrow.appendChild(productName);
      tablrow.appendChild(productPrice);
      tablrow.appendChild(productQuantity);
      tablrow.appendChild(button);
      tbody.appendChild(tablrow);
    });
  } catch (error) {
    console.log(error);
  }
};
readProductList();
