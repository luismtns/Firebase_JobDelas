
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
	var email = $('#emailInput').val();
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
	
	var userJson = {
		"email": email,
		"estrelas": estrelas,
		"nome": name,
		"profissao": {
			"nome": nomeProfissao,
			"sobre": sobreProfissao
		},
		"sexo": sexo
	}

	firebase.database().ref('usuarios/' + uid).set(userJson, (error) => {
		if (error) {
			alert("Erro ao atualizar dados \n"+ error);
		} else {
			// Data saved successfully!
			alert("Dados atualizados com sucesso!");

		}
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

function verificarLogin() {
	return new Promise(function name(resolve, reject) {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				resolve(user);
			} else {
				// No user is signed in.
				reject(false)
			}
		});

	})
}
verificarLogin().then((e)=>{
	
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
			<b>Nome Profissão:</b> ${json.profissao.nome}<br>
			<b>Sobre a Profissão:</b> ${json.profissao.sobre}<br>
			<b>Sexo:</b> ${json.sexo}
		`;

		myData.innerHTML = txt;
		console.log(snapshot.val());
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


}, (e)=>{console.log(e)});