// =========================
// 최신 공지사항
// =========================

fetch("data/notices.json")
.then(res => res.json())
.then(notices => {

    const container =
        document.getElementById("latestNotices");

    if (!container) return;

    notices
        .sort((a, b) => b.id - a.id)
        .slice(0, 5)
        .forEach(notice => {

            container.innerHTML += `
                <a
                    href="notice-view.html?id=${notice.id}"
                    class="board-row">

                    <span>${notice.title}</span>
                    <span>${notice.date}</span>

                </a>
            `;

        });

})
.catch(error => {

    console.error(error);

});


// =========================
// 자료 관련
// =========================

fetch("data/products.json")
.then(res => res.json())
.then(products => {

    const popularBox =
        document.getElementById("popularProducts");

    const featuredBox =
        document.getElementById("featuredProduct");


    // =========================
    // 오늘의 추천 자료
    // 평점 4.0 이상 자료 중
    // 날짜 기반 추천
    // =========================

    const recommendedProducts =
        products.filter(product =>
            Number(product.rating) >= 4.0
        );

    if (
        recommendedProducts.length > 0 &&
        featuredBox
    ) {

        const today = new Date();

        const seed = Number(
            `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`
        );

        const featured =
            recommendedProducts[
                seed % recommendedProducts.length
            ];

        featuredBox.innerHTML = `

            <a
                href="product-view.html?id=${featured.id}"
                class="board-row">

                <span>
                    📌 ${featured.title}
                </span>

                <span>
                    ⭐ ${featured.rating}
                    (${featured.ratingCount}명)
                </span>

            </a>

        `;

    }

    else if (featuredBox) {

        featuredBox.innerHTML = `

            <div class="empty-state">

                <h3>
                    추천 자료가 없습니다.
                </h3>

                <p>
                    평점 4.0 이상의 자료가 등록되면 표시됩니다.
                </p>

            </div>

        `;

    }


    // =========================
    // 인기 자료 TOP 5
    // =========================

    if (popularBox) {

        products
            .slice()
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)
            .forEach(product => {

                popularBox.innerHTML += `

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

})
.catch(error => {

    console.error(error);

});