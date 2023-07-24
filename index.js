const { mkdirSync, readFileSync, writeFileSync, readdirSync } = require("fs");
const core = require("@actions/core");

try {
  const template = `<meta http-equiv="Refresh" content="0; url='#'" />`;
  const redirects = readFileSync("_redirects", "utf-8").split("\n");
  redirects.forEach((redirect) => {
    const parts = redirect.split(" ");
    const path = parts[0];
    const url = redirect.substring(path.length + 1);

    mkdirSync(`html_output${path}`, { recursive: true });

    const filenames = readdirSync("html_output");
    core.info("\nCurrent directory filenames:");
    filenames.forEach((file) => {
      core.info(file);
    });

    writeFileSync(
      `./html_output${path}/index.html`,
      template.replace("#", url)
    );
  });
  core.info("Done generating HTML redirects.");
} catch (error) {
  core.setFailed(error.message);
}
