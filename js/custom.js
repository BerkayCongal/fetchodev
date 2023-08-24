const postsContainer = document.querySelector("#posts-container");
const postTitle = document.querySelector("#post-titles");
const postSlug = document.querySelector("#post-slug");
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
        `
        postTitle.textContent = result.data.attributes.title
        postSlug.textContent = result.data.attributes.slug
        }) 
    }
    
   } )
   
}





getPosts()



    // <div class="post-preview">
    //         <a href="post.html">
    //             <h2 class="post-title">${data.attributes.title}</h2>
    //             <h3 class="post-subtitle">${data.attributes.content}</h3>
    //         </a>
    //         <p class="post-meta">
    //             Posted by
    //             <a href="#!">${data.attributes}</a>
    //             on September 24, 2023
    //         </p>
    //     </div>
    //     <hr class="my-4" />