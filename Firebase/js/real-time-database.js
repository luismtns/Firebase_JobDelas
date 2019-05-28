
// console.log(database);
var userList = document.getElementById('userList');

$('#submitButton').on('click', ()=>{
    var nome = $('#nameInput').val();
    var email = $('#emailInput').val();
    createUser(nome, email)
})

function createUser( name, email) {
    database.push({
        username: name,
        email: email
    });
}

database.on('value', function(snapshot) {
    userList.innerHTML = '';
    console.log(snapshot.val());
    
    snapshot.forEach( (item) => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(`Nome: ${item.val().username} | E-mail: ${item.val().email}`));
        userList.appendChild(li);
    })
});