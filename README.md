# Install

These are the sources for the Agile France website.

## Getting started

* Install:
    * [Node.js](https://nodejs.org): `brew install node` with [homebrew](https://brew.sh) on macOS.
    * Dependencies: `npm install`.
* Build:
    * `npm run build` — build output files into public directory.
    * `npm run build-fast` — build output files into public directory, but consider images are already there.
    * `npm run dev` — build automatically when you make changes.

## Updating the contents for a new year

- Replace all instances of the previous year by the current year (e.g. find-and-replace “2016” by “2017”) and update the dates. See for example [f5975a5](https://github.com/agile-france/site-dessins/commit/f5975a5e4e3809048509e7631fe6a5eab11230b5).
- Change the order of sections. See for example [2e30660](https://github.com/agile-france/site-dessins/commit/2e306601ca23ffe07893095dc2a1f5479140be5d).

## Deploying

[CircleCI](https://circleci.com), as set up in `circle.yml`, will run a deploy script. That deploy script will compile the site to a static version and push it to a new repo with [GitHub Pages](https://pages.github.com) on, most probably on the [@AgileFrance organisation](https://github.com/agilefrance/).

Ask @FredZen to create a new subdomain of `conf.agile-france.org` with the name of the current year (e.g. `2017.conf.agile-france.org`), and make it point to the new GitHub Pages repo. It will most likely be called `github.com/AgileFrance/20XX` (where `20XX` is the current year).

Then, give CircleCI push access to the new repo:

1. Create a new SSH key locally with `ssh-keygen`. Set no password.
2. [Add the private key](https://circleci.com/gh/agile-france/site-dessins/edit#ssh) to CircleCI.
3. Add the public key to the deploy keys of the new repo.
