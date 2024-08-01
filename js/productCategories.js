const category = document.querySelector(".main__category-items");

// const fetchCategories = async () => {
//   const response = await fetch("../data-list/products.json");
//   const data = await response.json();
//   renderCategories(data.categories);
//   renderProducts(data.products);
// };

const renderCategories = (categories) => {
  categories.map((_category) => {
    category.innerHTML += `
      <article>
        <img src="${_category.src}" alt="${_category.alt}" />
        <span>${_category.title}</span>
      </article>
      `;
  });
};

// window.addEventListener("DOMContentLoaded", () => {
//   fetchCategories();
// });
