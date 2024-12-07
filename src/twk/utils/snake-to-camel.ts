const IDENTIFIER = /(_+[a-z0-9])/g;

const replacer = (match: string) => match.toUpperCase().replace("_", "");
export default (input: string) => input.replace(IDENTIFIER, replacer);
