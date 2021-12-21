const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var promise = mongoose.createConnection("mongodb://localhost/mymoney", {
  useMongoClient: true,
});

promise.then(function () {
  mongoose.connection.openUri("mongodb://localhost/mymoney");
});

/*mongoose.connect esta obsoleto. Agora deve-se utilizar os 
  comandos acima*/

//ABAIXO PODEMOS (NAO OBRIGATORIO) EXIBIR ALGUMAS MENSAGENS DE VALIDACOES:
mongoose.Error.messages.general.required =
  "O atributo '{PATH}' 'e obrigatorio.";
mongoose.Error.messages.Number.min =
  "O '{VALUE}' informado e menor que o limite minimo de '{MIN}'.";
mongoose.Error.messages.Number.max =
  "O '{VALUE}' informado e maior que o limite maximo de '{MAX}'.";
mongoose.Error.messages.String.enum =
  "'{VALUE}' nao e valido para o atributo '{PATH}'.";
