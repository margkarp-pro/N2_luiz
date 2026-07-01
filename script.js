const dados_post = []
const dados_user = []
let currentType = 'posts';

function show_spinner() {
    const cardContent = document.querySelector('.card-content');
    cardContent.innerHTML = '<div class="spinner"></div>';
}

function get_user(){
    show_spinner();
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(function(dado_retornado_user){
        return dado_retornado_user.json()
    }).then(function(json){
        dados_user.push(...json);
        create_user_cards();
    })
}

function get_post(){
    show_spinner();
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        dados_post.push(...json);
        create_post_cards();
    })
}

function create_post_cards(){
    const cardContent = document.querySelector('.card-content');
    cardContent.innerHTML = '';
    dados_post.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <button onclick="deletes(${post.id})">Delete</button>
        `;
        cardContent.appendChild(card);
    });
}

function reset_window(type) {
    currentType = type;

    if (type === 'posts') {
        if(dados_post.length === 0){
            get_post();
        } else {
            create_post_cards();
        }
        create_post_forms();
    } else if (type === 'users') {
        if(dados_user.length === 0){
            get_user();
        } else {
            create_user_cards();
        }
        create_user_forms();
    }
}

function create_user_cards() {
    const cardContent = document.querySelector('.card-content');
    cardContent.innerHTML = '';
    dados_user.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${user.username}</h2>
            <p>${user.name}</p>
            <p>${user.email}</p>
            <button onclick="deletes(${user.id})">Delete</button>
        `;
        cardContent.appendChild(card);
    });
}

function add_post(){
    const dado_titulo = document.getElementById("title");
    const dado_body = document.getElementById("body");

    if(dado_titulo.value === '' || dado_body.value === ''){
        alert('Preencha todos os campos para adicionar um post.');
        return;
    }

    dados_post.push({
        id: dados_post.length+1,
        title: dado_titulo.value,
        body: dado_body.value
    })
    dado_titulo.value='';
    dado_body.value='';
    create_post_cards();
}

function add_user(){
    const dado_username = document.getElementById("username");
    const dado_name = document.getElementById("name");
    const dado_email = document.getElementById("email");

    if(dado_username.value === '' || dado_name.value === '' || dado_email.value === ''){
        alert('Preencha todos os campos para adicionar um usuário.');
        return;
    }

    dados_user.push({
        id: dados_user.length+1,
        username: dado_username.value,
        name: dado_name.value,
        email: dado_email.value
    });
    dado_username.value='';
    dado_name.value='';
    dado_email.value='';
    create_user_cards();
}

function deletes(id){
    let index;

    if (currentType === 'posts') {
        index = dados_post.findIndex(item => item.id === id);
        dados_post.splice(index, 1);
        create_post_cards();
    } else if (currentType === 'users') {
        index = dados_user.findIndex(item => item.id === id);
        dados_user.splice(index, 1);
        create_user_cards();
    }
}

function create_user_forms(){
    const formsContent = document.querySelector('.forms-content');
    formsContent.innerHTML ='';
    formsContent.innerHTML+=`
        <form>
            <label for="username">Username: </label>
            <input type="text" id="username" name="username">
            <label for="name">Name: </label>
            <input type="text" id="name" name="name">
            <label for="email">Email: </label>
            <input type="text" id="email" name="email">
        </form>
        <button onclick="add_user()">adicionar user</button>
    `
}

function create_post_forms(){
    const formsContent = document.querySelector('.forms-content');
    formsContent.innerHTML ='';
    formsContent.innerHTML+=`
        <form>
            <label for="title">Titulo: </label>
            <input type="text" id="title" name="title">
            <label for="body">Texto: </label>
            <input type="text" id="body" name="body">
        </form>
        <button onclick="add_post()">enviar post</button>
    `
}

reset_window('posts');