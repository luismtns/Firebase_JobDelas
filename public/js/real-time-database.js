//Inputs
var name = $('#nomeInput');
var email = $('#emailInput');
var sexo = $('#sexoInput');
var Estrelas = $('#EstrelasInput');

var nomeProfissao = $('#nomeProfissaoInput');
var sobreProfissao = $('#sobreProfissaoInput');

var fotoProjetoInput = $('#fotoProjetoInputInput');
var tituloProjetoInput = $('#tituloProjetoInputInput');
var descricaoProjetoInput = $('#descricaoProjetoInputInput');

var NomeAvaliadoraInput = $('#NomeAvaliadoraInput');
var NotaAvalicaoInput = $('#NotaAvalicaoInput');
var ComentarioAvalicaoInput = $('#ComentarioAvalicaoInput');

var TituloConquistaInput = $('#TituloConquistaInput');
var ImagemConquistaInput = $('#ImagemConquistaInput');
var QuantidadeConquistaInput = $('#QuantidadeConquistaInput');

//create instance of User in userDatabase
$('#submitButton').on('click', () => {
	var nome = $('#nameInput').val();
	var email = $('#emailInput').val();
	createUser(nome, email)
})
function createUser(name, email) {
	// var dbJson = {
	// 	"usuarios": {
	// 		"kSepnWrj5aZm6cxHJu1TMJZwc8Z2": {
	// 			"email": "dark.luismtns@gmail.com",
	// 			"estrelas": 5,
	// 			"nome": "Luís Otávio Bovo",
	// 			"profissao": {
	// 				"nome": "Designer",
	// 				"sobre": "Designer gráfico e digital"
	// 			},
	// 			"sexo": "M"
	// 		}
	// 	}
	// }

	// userDatabase.push(dbJson);
}

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
	window.localStorage.setItem('uid', e.uid);
	//create UserList from userDatabase
	var userList = document.getElementById('userList');
	userDatabase.on('value', function(snapshot) {
	    userList.innerHTML = '';
	    snapshot.forEach( (item) => {
				var json = item.val();
				var txt = `
					Email: ${json.email},
					Estrelas: ${json.estrelas},
					Nome: ${json.nome},
					Nome Profissão: ${json.profissao.nome},
					Sobre a Profissão: ${json.profissao.sobre},
					Sexo: ${json.sexo}
				`;

				let li = document.createElement('li');
				li.appendChild(document.createTextNode(txt));
				userList.appendChild(li);
	    })
	});

});