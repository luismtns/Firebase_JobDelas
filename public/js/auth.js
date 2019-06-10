//Buttons
var createUser = $('#createUser');
var authUser = $('#authUser');

var authFacebook = $('#authFacebook');



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

function addUserDatabase(uid, email) {
	if(!uid || !email){ return null}
	var userJson = {
			"email": email
	}	
	var userDatabaseRef = userDatabase.child(uid);
	userDatabaseRef.set(userJson);
};

//auth user instance
authUser.on('click', ()=>{
  var email = $('#emailAuthInput');
  var password = $('#passwordAuthInput');

  firebase.auth().signInWithEmailAndPassword(email.val(), password.val())
  .then(function(e) {
    console.log(e);    
    alert('Autenticado ' + email.val());
    window.location.reload();
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

// Event Listener Auth Stage
firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    window.location.href = "./profile.html"
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
    // console.log(email); //undefined
    // console.log(credential); //undefined
  });
};

//Facebook Login
authFacebook.on('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope('user_gender');
  singInPopup(provider)
});