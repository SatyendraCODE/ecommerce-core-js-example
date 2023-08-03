const product_container = document.getElementById("product-container");
const seachInpCon = document.getElementById("seachInpCon");
const dropdownMenuButton = document.getElementById("dropdownMenuButton1");
const sideBarEle = document.querySelector(".sidebar-container");
const checkBoxEle = document.getElementById("sortByCategory");
const featuredEle = document.getElementById("Featured");
const High_to_Low = document.getElementById("High_to_Low");
const Low_to_High = document.getElementById("Low_to_High");
const category_list_ele = document.getElementById("category-list");

let productListArraybyApiStart = [];
let productListArrayCurrent = [];
let productListElements = [];
let filterCurrent = "Featured";

(async () =>
  await fetch("https://647437717de100807b1a7c02.mockapi.io/product")
    .then((res) => res.json())
    .then((result) => {
      productListArraybyApiStart = result;
      productListArrayCurrent = productListArraybyApiStart;
      console.log(productListArraybyApiStart.length);
      const element = productListArraybyApiStart.map((e, i) => {
        return product(e);
      });
      productListElements = element.join("");
      product_container.innerHTML = productListElements;
      createSideBarList(result);
    }))();

featuredEle.addEventListener("click", (e) => {
  filterCurrent = e.target.innerText;
  handleSorting(filterCurrent);
});
High_to_Low.addEventListener("click", (e) => {
  filterCurrent = e.target.innerText;
  handleSorting(filterCurrent);
});
Low_to_High.addEventListener("click", (e) => {
  filterCurrent = e.target.innerText;
  handleSorting(filterCurrent);
});
checkBoxEle.addEventListener("click", (e) => {
  filterCurrent = e.target.id;
  handleSorting(filterCurrent);
});

const createSideBarList = (arrFromApi) => {
  const set1 = new Set();
  for (let ele of arrFromApi) {
    set1.add(ele.category);
  }
  let elements = "";
  set1.forEach((category) => {
    elements += `<div class="form-check">
    <input class="form-check-input" type="checkbox" id=${category} onclick="showCategory()"/>
    <label class="form-check-label" for=${category}>${category}</label>
  </div>`;
  });
  category_list_ele.innerHTML += elements;
};

function showCategory() {
  let showCateArray = [];
  let childs_Of_Category_list_ele = category_list_ele.children;
  for (const ele of childs_Of_Category_list_ele) {
    if (ele.firstElementChild.checked === true) {
      console.log("we get checked element: ", ele.firstElementChild.id);
      const newArr = productListArrayCurrent.filter((e) => {
        return e.category === ele.firstElementChild.id;
      });
      showCateArray.push(...newArr);
    }
  }

  if (showCateArray[0] === undefined) {
    handleSorting(filterCurrent);
  } else {
    handleSorting(filterCurrent, showCateArray, true);
  }
}

function handleSorting(
  text,
  arr = productListArrayCurrent,
  isCategoryCheck = false
) {
  const sortedArray = [...arr];
  dropdownMenuButton.innerHTML = text;

  // console.log("checkBox false called");

  // shorting by price and featured
  if (text === "Price:High to Low") {
    sortedArray.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    const element = sortedArray.map((e, i) => {
      return product(e);
    });
    product_container.innerHTML = element.join("");
    // if end
  } else if (text === "Price:Low to High") {
    sortedArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    const element = sortedArray.map((e, i) => {
      return product(e);
    });
    product_container.innerHTML = element.join("");
    // else if end
  } else if (text === "Featured") {
    if (isCategoryCheck) {
      const elem = sortedArray.map((e, i) => {
        return product(e);
      });
      product_container.innerHTML = elem.join("");
    } else {
      const elem = productListArrayCurrent.map((e, i) => {
        return product(e);
      });
      product_container.innerHTML = elem.join("");
      // console.log("else called");
    }
  } else if (text === "sortByCategory") {
    if (checkBoxEle.checked) {
      // console.log("if sss called");
      sortedArray.sort((a, b) => {
        if (a.category > b.category) return 1;
        else return -1;
      });
      const element = sortedArray.map((e, i) => {
        return product(e);
      });
      product_container.innerHTML = element.join("");
    } else {
      // console.log("else sss called");
      const elem = productListArrayCurrent.map((e, i) => {
        return product(e);
      });
      product_container.innerHTML = elem.join("");
    }
  }
}

function handleSearch(e) {
  let value = e.value.toString().toLowerCase();
  if (value != "") {
    const filteredList = productListArraybyApiStart.filter((ele, i) => {
      return ele.name.toLowerCase().includes(value);
    });
    productListArrayCurrent = filteredList;
    console.log(filteredList.length);
    console.log(productListArrayCurrent);
    handleSorting(filterCurrent, productListArrayCurrent);
    console.log(productListArrayCurrent);
    showCategory(e);
    console.log(productListArrayCurrent);
  } else {
    productListArrayCurrent = productListArraybyApiStart;
    console.log(productListArrayCurrent.length);

    handleSorting(filterCurrent, productListArrayCurrent);
    showCategory();
  }
}

function product(props) {
  const { name, image, price, slug, category, id } = props;
  return `
    <div class="product-item col-md-3 col-sm-4 col-6 p-2">
      <div class="proItems d-flex flex-column rounded bg-light shadow-sm border">
        <div class="p-0">
          <img
            class="img-fluid rounded"
            src=${image}
            alt="Incredible Soft Gloves"
          />
        </div>
        <div class="p-2 pt-1 h-100 position-relative">
            <div>
              <p class="fw-bold fs-xl-4 fs-5 title-pItem-lHeight">${name}</p>
            </div>
            <div>
              <p>${category}</p>
            </div>
            <div class="position-absolute" style="bottom: 0;">
              <p><span style="
              vertical-align: super;
          ">&#8377;</span><span class="fw-bold fs-4 ps-1">${price}</span></p>
            </div>
        </div>
      </div>
    </div>`;
}
