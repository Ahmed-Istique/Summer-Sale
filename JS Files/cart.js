let cartItems = [];
// with "let" a new variable(to store a list of items in a shopping cart) declaring named "cartItems" and initialize it with an empty array. An array is a data structure that can hold multiple values, which are referred to as elements.
let totalAmount = 0;
let discount = 0;

// calling the different variable with their Html Id name 
function updateCart() {
    const cartList = document.getElementById('Product-cart-list');
    const totalPrice = document.getElementById('total-price');
    const applyCouponBtn = document.getElementById('apply-coupon');
    const couponInput = document.getElementById('coupon-input');
    const totalDiscount = document.getElementById('discount');
    const finalTotal = document.getElementById('final-total-TK');
    // Step 1: Steiing the total amount
    // to clear the contents of an HTML element with the id 'cartList' and reset the value of a variable named totalAmount to zero.
    // 1. cartList.innerHTML = "" ; The innerHTML property for manipulating the HTML content of an element.
    // 2. totalAmount = 0;  resetting the total amount to zero, likely in the context of a shopping cart or some kind of accumulator that keeps track of the total cost.
    cartList.innerHTML = "";
    totalAmount = 0;

    // "cartItems" has properties like name and price.
    // forEach is doing, iterates through each element of the array and executes a specified function for each element.
    // (item, index) => { ... } || array fucntion, taking two parameters, item(element from the cartItems array) and index(index of that element in the array) from cartItems. 
    // recall fucntion: Callbacks are a way to handle asynchronous operations and ensure that certain code runs only after a specific task is finished.
    cartItems.forEach((item, index) => {
        cartList.innerHTML += `<li>${index + 1}. ${item.name}</li>`;
        // += means, total will be incuded sum
        // index + 1 = new list item is generated using a template literal. It includes the index + 1 (to display a human-readable index starting from 1)
        // template literal[embaded calculation(variables) in more readable and convenient way, Template literals are enclosed by backticks '( )' ] .
        // the item.name (presumably the name of the item).
        totalAmount += item.price;
        // calculating the total cost of all items in the cart
    });

    totalPrice.textContent = `${totalAmount.toFixed(2)} TK`;

    // Step 2: setting discount on the total price
    if (totalAmount >= 200 && discount === 0) {
        // combines two conditions (totalAmount and discount)
        //for both [discount and  totalAmount >= 200] if the left-hand operand (totalAmount) is greater than or equal to the right-hand operand (200), than "if the left-hand operand (totalAmount) is greater than or equal to the right-hand operand (200), and false otherwise." and otherwise false .
        //  note: we know, totalAmount >= 200 than there will be 20% discount. So, if this logic [totalAmount >= 200 && discount === 0] false we will get no disable, if true we will get disable button

        applyCouponBtn.disabled = false;
        couponInput.disabled = false;
        // I took disable ad order, so if true than disable. 
    } else {
        applyCouponBtn.disabled = true;
        couponInput.disabled = true;
    }

    updateTotal();
//  now we get a new update(value) as updateTotal
}
// Step 3: calculating the discount amount
function updateTotal() {
    const discountedTotal = totalAmount - discount;

    const totalDiscount = document.getElementById('discount');
    const finalTotal = document.getElementById('final-total-TK');

    totalDiscount.textContent = `${discount.toFixed(2)} TK`;
    finalTotal.textContent = `${discountedTotal.toFixed(2)} TK`;
// Step: 4 Make purchase logic building
    const makePurchaseBtn = document.getElementById('make-purchase');
    if (totalAmount > 0) {
        makePurchaseBtn.removeAttribute('disabled');
    } 
}
// Step 5: Show modal
function showModal() {
    const myModal = document.getElementById('my_modal_5');
    myModal.showModal();
}
// Step 6: following the step 1 
function addToCart(name, price) {
    cartItems.push({ name, price });
    updateCart();
}

document.addEventListener('DOMContentLoaded', () => {
    // Using DOMContentLoaded ( referred to as an event handler or a callback function) can help ensure that your JavaScript code interacts with the DOM in a predictable and reliable manner. It's often used to initiate scripts, set up event listeners, modify content, or perform other actions that require access to the fully loaded DOM structure.
    // JavaScript code interacts with the DOM in a predictable and reliable manner.
    // as we user can click card randomly, it is important that JavaScript code doesn't run before the entire HTML document is available for manipulation.
    const productCards = document.querySelectorAll('.card');
    // I used "querySelectorAll" to select all elements from the DOM that match a given CSS selector(here class "card"). and stores them in the productCards constant variable.
 

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            // in recall fucntion, () => { /* Code to be executed */ } is an "arrow function", serves as the second argument to addEventListener. It will will be executed when the click event occurs.
            const productName = card.querySelector('.font-bold').textContent;
            const productPriceText = card.querySelector('.text-stone-400').textContent;
            const productPrice = parseFloat(productPriceText);

            addToCart(productName, productPrice);
        });
    });

    const applyCouponBtn = document.getElementById('apply-coupon');
    const couponInput = document.getElementById('coupon-input');
// Step 8: If total price =>200 TK and place discount couple name and get discount by 20% = 0.2 , logic building for it WebGLUniformLocation..
    applyCouponBtn.addEventListener('click', () => {
        const couponCode = couponInput.value;
        if (couponCode === 'SELL200' && totalAmount >= 200) {
            discount = totalAmount * 0.2;
            updateCart();[]
        }
    });

    const makePurchaseBtn = document.getElementById('make-purchase');
    makePurchaseBtn.addEventListener('click', () => {
        showModal();
    });

    const goHomeBtn = document.getElementById('go-home');
    goHomeBtn.addEventListener('click', () => {
        const myModal = document.getElementById('my_modal_5');
        const couponInput = document.getElementById('coupon-input');

        cartItems = [];
        totalAmount = 0;
        discount = 0;
        couponInput.value = '';
        updateCart();

        myModal.close();
    });
});