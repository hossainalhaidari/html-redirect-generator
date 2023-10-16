const core = require("@actions/core");
const { generate } = require("./generate.js");

try {
  generate("_redirects", "html_output");
  console.log("Done generating HTML redirects.");
} catch (error) {
  core.setFailed(error.message);
}
