// // Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
// 'use strict';

// /*
// Description of the available api
// GET https://clear-fashion-api.vercel.app/
// Search for specific products
// This endpoint accepts the following optional query string parameters:
// - `page` - page of products to return
// - `size` - number of products to return
// GET https://clear-fashion-api.vercel.app/brands
// Search for available brands list
// */

// // current products on the page
// let currentProducts = [];
// let currentPagination = {};

// // instantiate the selectors
// const selectShow = document.querySelector('#show-select');
// const selectPage = document.querySelector('#page-select');
// const sectionProducts = document.querySelector('#products');
// const spanNbProducts = document.querySelector('#nbProducts');
// const spanNbBrands = document.querySelector('#nbBrands');
// const spanNbNewProducts = document.querySelector('#nbNew');
// const spanLastReleasedDate = document.querySelector('#LRD');
// const spanP50 = document.querySelector('#P50');
// const spanP90 = document.querySelector('#P90');
// const spanP95 = document.querySelector('#P95');
// const selectBrands = document.querySelector('#brand-select')
// const selectSort = document.querySelector('#sort-select')

// /*
// Fetching all brands : 
// */
// let AllBrands;

// const reponse = fetch('https://clear-fashion-jade.vercel.app/products/brands')
//   .then(res => res.json())
//   .then(data => {
//     AllBrands = data.data.result;
//   });

// /**
//  * Set global value
//  * @param {Array} result - products to display
//  * @param {Object} meta - pagination meta info
//  */
// const setCurrentProducts = ({result, meta}) => {
//   currentProducts = result;
//   currentPagination = meta;

//   renderBrands(AllBrands);
// };

// /**
//  * Fetch products from api
//  * @param  {Number}  [page=1] - current page to fetch
//  * @param  {Number}  [size=222] - size of the page
//  * @return {Object}
//  */
// const fetchProducts = async (page = 1, size = 222) => {
//   try {
//     const response = await fetch(
//       `https://clear-fashion-jade.vercel.app/products/?page=${page}&size=${size}`
//     );
//     const body = await response.json();

//     if (body.success !== true) {
//       console.error(body);
//       return {currentProducts, currentPagination};
//     }
    
//     return body.data;
//   } catch (error) {
//     console.error(error);
//     return {currentProducts, currentPagination};
//   }
// };

// /*
// fetch('https://clear-fashion-api.vercel.app/api/brands')
//   .then(response => response.json())
//   .then(data => Brands.brands=data);
// */

// /**
//  * Render list of products
//  * @param  {Array} products
//  */
// const renderProducts = (products) => {
//   if(selectSort.value=="price-asc")
//   {
//     const sortedProducts = products.sort((a, b) => a.price - b.price); // sort products by price
//     const productHtml = sortedProducts.map(product => {
//       return `<div class="product">
//                 <img src="${product.image}" alt="${product.name}" />
//                 <div class="product-info">
//                   <h3>${product.title}</h3>
//                   <h4>${product.brand_name}</h4>
//                   <p>${product.released}</p>
//                   <p class="product-price">$${product.price.toFixed(2)}</p><br>
//                 </div>
//               </div>`;
//     }).join('');
//     sectionProducts.innerHTML = '<h2>Products</h2><br>';
//     sectionProducts.innerHTML += productHtml;
//   }
//   if(selectSort.value=="price-desc")
//   {
//     const sortedProducts = products.sort((a, b) => b.price - a.price); // sort products by price, in descending order
//     const productHtml = sortedProducts.map(product => {
//       return `<div class="product">
//                 <img src="${product.image}" alt="${product.name}" />
//                 <div class="product-info">
//                   <h3>${product.title}</h3>
//                   <h4>${product.brand_name}</h4>
//                   <p>${product.released}</p>
//                   <p class="product-price">$${product.price.toFixed(2)}</p><br>
//                 </div>
//               </div>`;
//     }).join('');
//     sectionProducts.innerHTML = '<h2>Products</h2><br>';
//     sectionProducts.innerHTML += productHtml;
//   }
//   if(selectSort.value=="date-asc")
//   {
//     const sortedProducts = products.sort((a, b) => {
//       const releaseDateA = new Date(a.released);
//       const releaseDateB = new Date(b.released);
//       return releaseDateB - releaseDateA;
//     }); // sort products by release date
//     const productHtml = sortedProducts.map(product => {
//       return `<div class="product">
//                 <img src="${product.img}" alt="${product.title}" />
//                 <div class="product-info">
//                   <h3>${product.title}</h3>
//                   <h4>${product.brand_name}</h4>
//                   <p>${product.released}</p>
//                   <p class="product-price">$${product.price.toFixed(2)}</p><br>
//                 </div>
//               </div>`;
//     }).join('');
//     sectionProducts.innerHTML = '<h2>Products</h2><br>';
//     sectionProducts.innerHTML += productHtml;
//   }
//   if(selectSort.value=="date-desc")
//   {
//     const sortedProducts = products.sort((a, b) => {
//       const releaseDateA = new Date(a.released);
//       const releaseDateB = new Date(b.released);
//       return releaseDateA - releaseDateB;
//     }); // sort products by release date
//     const productHtml = sortedProducts.map(product => {
//       return `<div class="product">
//                 <img src="${product.img}" alt="${product.title}" />
//                 <div class="product-info">
//                   <h3>${product.title}</h3>
//                   <h4>${product.brand_name}</h4>
//                   <p>${product.released}</p>
//                   <p class="product-price">$${product.price.toFixed(2)}</p><br>
//                 </div>
//               </div>`;
//     }).join('');
//     sectionProducts.innerHTML = '<h2>Products</h2><br>';
//     sectionProducts.innerHTML += productHtml;
//   }
// };

