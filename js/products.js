let productsData = [];

fetch("data/products.json")
.then(res => res.json())
.then(products => {

    productsData = products;

    createCategories();

    renderProducts();

});


function createCategories(){

    const categories =
        [...new Set(
            productsData.map(
                p => p.category
            )
        )];

    const filter =
        document.querySelector(
            ".category-filter"
        );

    categories.forEach(category => {

        filter.innerHTML += `

            <button
                class="category-btn"
                data-category="${category}">

                ${category}

            </button>

        `;

    });

    bindCategoryEvents();

}


function bindCategoryEvents(){

    document
    .querySelectorAll(".category-btn")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            document
            .querySelectorAll(".category-btn")
            .forEach(b => {

                b.classList.remove("active");

            });

            btn.classList.add("active");

            renderProducts();

        });

    });

}


document
.getElementById("searchInput")
?.addEventListener("input", () => {

    renderProducts();

});


document
.getElementById("sortSelect")
?.addEventListener("change", () => {

    renderProducts();

});


function renderProducts(){

    const keyword =
        document
        .getElementById("searchInput")
        ?.value
        .toLowerCase() || "";

    const category =
        document
        .querySelector(".category-btn.active")
        ?.dataset
        .category || "all";

    const sort =
        document
        .getElementById("sortSelect")
        ?.value || "popular";

    let data =
        [...productsData];


    // 검색

    data =
        data.filter(product =>

            product.title
            .toLowerCase()
            .includes(keyword)

        );


    // 카테고리

    if(category !== "all"){

        data =
            data.filter(
                p =>
                p.category === category
            );

    }


    // 정렬

    if(sort === "popular"){

        data.sort(
            (a,b) =>
            b.views - a.views
        );

    }

    else if(sort === "latest"){

        data.sort(
            (a,b) =>
            b.id - a.id
        );

    }

    else if(sort === "name"){

        data.sort(
            (a,b) =>
            a.title.localeCompare(
                b.title,
                "ko"
            )
        );

    }


    const list =
        document.getElementById(
            "productList"
        );

    list.innerHTML = "";


    data.forEach(product => {

        list.innerHTML += `

            <a
                href="product-view.html?id=${product.id}"
                class="board-row">

                <span>
                    ${product.title}
                </span>

                <span>
                    ${product.date}
                </span>

            </a>

        `;

    });

}