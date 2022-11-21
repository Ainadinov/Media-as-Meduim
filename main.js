const article = `<div class="news__list">

    <div class="news">
        <div class="news__top">
            <div class="author__info">
                <img src="img/author.png" alt="#">
                <p class="author__text"> <span>in</span> <span class="author__topic"></span> · <span class="author__date"> </span> </p>
            </div>
            <div class="author__title"></div>
            <p class="author__content"></div>
        <div class="news__bottom">
            <div class="author__bottom-left">
                <button class="author__bth">JavaScript</button>
                <p class="author__txt"> 12 min read <span>·</span>Selected for you</p>
            </div>
            <div class="author__bottom-right">
                <div class="author__icon">
                    <img src="img/Icon.png" alt="#">
                    <img src="img/Icon.png" alt="#">
                    <img src="img/Icon.png" alt="#">
                </div>
            </div>
        
        </div>
    </div>
    <div class="image">
        <img class="news-image" alt="#">
    </div>

</div> `;


function addNews(){
    const containerNews = document.getElementById("container__news")

    fetch('https://api.nytimes.com/svc/topstories/v2/us.json?api-key=OyXe5VZMweUqav7eqSXpiXj5UADadedr')
        .then(response => response.json())
        .then(data=> data.results.splice(0,10).forEach(element => {
            console.log(element);
            console.log(element.abstract);
            const newTitle = article.replace(
            `class="author__title">`,
            `class="author__title">${element.title}`
            ); 

            const newDescription = newTitle.replace(
                `class="author__content">`,
                `class="author__content">${element.abstract}`
            );
        

            const imageNews = element.multimedia && element.multimedia.length > 0 ? element.multimedia[0].url : "";
            const newImage = newDescription.replace(
                `class="news-image"`,
                `class="news-image" src="${imageNews}"`
            );

            const  author = element.byline.split("").splice(3).join("")
            const authorName = newImage.replace(
                `class="author__text">`,
                `class="author__text">${author}`
            );

            const topicName = authorName.replace(
                `class="author__topic">`,
                `class="author__topic">${element.section}`

            );

            const dates = new Date(element.published_date).toDateString().split(" ").splice(1,2).reverse().join(" ")
            const date = topicName.replace(
                `class="author__date">`,
                `class="author__date">${dates}`

            );
            containerNews.innerHTML += date;
        })
        )

}
addNews();

const titleClick = document.querySelectorAll(".author__title")
    titleClick = addEventListener("click", function(e){
        window.location.href="News List 2/index.html";
})