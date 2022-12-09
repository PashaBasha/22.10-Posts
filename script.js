//  Отримання елементів з html
const btnGetPosts = document.querySelector(".get-posts");
const btnAddPosts = document.querySelector(".add-posts");

const postBox = document.querySelector(".posts-box");

const popUp = document.querySelector('.pop-up');

const form = document.querySelector('.form-add-post');

const closePopUp = document.querySelector('.close-popup')


closePopUp.addEventListener('click', function (e) {
    e.preventDefault()
    popUp.hidden = true;
})


// form


// 

// popUp

// popUp.addEventListener("mousedown", popupMove);


// function popupMove(e) {
//     console.log('popupMove');
//     popUp.style.cursor = 'grab';
//     popUp.style.left = e.pageX - shiftX + 'px';
//     popUp.style.top = e.pageY - shiftY + 'px';
//     document.addEventListener('mousemove', popupMove);
// }

// popUp.addEventListener("mouseup", function () {
//     document.removeEventListener('mousemove', popupMove);
//     document.removeEventListener('mouseup', mousedown);
//     popUp.style.cursor = 'default';
//     console.log("ok");
// })


// popUp.addEventListener('mousedown', function (e) {

// })


// function onDrag({ movementX, movementY }) {
//     let getStyle = window.getComputedStyle(popUp);
//     let left = parseInt(getStyle.left);
//     let top = parseInt(getStyle.top);
//     popUp.style.left = `${left + movementX}px`;
//     popUp.style.top = `${top + movementY}px`;

//     // popUp.style.transform = `translateX( ${left + movementX}px)`
//     // popUp.style.transform = `translateY( ${top + movementY}px)`


// }

// popUp.addEventListener("mousedown", (e) => {
//     if (e.target == popUp) {
//         popUp.addEventListener("mousemove", onDrag)
//     }
// })
// document.addEventListener("mouseup", () => {
//     popUp.removeEventListener("mousemove", onDrag)
// })
// popUp













let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0




document.addEventListener("touchstart", dragStart, false);
document.addEventListener("touchend", dragEnd, false);
document.addEventListener("touchmove", drag, false);

document.addEventListener("mousedown", dragStart, false);
document.addEventListener("mouseup", dragEnd, false);
document.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === popUp) {
        active = true;
        addActiveClass()

    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    active = false;
    addActiveClass(active)
}

function addActiveClass() {

        popUp.classList.toggle('popup-move');
    
}
function drag(e) {
    if (active) {
        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, popUp);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}





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
// btnAddPosts.addEventListener('click', (e) => {
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const text = formData.get('text');
    console.log(title);

    let newPost = {
        title: title,
        body: text,
        id: 1,
    }
    form.reset()

    // })


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





