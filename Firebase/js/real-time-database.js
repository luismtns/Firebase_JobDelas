
//create UserList from database
var userList = document.getElementById('userList');
database.on('value', function(snapshot) {
    userList.innerHTML = '';
    snapshot.forEach( (item) => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(`Nome: ${item.val().username} | E-mail: ${item.val().email}`));
        userList.appendChild(li);
    })
});

//create instance of User in database
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