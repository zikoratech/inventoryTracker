const salesName = document.getElementById("sales_name");
const salesSN = document.getElementById("sales_Sn");
const salesInput = document.getElementById("sales_input");
// const salesWd = document.getElementById("sales_wd");
const tbody = document.getElementById("tBody");
const cartTablebody = document.getElementById("cart_table_body");

const cart = [];

const readsalesList = () => {
  let productList = JSON.parse(localStorage.getItem("productList")) || [];
  console.log(productList);

  try {
    productList.map((product, index) => {
      if (product.quantity >= 1) {
        const salesSN = document.createElement("td");
        const salesName = document.createElement("td");
        const salesQuantity = document.createElement("td");
        const salesInput = document.createElement("input");
        // const salesWd = document.createElement("td")
        const addToCartTr = document.createElement("td");
        const addToCartBtn = document.createElement("Button");
        const tblrow = document.createElement("tr");

        addToCartBtn.innerText = "+ Cart";
        addToCartTr.appendChild(addToCartBtn);

        salesSN.innerText = index + 1;
        salesName.innerText = `${product.name}(${product.price})`;
        // salesName.innerText = product.name;
        // salesName.innerText = product.;
        salesQuantity.appendChild(salesInput);

        salesSN.classList.add("tbldata1");
        salesName.classList.add("tbldata1");
        salesQuantity.classList.add("tbldata1");
        salesInput.classList.add("sales-input");
        addToCartBtn.classList.add("addCartBtn");

        salesInput.setAttribute("max", product.quantity);
        salesInput.setAttribute("min", 0);
        salesInput.setAttribute("type", "number");
        let itemQuantity = 0;

        let productSale = {
          name: "",
          id: "",
          quantity: "",
          price: "",
        };
        salesInput.addEventListener("change", () => {
          // console.log(salesInput.value);
          itemQuantity = parseInt(salesInput.value);
          productSale = {
            name: product.name,
            id: product.id,
            quantity: salesInput.value,
            price: product.price,
          };

          // console.log(productSale);
        });

        tblrow.appendChild(salesSN);
        tblrow.appendChild(salesName);
        tblrow.appendChild(salesQuantity);
        tblrow.appendChild(addToCartTr);
        tbody.appendChild(tblrow);

        // const productSale={
        //     name:product.name,
        //     id:product.id,
        //     quantity:itemQuantity,
        // price:product.price
        // }

        addToCartBtn.addEventListener("click", () => addToCart(productSale));

        // window.location.reload();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

readsalesList();

function addToCart(productObj) {
  let cart = JSON.parse(localStorage.getItem("cartList")) || [];

  // check if the product exist in the cart
  const index = cart.findIndex((item) => item.id === productObj.id);
  // console.log("this is findIndex", indexfi)
  if (index !== -1) {
    const existingObj = cart[index];
    existingObj.quantity =
      parseInt(existingObj.quantity) + parseInt(productObj.quantity);
  } else {
    cart.push(productObj);
  }

  localStorage.setItem("cartList", JSON.stringify(cart));
  // reset the cartTableBody to an empty node, so as to avoid repetition
  cartTablebody.innerHTML = "";

  // create a dom element for the cart table
  cart.length
    ? cart.map((item, index) => {
        const itemName = document.createElement("td");
        const itemCost = document.createElement("td");
        const tblr = document.createElement("tr");

        itemName.innerText = `${item.name} × ${item.quantity}`;
        itemCost.innerText = item.price * item.quantity;

        tblr.appendChild(itemName);
        tblr.appendChild(itemCost);

        // cartTablebody.removeChild(tblr);
        cartTablebody.appendChild(tblr);
      })
    : "";

  updateCartTotal();
}
const totalH4 = document.getElementById("cart_total");

function updateCartTotal() {
  let cart = JSON.parse(localStorage.getItem("cartList")) || [];
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });
  totalH4.innerText = total;
  console.log(total);
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cartList")) || [];
  let productList = JSON.parse(localStorage.getItem("productList")) || [];
  // alert what is in the
  let message = "Items Purchase: \n";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - Quantity: ${
      item.quantity
    }, Cost: ${item.price * item.quantity}\n`;
  });

  alert(message);
  // subract from the product list
  cart.forEach((item) => {
    const product = productList.find((product) => product.id === item.id);

    if (product) {
      product.quantity -= item.quantity;
    }
  });

  localStorage.setItem("productList", JSON.stringify(productList));
  // empty the cart
  localStorage.removeItem('cartList');
  cartTablebody.innerHTML = "";
  totalH4.innerHTML="0.00"
}
