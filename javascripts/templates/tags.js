/*
    @argument {Array<String>} strings
    @argument {...Any} expressions
    @return {String}
*/
export const html = (strings, ...expressions) => {
    return expressions.reduce((result, expression, index) => {
        if (!expression) {
            expression = "";
        }
        else if (Array.isArray(expression)) {
            expression = expression.join(" ");
        }
        return result + expression + strings[index + 1];
    }, strings[0]);
};