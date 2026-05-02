 /*
 
 document.addEventListener("DOMContentLoaded", () => {
     const placeholders = [
    "Search Lipsticks",
    "Search Blush",
    "Search Eyeshadows",
    "Search skincare"
  ];

  let i = 0;
  const input = document.getElementById("searchBox");

  setInterval(() => {
    i = (i + 1) % placeholders.length;
    input.placeholder = placeholders[i];
  }, 2000);
}

*/



//Search
document.addEventListener('DOMContentLoaded', () => {
    // 1. Select the search input and all cards
    // Using a more specific selector for the search input
    const searchInput = document.querySelector('header input[type="text"]');
    // We target the cards based on the classes you used in your HTML
    const productCards = document.querySelectorAll('.grid > div.group');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            productCards.forEach(card => {
                // Find the h3 (the product name) inside the card
                const nameElement = card.querySelector('h3');
                
                if (nameElement) {
                    const name = nameElement.innerText.toLowerCase();
                    
                    if (name.includes(query)) {
                        // Restore visibility
                        card.style.display = 'flex';
                        // Optional: trigger your AOS animation again
                        card.classList.add('aos-animate'); 
                    } else {
                        // Hide from grid
                        card.style.display = 'none';
                    }
                }
            });

            // Handling "No Results" (Optional but recommended)
            checkResults(productCards);
        });
    }

    function checkResults(cards) {
        const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
        // You could append a "No products found" message to the grid here
        console.log(`Visible products: ${visibleCards.length}`);
    }
});



//Image banner slider
let index = 0;

const carousel = document.getElementById("carousel");
const slides = carousel.children;
const totalSlides = slides.length;

document.getElementById("nextBtn").addEventListener("click", () => {
  index = (index + 1) % totalSlides;
  updateSlide();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlide();
});

function updateSlide() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}



//Nav BAr
const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    });



//flower
  // Script to trigger the "Anchoring" effect one by one
  document.addEventListener("DOMContentLoaded", () => {
    const lines = document.querySelectorAll('.animate-line');
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        lines.forEach((line, index) => {
          setTimeout(() => {
            // "Anchor" the line by resetting opacity and translation
            line.classList.remove('opacity-0', 'translate-y-10');
            line.classList.add('opacity-100', 'translate-y-0');
          }, index * 300); // 300ms delay between each line
        });
      }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('#text-container'));
  });






// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
function addToCart(product) {
    // 1. Get existing cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        // If it exists, increase quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If new, add product with quantity 1
        product.quantity = 1;
        cart.push(product);
    }

    // 3. Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optional: Alert the user or redirect immediately
    console.log('Product added to cart:', product.name);
}


//Display Cart Items
function loadCart() {
    // Pull the data string and convert it back into a JavaScript array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items-container');

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    // Loop through the items and generate the HTML
    container.innerHTML = cart.map(item => `
        <div class="flex justify-between border-b py-4">
            <img src="${item.image}" class="w-20 h-20">
            <div>
                <h3 class="font-bold">${item.name}</h3>
                <p>₹${item.price}</p>
            </div>
            <p>Quantity: ${item.quantity}</p>
        </div>
    `).join('');
}

// Call this when the page opens
window.onload = loadCart;

//filter
document.addEventListener('DOMContentLoaded', () => {
    const brandFilters = document.querySelectorAll('.brand-filter');
    // Select all divs that have the 'data-brand' attribute
    const productCards = document.querySelectorAll('[data-brand]');

    function applyFilters() {
        // 1. Get an array of all checked brand values
        const checkedBrands = Array.from(brandFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        productCards.forEach(card => {
            const cardBrand = card.getAttribute('data-brand');

            // 2. Logic: Show if nothing is checked OR if brand matches
            if (checkedBrands.length === 0 || checkedBrands.includes(cardBrand)) {
                card.style.display = 'flex';
                // Trigger AOS again so it looks smooth when items reappear
                card.classList.add('aos-animate');
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Attach event listeners to all checkboxes
    brandFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
});