<img width="150" src="https://www.rcanalytics.com/wp-content/uploads/2020/01/pegasus.png">

# component-library

> UI component library and storybook for Real Capital Analytics

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d7b3cf9bb9f14a9b8b2bada334c399bf)](https://www.codacy.com/gh/Real-Capital/component-library?utm_source=github.com&utm_medium=referral&utm_content=Real-Capital/component-library&utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/Real-Capital/component-library.svg?branch=master)](https://travis-ci.org/Real-Capital/component-library)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://github.com/Real-Capital/component-library)
![PRs Welcome](https://img.shields.io/badge/PR's-welcome-7d4cdb.svg)

## Getting Started

component-library is built and tested with [Yarn](https://yarnpkg.com). Please follow their [install instructions](https://yarnpkg.com/docs/install) to get Yarn installed on your system.

Then, run these commands:

```
git clone git@github.com:Real-Capital/component-library.git
cd component-library
yarn install
yarn build
```

## Root Repo Scripts:

```sh
yarn build        # builds all packages
yarn start        # starts storybook server
yarn test         # runs tests in all packages
```

## Running / Writing Examples

First do the steps in "Getting started", then start the Storybook server:

```
yarn start
```

Next, put a file in `packages/<component-dir>/examples/<name>.example.js` and make it look like this:

```jsx
import React from 'react';

// The name of the example (always name the variable `name`)
let name = 'Basic';

// The example to render (always name the function `Example`)
function Example() {
	return <div>Cool cool cool</div>;
}

// Assign the name to the example and then export it as a named constant
Example.story = { name };
export const Comp = Example;

// Default export an object with the title matching the name of the Reach package
export default { title: 'Dialog' };
```

Now you can edit the files in `packages/*` and storybook will automatically reload your changes.

## Running / Writing Tests

First do the steps in "Getting Started", then:

```
yarn test
```

Or if you want to run the tests as you edit files:

```
yarn test --watch
```

Often you'll want to just test the component you're working on:

```
cd packages/<component-path>
yarn test --watch
```

## Releases

This is our current release process. We might be able to put some of this in a script...

```sh
# First, run the build locally and make sure there are no problems
# and that all the tests pass:
$ yarn build
$ yarn test

# Generate the changelog and copy it somewhere for later. We'll
# automate this part eventually, but for now you can get the changelog
# with:
$ yarn changes

# Then create a new version and git tag locally. Don't push yet!
$ yarn ver [version]

# Take a look around and make sure everything is as you'd expect.
# You can inspect everything from the commit that lerna made with:
$ git log -p

# If something needs to be changed, you can undo the commit and
# delete the tag that lerna created and try again.

# If everything looks good, push to GitHub along with the new tag:
$ git push origin master --follow-tags

# Paste the changelog into the release on GitHub. The release is
# complete … huzzah!
```

You need to be careful when publishing a new package because the `lerna publish` on Travis CI will fail for new packages. To get around this, you should publish a `0.0.0` version of the package manually ahead of time. Then the release from CI will be ok. This is really janky but AFAICT the only workaround.

## Website

The website is a [Docusaurus](https://github.com/facebook/docusaurus/) app in the `website` directory.

## License

Apache-2.0 © [Real Capital Analytics](https://www.rcanalytics.com/)
