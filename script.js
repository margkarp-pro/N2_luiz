const dados = []
let user_tag = 0;


function get_user(){
fetch("https://jsonplaceholder.typicode.com/users")
.then(function(dado_retornado_user){
    return dado_retornado_user.json()
}).then(function(json){
    dados.push(...json);
    console.log(dados)
})
}

function get_post(){

}

function reset_window(){

}

function add(){

}

function deletes(){

}