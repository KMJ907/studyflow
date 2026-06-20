const params =
    new URLSearchParams(
        window.location.search
    );

const noticeId =
    Number(
        params.get("id")
    );


fetch("data/notices.json")
.then(res => res.json())
.then(notices => {

    const notice =
        notices.find(
            n => n.id === noticeId
        );

    if(!notice){

        document.body.innerHTML = `

            <div
                style="
                    text-align:center;
                    padding:80px;
                ">

                <h1>
                    공지사항을 찾을 수 없습니다.
                </h1>

                <a
                    href="notice.html">

                    목록으로 돌아가기

                </a>

            </div>

        `;

        return;

    }


    document.title =
        notice.title +
        " | StudyFlow";


    document
        .getElementById("title")
        .textContent =
        notice.title;


    document
        .getElementById("date")
        .textContent =
        notice.date;


    document
        .getElementById("content")
        .innerHTML =
        notice.content;

})
.catch(error => {

    console.error(error);

});