//Inputs
var email = $('#emailAuthInput');
var password = $('#passwordAuthInput');

//Buttons
var createUser = $('#createUser');
var authUser = $('#authUser');
var signOutUser = $('#signOutUser');

var authGithub = $('#authGithub');
var authGoogle = $('#authGoogle');
var authFacebook = $('#authFacebook');
var authTwitter = $('#authTwitter');
var authTwitter = $('#authTwitter');
var authAnonimo = $('#authAnonimo');

//Dispalys
var displayName = $('#displayName');
displayName.html('Você não esta autenticado.');


//create user instance
createUser.on('click', ()=>{

  firebase.auth().createUserWithEmailAndPassword(email.val(), password.val())
  .then(function(e) {
    console.log(e);
    alert('Bem Vindo ' + email.val());
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
})

//auth user instance
authUser.on('click', ()=>{

  firebase.auth().signInWithEmailAndPassword(email.val(), password.val())
  .then(function(e) {
    console.log(e);    
    alert('Autenticado ' + email.val());
    displayName.html('Você esta autenticado como ' + email.val());
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
})

//auth logout user
signOutUser.on('click', ()=>{

  firebase.auth().signOut()
  .then(function(e) {
    alert('Deslogado');
    displayName.html('Você não esta autenticado.');
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
})

//Event Listener Auth Stage
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    // ...
  } else {
    // User is signed out.
    console.log('signOut');
    // ...
  }
});