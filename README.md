# ember-cli-deploy-index-json

> An Ember CLI Deploy plugin to use a JSON index rather than an HTML one as provided by [`ember-cli-deploy-s3-index`](https://github.com/ember-cli-deploy/ember-cli-deploy-s3-index).

[![Build Status](https://travis-ci.org/peopledoc/ember-cli-deploy-index-json.svg?branch=master)](https://travis-ci.org/peopledoc/ember-cli-deploy-index-json)

This JSON index file is meant to be consumed by some application embedding yours.

```
$ ember deploy production
$ cat tmp/deploy-dist/index.json
{
  "assets/dummy.css": "assets/dummy-d41d8cd98f00b204e9800998ecf8427e.css",
  "assets/dummy.js": "assets/dummy-f1caa4785f44f7dc0ca9118458c120f8.js",
  "assets/vendor.js": "assets/vendor-b3a3b580d0c1bf83382792291e35020b.js",
  "assets/vendor.css": "assets/vendor-d41d8cd98f00b204e9800998ecf8427e.css",
  "crossdomain.xml": "crossdomain.xml",
  "robots.txt": "robots.txt"
}
```

## What is an Ember CLI Deploy plugin?

A plugin is an addon that can be executed as a part of the Ember CLI Deploy pipeline. A plugin will implement one or more of the Ember CLI Deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Setup

- Requirements

You'll first have to [setup `ember-cli-deploy-s3-index`](https://github.com/ember-cli-deploy/ember-cli-deploy-s3-index#quick-start).

- Install this plugin

```bash
$ ember install ember-cli-deploy-index-json
```

- Configuration

Edit `config/deploy.js` so that your configuration looks like the snippet below.

```js
s3: {},
'revision-data': {
  filePattern: 'index.json'
},
's3-index': {
  filePattern: 'index.json'
}
```

_In depth:_ The idea is that `revision-data`, `s3-index` and `index-json` have the same `filePattern` value. `index-json` is not present in this example because we're using its default `filePattern` value.

## Usage

- Deploy version to production environment

`ember deploy production`

- List versions on production environment

`ember deploy:list production`

- Activate a version on the production environment

`ember deploy:activate --revision <revision-key>`

## Ember CLI Deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][1].

- `willUpload`

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][1].

### filePattern

Files matching this pattern will be included in the index.

_Default:_ `'**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2}'`

### fileIgnorePattern

Files matching this pattern will _not_ be included in the index even if they match filePattern.

_Default:_ `null`

### indexPath

The JSON index file name. If changed, you should adapt `revision-data` and `s3-index` plugins configs accordingly.

_Default:_ `'index.json'`

### distDir

Directory where assets have been written to

_Default:_ the `distDir` property of the deployment context

### distFiles

The Array of built assets.

_Default:_ the `distFiles` property of the deployment context

## Prerequisites

No properties are expected to be present on the deployment context object.

## Tests

- yarn test

## Why `ember test` doesn't work

Since this is a node-only Ember CLI addon, we use mocha for testing and this package does not include many files and devDependencies which are part of Ember CLI's typical `ember test` processes.

[1]: http://ember-cli-deploy.com/plugins/ "Plugin Documentation"
[2]: https://github.com/ember-cli-deploy/ember-cli-deploy-build "ember-cli-deploy-build"

## Contributors

<!-- readme: contributors,ember-tomster/- -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/GreatWizard">
            <img src="https://avatars.githubusercontent.com/u/1322081?v=4" width="100;" alt="GreatWizard"/>
            <br />
            <sub><b>GreatWizard</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/MrChocolatine">
            <img src="https://avatars.githubusercontent.com/u/47531779?v=4" width="100;" alt="MrChocolatine"/>
            <br />
            <sub><b>MrChocolatine</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/xcambar">
            <img src="https://avatars.githubusercontent.com/u/657654?v=4" width="100;" alt="xcambar"/>
            <br />
            <sub><b>xcambar</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/amessinger">
            <img src="https://avatars.githubusercontent.com/u/3007703?v=4" width="100;" alt="amessinger"/>
            <br />
            <sub><b>amessinger</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/lifeart">
            <img src="https://avatars.githubusercontent.com/u/1360552?v=4" width="100;" alt="lifeart"/>
            <br />
            <sub><b>lifeart</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/romgere">
            <img src="https://avatars.githubusercontent.com/u/13900970?v=4" width="100;" alt="romgere"/>
            <br />
            <sub><b>romgere</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors,ember-tomster/- -end -->
