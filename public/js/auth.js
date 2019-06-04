//Buttons
var createUser = $('#createUser');
var authUser = $('#authUser');
var signOutUser = $('#signOutUser');

var authFacebook = $('#authFacebook');

//Dispalys
var displayName = $('#displayName');


//create user instance
createUser.on('click', ()=>{
  var email = $('#emailAuthInput');
  var password = $('#passwordAuthInput');

  firebase.auth().createUserWithEmailAndPassword(email.val(), password.val())
  .then(function(e) {
    console.log(e.user);
    alert('Bem Vindo ' + email.val());
    addUserDatabase(e.user.uid, e.user.email);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
});

//auth user instance
authUser.on('click', ()=>{
  var email = $('#emailAuthInput');
  var password = $('#passwordAuthInput');

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
});

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
});

//Event Listener Auth Stage
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.localStorage.setItem('uid',  user.uid);
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
    console.log(result);
    console.log(token);
    console.log(user);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorCode);
    console.log(errorMessage);
    console.log(email);
    console.log(credential);
  });
};

//Facebook Login
authFacebook.on('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope('user_gender');
  singInPopup(provider)
});