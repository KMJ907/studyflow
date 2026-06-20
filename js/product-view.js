const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    Number(
        params.get("id")
    );


fetch("data/products.json")
.then(res => res.json())
.then(products => {

    const product =
        products.find(
            p => p.id === productId
        );

    if(!product){

        document.body.innerHTML =
            "<h1>자료를 찾을 수 없습니다.</h1>";

        return;
    }

    document.title =
        product.title +
        " | StudyFlow";


    document
    .getElementById("title")
    .textContent =
        product.title;

    document
    .getElementById("date")
    .textContent =
        product.date;

    document
    .getElementById("category")
    .textContent =
        product.category;

    document
    .getElementById("rating")
    .textContent =
        product.rating;

    document
    .getElementById("ratingCount")
    .textContent =
        product.ratingCount;

    document
    .getElementById("downloads")
    .textContent =
        product.downloads;

    document
    .getElementById("thumbnail")
    .src =
        product.thumbnail;

    document
    .getElementById("content")
    .innerHTML =
        product.content;

    document
    .getElementById("applyBtn")
    .href =
        product.formUrl;


    const tagBox =
        document
        .getElementById("tags");

    if(product.tags){

        product.tags.forEach(tag => {

            tagBox.innerHTML += `

                <span class="tag">

                    #${tag}

                </span>

            `;

        });

    }

});