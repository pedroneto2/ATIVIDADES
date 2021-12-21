const intervalMask = (value) =>
  value
    .replace(/^[^0-9][,]?|,(?=,)|([^0-9,])/g, '') // substitui qualquer caracter que nao seja numero ou virgula por nada e não deixa colocar virgulas seguidas
    .replace(/(,\d+).?$/, '$1'); // captura uma sequencia de números depois da vírgula não deixa mais colocar vírgula
export default intervalMask;
