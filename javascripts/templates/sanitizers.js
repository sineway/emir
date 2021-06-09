/*
    @argument {Any} expression
    @return {String}
*/
export const escHTML = (expression) => {
    return String(expression).replace(/[&<>"']/g, (char) => `&#${char.codePointAt(0)};`);
};
