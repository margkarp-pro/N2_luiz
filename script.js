const dados = []
let user_tag = 0;


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
        `;
        cardContent.appendChild(card);
    });
}

function reset_window(type) {
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
    dados.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        cardContent.appendChild(card);
    });
}

function add(){

}

function deletes(){

}