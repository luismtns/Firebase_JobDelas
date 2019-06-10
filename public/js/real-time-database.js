//Inputs

//Dispalys
var displayName = $('#displayName');

//create instance of User in userDatabase
$('#submitButton').on('click', () => {
	var verify = firebase.auth().currentUser;
	if(!verify){
		return alert('Usuário não logado!')
	}else{
		var uid = firebase.auth().currentUser.uid;
		console.log(uid);
	}

	//Inputs
	var name = $('#nomeInput').val();
	var sexo = $('#sexoInput').val();
	var estrelas = $('#EstrelasInput').val();

	var nomeProfissao = $('#nomeProfissaoInput').val();
	var sobreProfissao = $('#sobreProfissaoInput').val();

	var fotoProjetoInput = $('#fotoProjetoInputInput').val();
	var tituloProjetoInput = $('#tituloProjetoInputInput').val();
	var descricaoProjetoInput = $('#descricaoProjetoInputInput').val();

	var NomeAvaliadoraInput = $('#NomeAvaliadoraInput').val();
	var NotaAvalicaoInput = $('#NotaAvalicaoInput').val();
	var ComentarioAvalicaoInput = $('#ComentarioAvalicaoInput').val();

	var TituloConquistaInput = $('#TituloConquistaInput').val();
	var ImagemConquistaInput = $('#ImagemConquistaInput').val();
	var QuantidadeConquistaInput = $('#QuantidadeConquistaInput').val();

	//Storage
	if($('#fotoPerfilInput').prop('files').length > 0){
		var storageRef = storage.ref(`perfis/${uid}/profile_${uid}`);
		var file = $('#fotoPerfilInput').prop('files')[0];
		storageRef.put(file)
	}
	
	//User DB
	var userJson = {
		"nome": name,
		"sexo": sexo,
		"foto": "profile_"+uid
	}

	userDatabase.child(uid).set(userJson, (error) => {
		if (error) {
			alert("Erro ao atualizar dados \n"+ error);
		} else {
			// Data saved successfully!
			alert("Dados atualizados com sucesso!");

		}
	});

	// //Project DB
	// var projectJson = {
	// 	"email": email,
	// 	"estrelas": estrelas,
	// 	"nome": name,
	// 	"profissao": {
	// 		nomeProfissao: {
	// 			"sobre": sobreProfissao
	// 		}
	// 	},
	// 	"sexo": sexo,
	// 	"foto": "profile_"+uid
	// }

	// projectDatabase.child(uid).set(projectJson);


});

function displayAlertUserStage(user){
  if (user) {
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
}

function verificarLogin() {
	return new Promise(function name(resolve, reject) {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				resolve(user);
				displayAlertUserStage(user);
			} else {
				// No user is signed in.
				reject(false);
				displayAlertUserStage(false);
				window.location.href = "./index.html"
			}
		});

	})
}

verificarLogin().then((e)=>{
	displayAlertUserStage(e);

	//create MyData from userDatabase
	var myData = document.getElementById('personalData');
	var userId = firebase.auth().currentUser.uid;
	userDatabase.child(userId).once('value').then(function(snapshot) {
		myData.innerHTML = '';
		var json = snapshot.val();
		var txt = `
			<b>Email:</b> ${json.email}<br>
			<b>Estrelas:</b> ${json.estrelas}<br>
			<b>Nome:</b> ${json.nome}<br>
			<b>Sexo:</b> ${json.sexo}<br>
			<b>Foto:</b> ${json.foto}
		`;

		myData.innerHTML = txt;


		if(json.nome){
			$('#nomeInput').val(json.nome);
		}
		if(json.sexo){
			$('#sexoInput').val(json.sexo);
		}
		if(json.estrelas){
			$('#EstrelasInput').val(json.estrelas);
		}

		if(json.foto){
			storage.ref(`perfis/${userId}/profile_${userId}`).getDownloadURL().then(function(url) {
				// `url` is the download URL for 'images/stars.jpg'
			
				// This can be downloaded directly:
				var xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onload = function(event) {
					var blob = xhr.response;
				};
				xhr.open('GET', url);
				xhr.send();
			
				// Or inserted into an <img> element:
				var img = document.getElementById('fotoPerfilImg');
				img.src = url;
				$("#fotoPerfilImg").removeClass('hidden');
				$("#divFotoPerfil").addClass('hidden');
			}).catch(function(error) {
				$("#fotoPerfilImg").addClass('hidden');
				$("#divFotoPerfil").removeClass('hidden');
				// Handle any errors
			});
		}else{
			$("#fotoPerfilImg").addClass('hidden');
			$("#divFotoPerfil").removeClass('hidden');
		}
		// console.log(snapshot.val());
	});

	//create UserList from userDatabase
	var userList = document.getElementById('userList');
	userDatabase.on('value', function(snapshot) {
	    userList.innerHTML = '';
	    snapshot.forEach( (item) => {
				var json = item.val();
				var txt = `
					Email: ${json.email}
				`;

				let li = document.createElement('li');
				li.appendChild(document.createTextNode(txt));
				userList.appendChild(li);
	    })
	});

}, (e)=>{
	console.log(e)//false
});

//logout user
$('#signOutUser').on('click', ()=>{

  firebase.auth().signOut()
  .then(function(e) {
    alert('Deslogado');
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