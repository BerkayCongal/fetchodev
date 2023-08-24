/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/



window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})





let users = []
let posts = []

const postId = document.querySelector("#posts-container")

async function dataload() {
   posts = await fetch("https://jsonplaceholder.org/posts")
    .then(posts => posts.json())
     users = await fetch("https://jsonplaceholder.org/users")
    .then(users => users.json())

    render()
}

function render() {
    posts.forEach(post => {
        let containeruser = users.find( x =>  x.id === post.userId);

        postId.innerHTML += `
        <div class="detail">
        <a  class="adetail">
            <h2 class="post-title">${post.title}</h2>
            <h3 class="post-subtitle">${post.slug}</h3>
            <h4 class="content">${post.content}</h4>
        </a>
            <p class="post-meta">
            Posted by
            <a href="#!"> ${containeruser.firstname} ${containeruser.lastname}</a>
            ${post.publishedAt}
            </p>
        </div>`

        bindClick()
    });
}

function bindClick() {
   for(const btn of  document.querySelectorAll(".post-title")) {
    btn.addEventListener("click", (e) =>{
        // console.log(e.target);
        e.target.parentElement.children[2].classList.toggle("show")
    })
   }

}




// function showModal() {
//     console.log("dfghjklşişjgfdf");
// }



dataload();