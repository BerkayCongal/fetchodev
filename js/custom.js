const postsContainer = document.querySelector("#posts-container");
const postTitle = document.querySelector("#post-titles");
const postSlug = document.querySelector("#post-slug");
const commentForm = document.querySelector('.comment form');
const baseurl = "http://localhost:1337/api/"

async function getPosts() {
let posts = await fetch("http://localhost:1337/api/posts?populate=*")
  .then(response => response.json())
  loadPage(posts.data)
}

function loadPage(posts)  {
   posts.forEach(post => {
    postsContainer.innerHTML += `<div class="post-preview">
      <a href="#/posts/${post.id}">
               <h2 class="post-title">${post.attributes.title}</h2>
                <h3 class="post-subtitle">${post.attributes.content}</h3>
                <h4 class=""post-sunmay>${post.attributes.sunmmary}</h4>
           </a>
            <p class="post-meta">
                 Posted by
                 <a href="#!">${post.attributes.user.data.attributes.username}</a>
                 
                 on ${post.attributes.updatedAt.substr(0,10)}
             </p>
        </div>
     <hr class="my-4" />`
   });

   window.addEventListener("hashchange", () => {
    createComments()
    let  url = location.hash.substr(2);
    if(url === "") {
        loadPage(posts)

    }else {
        fetch(baseurl + url)
        .then(response => response.json())
        .then(result => {
            postsContainer.innerHTML = `
            <div class="container position-relative px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-7">
                    ${result.data.attributes.content}
                </div>
            </div>
        </div>
        <hr>
        `
        createComments();
        commentForm.classList.toggle("active")
        console.log(result.data.attributes.content);
        postTitle.textContent = result.data.attributes.title
        postSlug.textContent = result.data.attributes.slug

        }) 
    }
    
   })
   
}

const createComments = async () => {
    let comments = await fetch('http://localhost:1337/api/comments').then(comment => comment.json())
    comments.data.forEach( element => {
       postsContainer.innerHTML += `
            <div class="comment-list">
                <h1>${element.attributes.name}</h1>
                <p>${element.attributes.comment}</p>
            </div>
       `
    });
} 

commentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(commentForm);
    const formObj = Object.fromEntries(formData);
    formObj.post = 1;
    fetch('http://localhost:1337/api/comments', {
        method: 'POST',
        body: JSON.stringify({ data: formObj }),
        headers: {
            "Content-Type": "application/json"
        }

    }).catch(function () {
        alert('Gönderilemedi');
    }).then(function (response) {
        return response.json();
    }).then(function (responseData) {
        // Yorumları yeniden yükle
        const postId = responseData.data.attributes.post;
        // getComments(postId);
        commentForm.reset();
        createComments()
    })
    
});

getPosts()
