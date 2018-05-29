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
  "assets/vendor.css": "assets/vendor-d41d8cd98f00b204e9800998ecf8427e.css"
}
```

## What is an Ember CLI Deploy plugin?

A plugin is an addon that can be executed as a part of the Ember CLI Deploy pipeline. A plugin will implement one or more of the Ember CLI Deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Setup

### Requirements

You'll first have to install and configure:

- [`ember-cli-deploy`](https://github.com/ember-cli-deploy/ember-cli-deploy)
- [`ember-cli-deploy-s3`](https://github.com/ember-cli-deploy/ember-cli-deploy-s3#quick-start)
- [`ember-cli-deploy-s3-index`](https://github.com/ember-cli-deploy/ember-cli-deploy-s3-index#quick-start)
- [`ember-cli-deploy-build`](https://github.com/ember-cli-deploy/ember-cli-deploy-build)
- [`ember-cli-deploy-revision-data`](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data)
- [`ember-cli-deploy-display-revisions`](https://github.com/duizendnegen/ember-cli-deploy-display-revisions)

You can do this like so:

```shell
ember install ember-cli-deploy
ember install ember-cli-deploy-s3
ember install ember-cli-deploy-s3-index
ember install ember-cli-deploy-build
ember install ember-cli-deploy-revision-data
ember install ember-cli-deploy-display-revisions
```

### Install this plugin

```bash
$ ember install ember-cli-deploy-index-json
```

### Configuration

When `ember install ember-cli-deploy` was run, it should have
generated a a file at `your-app/config/deploy.js`.

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

_In depth:_ The idea is that `revision-data`, `s3-index` and
`index-json` have the same `filePattern` value. `index-json` is not
present in this example because we're using its default `filePattern` value. More on this in the Ember CLI Deploy plugin section.

Here is a full example of this file, getting the Amazon S3 information
from unix environment variables.

```js
/* eslint-env node */
"use strict";

module.exports = function(deployTarget) {
  let ENV = {
    s3: {},
    "revision-data": {
      filePattern: "index.json"
    },
    "s3-index": {
      filePattern: "index.json"
    },
    build: {}
  };

  if (deployTarget === "development") {
    ENV.build.environment = "development";
    // configure other plugins for development deploy target here
  }

  if (deployTarget === "staging") {
    ENV.build.environment = "production";
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === "production") {
    ENV.build.environment = "production";
    // configure other plugins for production deploy target here
    let s3Config = {
      allowOverwrite: process.env.ALLOW_OVERWRITE === "true" ? true : false,
      signatureVersion: "v4",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.S3_BUCKET_URI,
      region: process.env.S3_REGION
    };

    Object.assign(ENV.s3, s3Config);
    Object.assign(ENV["s3-index"], s3Config);
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
```

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

You have to edit `config/deploy.js` so that your configuration looks like the snippet below:

```js
'index-json': {
  filePattern: '...',
  fileIgnorePattern: '...',
  indexPath: '...',
  distDir: '...',
  distFiles: []
}
```

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
