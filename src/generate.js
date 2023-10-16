const { existsSync, mkdirSync, readFileSync, writeFileSync } = require("fs");

const template = `<meta http-equiv="Refresh" content="0; url='#'" />`;

function getRedirects(file) {
  if (existsSync(file)) {
    return readFileSync(file, "utf-8").trim().split("\n");
  }
  return [];
}

function createFile(output, name, url) {
  mkdirSync(`${output}${name}`, { recursive: true });
  writeFileSync(`${output}${name}/index.html`, template.replace("#", url));
}

function generate(file, output) {
  getRedirects(file).forEach((redirect) => {
    const parts = redirect.split(" ");
    if (parts.length > 1 && parts[0].startsWith("/")) {
      const name = parts[0];
      const url = redirect.substring(name.length + 1);
      createFile(output, name, url);
    }
  });
}

module.exports = { generate };
