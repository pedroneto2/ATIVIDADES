const salaSMask = (value) => value.replace(/^[^a-z][,]?|,(?=,)|([^a-z,])/gi, ''); // substitui qualquer caracter que nao seja letra ou virgula por nada
// e não deixa colocar virgulas seguidas

export default salaSMask;
