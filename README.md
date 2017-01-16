# Install

These are the sources for the Agile France website.

## Getting started

* Install (if you don't have them):
    * [Node.js](https://nodejs.org): `brew install node` on OS X
    * [Gulp](http://gulpjs.com/): `npm install -g gulp`
    * Gulp plugins: `npm install`
* Build:
    * `gulp build` — build output files into public directory
    * `gulp build-fast` — build output files into public directory, but consider images are already there

## Updating the contents for a new year

- Replace all instances of the previous year by the current year (e.g. find-and-replace “2016” by “2017”) and update the dates. See for example f5975a5e4e3809048509e7631fe6a5eab11230b5.
- Change the order of sections. See for example 2e306601ca23ffe07893095dc2a1f5479140be5d.

## Deploying

[CircleCI](https://circleci.com), as set up in `circle.yml`, will run a deploy script. That deploy script will compile the site to a static version and push it to a new repo with [GitHub Pages](https://pages.github.com) on, most probably on the [@AgileFrance organisation](https://github.com/agilefrance/).

Ask @FredZen to create a new subdomain of `conf.agile-france.org` with the name of the current year (e.g. `2017.conf.agile-france.org`), and make it point to the new GitHub Pages repo.
