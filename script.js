
const feedContainer = document.getElementById('feed-container');
const count = 30;
const apiKey = 'Ml37cYGLBg2cfLouAXT19VzPFXAPu1hJ8VLC8JA8IUk';
const apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;
const loader = document.getElementById('loader');


function LoaderSwitch() {
    loader.hidden = !loader.hidden;
}

//Create & insert HTML Code Inside The Feedcontainer 
function insertHTMLCode(element) {

    //Create The Html Code for every Post
    let htmlCode;
    let image = `${element.urls.regular}&w=500`;

    htmlCode =
        `
     <div class="wrap-container" id="wrap-container">
     <div class="nav-item" id="nav-item">
         <div class="info" id="info">
             <img src=${image}
                 alt=${element.alt_description} id="img-profile">
                 <div class="details">
                 <div id="name-profile">Mohamed</div>
                 <span class="post-date">${element.created_at}</span>
             </div>
         </div>
         <a href="#"><img src="more.svg" id="ellipse" /></a>
     </div>
     <!--Post Container-->
     <div class="post-container" id="post-container">
         <h4>${element.alt_description}</h4>
         <img id="post-img"
             src=${image}
             alt=${element.alt_description}>
     </div>
     <!--End of Post Container-->
     <!--Comment container-->
     <div class="comment-container" id="comment-container">
         <img id="post-img"
             src=${element.urls.regular}
             alt=${element.alt_description}>
         <input type="text" name="" id="input_comment" placeholder="Your Comment">
     </div>
     <!--End of Comment container-->
 </div>
     
     `;
    //Insert the HTML Code Inside the FeedContainer
    const div = document.createElement('div');
    div.innerHTML = htmlCode;
    feedContainer.appendChild(div);


}
// Fetch The Data from the API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.forEach(element => {
            insertHTMLCode(element);
        })
        LoaderSwitch();


    } catch (e) {
        console.log(e.message)
    }
}

//Scroll function
function scrollDocument() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
    }
}
//Listener
window.addEventListener('scroll', scrollDocument);
LoaderSwitch();
getPhotos();