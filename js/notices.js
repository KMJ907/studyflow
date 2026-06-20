fetch("data/notices.json")
.then(res => res.json())
.then(notices => {

    const noticeList =
        document.getElementById(
            "noticeList"
        );

    noticeList.innerHTML = "";

    notices
        .sort((a,b) => b.id - a.id)
        .forEach(notice => {

            noticeList.innerHTML += `

                <a
                    href="notice-view.html?id=${notice.id}"
                    class="board-row">

                    <span>
                        ${notice.title}
                    </span>

                    <span>
                        ${notice.date}
                    </span>

                </a>

            `;

        });

})
.catch(error => {

    console.error(error);

});