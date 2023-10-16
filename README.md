# HTML Redirect Generator

A CLI tool and GitHub action to generate static HTML redirects

## Usage

- Put all your URL redirects in a file named `_redirects` like so:

```
/ https://example.com
/foo https://bar.com
/baz https://test.com
```

- Use the `hossainalhaidari/html-redirect-generator@main` action in your workflow
- Or use the CLI to generate it: `npx html-redirect-generator`
- Files will be available under `html_output` folder

An example workflow would be something like this:

```yaml
name: Generate HTML files
on: [push]
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Generate HTML redirect files
        uses: hossainalhaidari/html-redirect-generator@main
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: html_output
  deploy:
    name: Deploy
    permissions: write-all
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```