// /**
//  * Render page selector
//  * @param  {Object} pagination
//  */
// const renderPagination = pagination => 
// {
//   const {currentPage, pageCount} = pagination;
//   const options = Array.from(
//     {'length': pageCount},
//     (value, index) => `<option value="${index + 1}">${index + 1}</option>`
//   ).join('');

//   selectPage.innerHTML = options;
//   selectPage.selectedIndex = currentPage - 1;
// };

// /**
//  * Render list of brands
// */
// const renderBrands = brands => 
// {
//   const options = AllBrands.map(brand => {
//     return `
//       <option value="${brand}">${brand}</option>
//     `;  
//   }).join('');

//   selectBrands.innerHTML = '<option value="all">All brands</option>' + options;

// };

// /**
//  * Render indicators
//  * @param  {Object} pagination
//  * @param  {Array} products
//  */
// const renderIndicators = (pagination, products) => 
// {
//   const { count } = pagination;
//   const brands = new Set(products.map((product) => product.brand));
//   const newProducts = products.filter((product) => {
//     const releaseDate = new Date(product.released);
//     const now = new Date();
//     const diffTime = Math.abs(now - releaseDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays <= 1; // consider a product new if it was released within the last 30 days
//   });
//   const latestProduct = products.reduce((latest, product) => {
//     if (!latest) {
//       return product;
//     }
//     const latestReleaseDate = new Date(latest.released);
//     const productReleaseDate = new Date(product.released);
//     return productReleaseDate > latestReleaseDate ? product : latest;
//   }, null);
//   const lastReleasedDate = latestProduct ? new Date(latestProduct.released).toLocaleDateString() : "N/A";

//   const sortedPrices = products.map((product) => product.price).sort((a, b) => a - b);
//   const P50 = sortedPrices[Math.floor(sortedPrices.length * 0.5)];
//   const P90 = sortedPrices[Math.floor(sortedPrices.length * 0.9)];
//   const P95 = sortedPrices[Math.floor(sortedPrices.length * 0.95)];

//   spanNbProducts.innerHTML = count;
//   spanNbBrands.innerHTML = brands.size;
//   spanNbNewProducts.innerHTML = newProducts.length;
//   spanLastReleasedDate.innerHTML = lastReleasedDate;
//   spanP50.innerHTML = P50;
//   spanP90.innerHTML = P90;
//   spanP95.innerHTML = P95;
// };

// const render = (products, pagination) => 
// {
//   renderProducts(products);
//   renderPagination(pagination);
//   renderIndicators(pagination,products);
// };

// /**
//  * Declaration of all Listeners
//  */

// /**
//  * Select the number of products to display
//  */
// selectShow.addEventListener('change', async (event) => {
//   const products = await fetchProducts(selectPage.value, selectShow.value);

//   setCurrentProducts(products);
//   render(currentProducts, currentPagination);
// });

// selectPage.addEventListener('change', async (event) => {
//   const products = await fetchProducts(selectPage.value, selectShow.value);

//   setCurrentProducts(products);
//   render(currentProducts, currentPagination);
// });

// selectBrands.addEventListener('change', async (event) => {
//   const brand = selectBrands.value;
//   let products;

//   if (brand === 'all') 
//   {
//     products = await fetchProducts(`https://clear-fashion-jade.vercel.app/products/`);
//   } 
//   else 
//   {
//   products = await fetch(`https://clear-fashion-jade.vercel.app/products/?brand=${brand}`)
//     .then(response => response.json())
//     .then(data => data.data);
//   }

//   setCurrentProducts(products);
//   render(currentProducts, currentPagination);
// });

// selectSort.addEventListener('change', async (event) => {
//   const products = await fetchProducts(selectPage.value, selectShow.value);
  
//   setCurrentProducts(products);
//   render(currentProducts, currentPagination);
// });

// document.addEventListener('DOMContentLoaded', async () => {
//   const products = await fetchProducts();

//   setCurrentProducts(products);
//   render(currentProducts, currentPagination);
// });

const API_URL = "https://clear-fashion-jade.vercel.app";
const productList = document.querySelector(".product-list");
const brandFilter = document.getElementById("brand-filter");
const sortByPrice = document.getElementById("sort-by-price");

async function fetchBrands() {
    const response = await fetch(`${API_URL}/brands`);
    const brands = await response.json();
    brands.forEach(brand => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

async function fetchProducts(brand, sort) {
    const url = new URL(`${API_URL}/products`);
    if (brand) url.searchParams.append("brand", brand);
    if (sort) url.searchParams.append("sort", sort);

    const response = await fetch(url);
    const products = await response.json();

    productList.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.img}" alt="${product.title}">
            <p>Brand: ${product.brand_name}</p>
            <p>Price: ${product.price}</p>`;
productList.appendChild(productCard);
});

}


function handleFilterChange() {
const brand = brandFilter.value;
const sort = sortByPrice.value;
fetchProducts(brand, sort);
}

brandFilter.addEventListener("change", handleFilterChange);
sortByPrice.addEventListener("change", handleFilterChange);

fetchBrands();
fetchProducts();


