const { generate } = require("./generate.js");

const args = process.argv;
const file = args.length >= 3 ? args[2] : "_redirects";
const output = args.length >= 4 ? args[3] : "html_output";
generate(file, output);
