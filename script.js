const dados = []
let currentType = 'posts';

function get_user(){
fetch("https://jsonplaceholder.typicode.com/users")
.then(function(dado_retornado_user){
    return dado_retornado_user.json()
}).then(function(json){
    dados.push(...json);
    create_user_cards();
})
}

function get_post(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        dados.push(...json);
        create_post_cards();
    })
}

function create_post_cards(){
    const cardContent = document.querySelector('.card-content');
    cardContent.innerHTML = '';
    dados.forEach(post => {
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
        dados.length = 0;
        get_post();
    } else if (type === 'users') {
        dados.length = 0;
        get_user();
    }
}

function create_user_cards() {
    const cardContent = document.querySelector('.card-content');
    cardContent.innerHTML = '';
    dados.forEach(user => {
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

function add(){

}

function deletes(id){
    const index = dados.findIndex(item => item.id === id);

    if (index !== -1) {
        dados.splice(index, 1);
    }

    if (currentType === 'posts') {
        create_post_cards();
    } else if (currentType === 'users') {
        create_user_cards();
    }
}

function create_user_forms(){
    const formsContent = document.querySelector('.forms-content');
    formsContent.innerHTML ='';
    formsContent.innerHTML+=`
        <form>
            <label for="username">Username: </label><br>
            <input type="text" id="username" name="username"><br><br>
            <label for="name">Name: </label><br>
            <input type="text" id="name" name="name"><br><br>
            <label for="email">Email: </label><br>
            <input type="text" id="email" name="email"><br><br>
        </form>
        <button>adicionar user</button>
    `
}

function create_post_forms(){
    const formsContent = document.querySelector('.forms-content');
    formsContent.innerHTML ='';
    formsContent.innerHTML+=`
        <form>
            <label for="title">Titulo: </label><br>
            <input type="text" id="title" name="title"><br><br>
            <label for="body">Testo: </label><br>
            <input type="text" id="body" name="body"><br><br>
        </form>
        <button>enviar post</button>
    `
}

reset_window('posts')
