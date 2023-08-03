const product_container = document.getElementById("product-container");

(async () =>
  await fetch("https://647437717de100807b1a7c02.mockapi.io/product")
    .then((res) => res.json())
    .then((result) => {
      //   console.log(result[0]);
      result.map((e, i) => {
        const data = product_container.appendChild(createElements(e));
        return data;
      });
      //   createElements(result[0]);
    }))();
// console.log(product_container);

function createElements({ name, image, price, slug, category, id }) {
  // ************visulaization of code in html*****************
  // productItem =  <div class="product-item">
  //         imageEle = <img class="" src=image alt=name>
  //         childDiv = <div>
  //                         titleDiv = <div><p>name</p></div>
  //                         categoryDiv = <div><p>category</p></div>
  //                         priceDiv = <div><p>price</p></div>
  //                    </div>
  //                </div>

  const productItem = document.createElement("div");
  productItem.classList.add("col-6", "product-item");
  const rowProductItem = document.createElement("div");
  rowProductItem.classList.add(
    "row",
    "rounded",
    "bg-light",
    "shadow-sm",
    "border",
    "ms-1",
    "mb-2"
  );
  productItem.appendChild(rowProductItem);

  const colFirstProductItem = document.createElement("div");
  colFirstProductItem.classList.add("col-6");
  const colSecondProductItem = document.createElement("div");
  colSecondProductItem.classList.add("col-6");

  rowProductItem.appendChild(colFirstProductItem);
  rowProductItem.appendChild(colSecondProductItem);

  const imageEle = document.createElement("img");
  imageEle.classList.add("img-fluid", "m-2", "ms-0", "rounded");
  imageEle.src = image;
  imageEle.alt = name;

  const childDiv = document.createElement("div");
  childDiv.classList.add("m-2");

  colFirstProductItem.appendChild(imageEle);
  colSecondProductItem.appendChild(childDiv);

  const titleDiv = document.createElement("div");
  const pTitle = document.createElement("p");
  pTitle.innerHTML = name;
  //   pTitle.classList.add("");
  titleDiv.appendChild(pTitle);
  childDiv.appendChild(titleDiv);

  const categoryDiv = document.createElement("div");
  const pCategory = document.createElement("p");
  pCategory.innerHTML = category;
  //   pCategory.classList.add("");
  categoryDiv.appendChild(pCategory);
  childDiv.appendChild(categoryDiv);

  const priceDiv = document.createElement("div");
  const pPrice = document.createElement("p");
  pPrice.innerHTML = price;
  //   pPrice.classList.add("");
  priceDiv.appendChild(pPrice);
  childDiv.appendChild(priceDiv);

  //   console.log(productItem);
  return productItem;
  // productItem have two child : image, div
}
