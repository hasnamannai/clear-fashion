// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

/*
Description of the available api
GET https://clear-fashion-api.vercel.app/

Search for specific products

This endpoint accepts the following optional query string parameters:

- `page` - page of products to return
- `size` - number of products to return

GET https://clear-fashion-api.vercel.app/brands

Search for available brands list
*/

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
/*
// for the number 2
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};
*/
//feature2 :browse products by brands, feature 0 and 1 also
/* 
const fetchProducts = async (page = 1, size = 12, brand = null) => {
  try {
    let url = `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`;
    if (brand) {
      url += `&brand=${brand}`;
    }

    const response = await fetch(url);
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
*/
// feature 3: browse product by brand and recent product 

const fetchProducts = async (page = 1, size = 12, brand = null, startDate = null, endDate = null) => {
  try {
    let url = `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`;
    if (brand) {
      url += `&brand=${brand}`;
    }
    if (startDate && endDate) {
      url += `&start_date=${startDate}&end_date=${endDate}`;
    }

    const response = await fetch(url);
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};



/**
 * 
 * 
 * Render list of products
 * @param  {Array} products
 */
/* old one 
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};
*/
/* // filtering by brand

const renderProducts = (products, brand = null) => {
  const filteredProducts = brand ? products.filter(product => product.brand === brand) : products;
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = filteredProducts
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};
// filtering by date (less than two weeks)

const renderProducts = (products, brand = null, startDate = null, endDate = null) => {
  let filteredProducts = products;
  if (brand) {
    filteredProducts = products.filter(product => product.brand === brand);
  }
  if (startDate && endDate) {
    filteredProducts = filteredProducts.filter(product => {
      const releaseDate = new Date(product.releaseDate);
      return releaseDate >= startDate && releaseDate <= endDate;
    });
  }

  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = filteredProducts
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};
*/
//feauture 4: to filter by price and by brand and reasonable price 
/*
const renderProducts = (products, brand = null, maxPrice = null) => {
  let filteredProducts = products;
  if (brand) {
    filteredProducts = products.filter(product => product.brand === brand);
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
  }

  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = filteredProducts
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};
*/
// feature 5: Sort by price
const renderProducts = (products, brand = null, sort = null) => {
  let filteredProducts = brand ? products.filter(product => product.brand === brand) : products;
  
  if (sort) {
    switch (sort) {
      case "price-asc":
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "date-asc":
        filteredProducts = filteredProducts.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        break;
      case "date-desc":
        filteredProducts = filteredProducts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
    }
  }

  // rest of the code to render the products remains unchanged
};







/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};


/**
 * Render page selector
 * @param 



/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
/*
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});
*/
selectShow.addEventListener('change', async (event) => {
  const size = parseInt(event.target.value);
  const products = await fetchProducts(currentPagination.currentPage, size);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
  const size = parseInt(selectShow.value);
  const products = await fetchProducts(undefined, size);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});
/*
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});
*/
selectPage.addEventListener('change', async (event) => {
  const products = await fetchProducts(parseInt(event.target.value), currentPagination.size);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

//to select by brand
const selectBrand = document.querySelector('#brand-select');

selectBrand.addEventListener('change', async () => {
  const selectedBrand = selectBrand.value;

  const {result, meta} = await fetchProducts(1, 12, selectedBrand);
  setCurrentProducts({result, meta});
  render(result, meta);
});