const salaNMask = (value) => value.replace(/^[^0-9][,]?|,(?=,)|([^0-9,])/g, ''); // substitui qualquer caracter que nao seja numero ou virgula por nada
//  e não deixa colocar virgulas seguidas

export default salaNMask;
