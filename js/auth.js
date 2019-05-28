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
    displayName.html(`Você está autenticado com o e-mail ${user.email}`);
    displayName.addClass('alert-success');
    displayName.removeClass('alert-danger');
  } else {
    // User is signed out.
    console.log('signOut');
    displayName.html('Você não esta autenticado.');
    displayName.addClass('alert-danger');
    displayName.removeClass('alert-sucess');
  }
});


//Sign Social Sites Function
function singInPopup(provider){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}