// Plain browser JS. Same key-exposure caveat as the React tab applies --
// anyone viewing the page source or network tab can see it.

const blogsElement = document.getElementById('blog-data');
const API = 'https://true-blogger-api.app/api/v1/';
const API_KEY = 'lba_Efw3xxcezzfJG-lXdWYkJYtUf-AGVBUnFXRxxlEnj10';

async function getUserData() {
    try {
        const response = await fetch("https://true-blogger-api.app/api/v1/blogs", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${resonse.status}`)
        }


        await response.json()
            .then((data) => {
                console.log("Full Response");
                console.log(data)
                displayPosts(data);
                displayPosts(data.blogs)
            })         
    }

    catch (error) {
        console.error(`Error: ${error.message}`)
    }

}

getUserData()


function displayPosts(blogs)
{
// to display blog through our HTML
    let blogContainer = document.createElement("div");
    main.appendChild(blogContainer)

    let blogTitle = document.createElement("div");
    blogTitle.className = "blog-post";
    blogTitle.textContent = blogs[0].title
    blogContainer.appendChild(blogTitle);

    let blogImage = document.createElement("div");
    blogImage.className = "blog-image";
    blogImage.innerHTML = `<img src=""`>
    blogContainer.appendChild(blogImage);

    let blogDescription = document.createElement("div");
    blogDescription.className = "blog-description";
    blogDescription.innerHTML = "";
    blogContainer.appendChild(blogDescription);

    let blogTags = document.createElement("div");
    blogTags.className = "blog-tag";
    blogTags.innerHTML = "";
    blogContainer.appendChild(blogTags);
}

async function getBlogs() {
  try {
    const response = await fetch(`${API}blogs`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const blogs = Array.isArray(data?.blogs) ? data.blogs : [];

    renderBlogs(blogs);
  } catch (error) {
    console.error('Error:', error.message);
    blogsElement.innerHTML = '<p class="error-message"> Unable to load blog posts right now. </p>';
  }
  console.log(blogs);
}

function createEngagement(post) {
  const postEngagement = document.createElement('div');
  postEngagement.classList.add('post-engagement');

  const postViews = document.createElement('p');
  postViews.classList.add('post-views');
  postViews.textContent = `${post.views ?? 0} views`;

  const postLikes = document.createElement('div');
  postLikes.classList.add('post-likes');
  postLikes.textContent = `${post.likes ?? 0} likes`;

  const postDislikes = document.createElement('div');
  postDislikes.classList.add('post-dislikes');
  postDislikes.textContent = `${post.dislikes ?? 0} dislikes`;

  postEngagement.append(postViews, postLikes, postDislikes);
  return postEngagement;
}

function messagePost(post) {
  const postTitle = document.createElement('h2');
  postTitle.classList.add('post-title');
  postTitle.textContent = post.title || 'Untitled post';

  const postTags = document.createElement('p');
  postTags.classList.add('post-tags');
  postTags.textContent = Array.isArray(post.tags) && post.tags.length
    ? post.tags.join(', ')
    : 'No tags';

  const postEngagement = createEngagement(post);

  const postCard = document.createElement('article');
  postCard.classList.add('post-card');

  postCard.append(postTitle, postTags, postEngagement);

  return postCard;
}

function renderBlogs(blogs) {
  if (!blogsElement) return;

  blogsElement.innerHTML = '';

  blogs.forEach((post) => {
    blogsElement.appendChild(messagePost(post));
  });
}

getBlogs();
