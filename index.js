const { mkdirSync, readFileSync, writeFileSync } = require("fs");
const core = require("@actions/core");

try {
  const template = `<meta http-equiv="Refresh" content="0; url='#'" />`;
  const redirects = readFileSync("_redirects", "utf-8").split("\n");
  redirects.forEach((redirect) => {
    const parts = redirect.split(" ");
    const path = parts[0];
    const url = redirect.substring(path.length + 1);
    mkdirSync(`html_output${path}`, { recursive: true });
    writeFileSync(
      `./html_output${path}/index.html`,
      template.replace("#", url)
    );
  });
  console.log("Done generating HTML redirects.");
} catch (error) {
  core.setFailed(error.message);
}
