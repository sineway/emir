export class Unit {
    /*
        @argument {String} [name]
        @return {Number}
    */
    valueOf(name) {
        if (!this.hasOwnProperty(name)) {
            throw new Error(`Invalid unit name: "${name}"`);
        }
        return this[name];
    }
    /*
        @argument {Number} value
        @return {String}
    */
    nameFrom(value) {
        const [name] = Object.entries(this).find((entry, index, list) => {
            const nextEntry = list[index + 1];
            return (nextEntry === undefined) || (value < nextEntry[1]);
        });
        return name;
    }
}