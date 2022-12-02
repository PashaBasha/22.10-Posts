//  Отримання елементів з html
const btnGetPosts = document.querySelector(".get-posts");
const btnAddPosts = document.querySelector(".add-posts");

const postBox = document.querySelector(".posts-box");




// Робимо запит на сервер для отримання постів


function getPosts(callback) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.addEventListener('load', () => {
        console.log('Все ок');
        const response = JSON.parse(xhr.response)

        callback(response)
    })

    xhr.addEventListener('error', () => {
        console.log('Все не ок');

    })
    xhr.send()


}


// Вішаємо подію клік на кнопку отримання постів та викликаємо функцію  renderPosts

btnGetPosts.addEventListener("click", () => {
    getPosts((response) => {
        renderPosts(response)
    });
});



// функція яка займаэться  створенням карточки поста і повертає готову картку в те місце де вона була викликана 

function cardTemplate(post) {
    const card = document.createElement("div");
    card.classList.add('card');
    const cardBody = document.createElement("div");
    cardBody.classList.add('card-body');
    const title = document.createElement('h4');
    title.classList.add('card__title');
    title.textContent = post.title;
    const article = document.createElement('p');
    const id = document.createElement('div');
    id.classList.add('card__id');
    id.textContent = post.id
    article.classList.add('card__text');
    article.textContent = post.body;
    cardBody.append(title, article, id);
    card.appendChild(cardBody);
    return card;
    // console.log(card)

}



//  Функція яка створює фрагмент , викликає функцію створення карточки приймає готову картку , запихує її у фрагмент
function renderPosts(response) {
    const fragment = document.createDocumentFragment();
    response.forEach(post => {
        const card = cardTemplate(post);
        fragment.appendChild(card)
    })
    postBox.appendChild(fragment);
}



// Фішаємо подію на кнопку додати пости та створюємо пост викликаємо функцію createPost
btnAddPosts.addEventListener('click', (e) => {
    const newPost = {
        title: 'title post',
        body: 'body text post',
        id: 1,

    };

    createPost(newPost, response => {
        // console.log(response);
        const card = cardTemplate(response);
        postBox.insertAdjacentElement('afterbegin', card);
        // console.log(card);


    });
});




//  Функція яка створює пост та закидає його на сервер 

function createPost(body, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts')
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        cb(response);

    });

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.addEventListener('error', () => {
        console.log('Помилка');
    })

    xhr.send(JSON.stringify(body));
};





