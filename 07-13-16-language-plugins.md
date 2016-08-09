## Interfacing with the Language Plugin API for Tessel 2
This month we merged one of the most significant pull requests for the Tessel project: [adding Rust deployment support](https://github.com/tessel/t2-cli/pull/790). For the past three years we've focused exclusively on deploying JavaScript on microcontrollers. This is our first step investing in a new language, a new ecosystem, and a new community. However, the purpose of this post is not to dive into the benefits of Rust, but rather to showcase the ease of adding new language support to the Tessel CLI.

Despite the significance of this addition to the CLI codebase, the amount of code we modified was relatively small. We simply added two main files (along with minor modifications to a handful of other tests): [one with the implementation](https://github.com/tessel/t2-cli/blob/b8cd1f34398c2d188fa188a216b4b9b4dd206dc4/lib/tessel/deployment/rust.js) and one with [unit tests](https://github.com/tessel/t2-cli/blob/b8cd1f34398c2d188fa188a216b4b9b4dd206dc4/test/unit/deployment/rust.js). The simplicity of the feature addition is a testament [@rwaldron](https://github.com/rwaldron)'s hard work building the CLI's language plugin system. In this post, I want to demonstrate how straightforward it is to add support for a new language to the CLI using this plugin system.

You can deploy an arbitrary code bundle to Tessel 2 (in any language) with the same six general functions:

1. Determine project location in the file system
2. Run any compilation/pre-processing steps (optional)
3. Bundle the executable code into a tarball
4. Run any pre-execution steps (optional)
5. Execute the code/binary
6. Run any post-execution steps (optional)

These functions are more concisely named `checkConfiguration`, `preBundle`, `tarBundle`, `preRun`, `shell`/`binary`, and `postRun` (respectively). Here is an explanation of each of those interfaces.

### 1. checkConfiguration
`checkConfiguration` accepts the directory that was deployed with `t2 run ...` and returns the path to the entry point of the project. With Rust, we do this by parsing the `Cargo.toml` and with JavaScript we parse the project's `package.json`. It is expected to return an object with a `basename` and optional `program` property (for the name of the project).

```.js
// checkConfiguration to confirm project deployment files
exportables.checkConfiguration = (pushdir, basename, program) => {
  // Should return the file information for the program
  return {
    basename,
    program
  };
};
```

### 2. preBundle
`preBundle` is an optional step for any processes that need to be run prior to packaging the directory that will be sent to the Tessel 2. For example, when deploying JavaScript, this function is integral to the binary compilation stage (where we inject our pre-compiled binaries in place of existing project binary dependencies). For Rust deployment, this step is less critital but we use it to set some optional parameters (which we could do in the next function as well).

```.js
// Optional function to process options prior to bundling project
exportables.preBundle = function(options) {
  // Should return a Promise which gets resolved when the code is ready to be tarred
  return Promise.resolve();
};
```

### 3. tarBundle
`tarBundle` is a required step which should resolve a `Promise` with a Buffer that represents the tarballed code or binary. The CLI will automatically untar the bundle after it is deployed on the Tessel 2.

In the case of Rust, this was the biggest addition. In order to compile Rust code for Tessel, we needed to set up a special cross-compiler that could compile a binary that runs on Tessel's MIPS architecture. The easiest solution was to have the CLI send out the project to a preconfigured remote [cross-compilation server](https://github.com/tessel/rust-compilation-server). The server then compiles and returns the binary to the CLI.

```.js
// This must implement a Promise that resolves with a Buffer
// that represents a DIRECTORY containing the desired bundle.
exportables.tarBundle = function(options) {
  // Should return a Promise which eventually gets resolved with the bundle
  return Promise.resolve(bundle);
};
```

### 4. preRun
`preRun` is an optional step that's useful if you need to call any shell functions on Tessel itself before the project is initialized. For example, with Rust, we set the permissions of the binary to ensure it's executable. It's unused for JavaScript.

```.js
// Optionally make changes within Tessel's Linux environment before starting the program
exportables.preRun = function(tessel, options) {
  // Should return a Promise which eventually gets resolved
  return Promise.resolve();
};
```

### 5. shell/binary
#### t2 run
`binary` is a string that represents the engine that runs the program. It is used as the first argument in a shell command to start the program when a project is *`run`*. For JavaScript, this string is `node` and for Rust it's `.`.


#### t2 push
`shell` is a function that could have been named `begin` because it's responsible for actually getting the program going when you *`push`* the project. The reason it's called `shell` instead is because the function needs to return a string representing the contents of a shell script that starts the program.

```
exportables.binary = 'YOUR_EXECUTION_METHOD';
exportables.shell = (options) => {
  return tags.stripIndent `
    #!/bin/sh
    exec YOUR_EXECUTION_METHOD /app/remote-script/${opts.resolvedEntryPoint}
  `;
};
```

### 6. postRun
`postRun` is another optional step that's useful if there is code you need to run on Tessel after the program has started (but not necessarily before the program has ended). It's largely unused thus far so far but was added for future-proofness.

```.js
// Optionally make changes on Tessel after starting the program
exportables.postRun = function(tessel, options) {
  // Should return a Promise which eventually gets resolved
  return Promise.resolve();
};
```

### Conclusion
That's just about all there is to adding language support to the CLI. There are several more steps that need to be taken to build full hardware support for a language on Tessel. You can follow [Rust's progress in that process here](https://gist.github.com/johnnyman727/f76616edc71a8646b27b27809ea464c6).

If you have questions about the unit tests or the implementation of new languages in general, feel free to reach out in the #engineering channel of [Tessel Slack](http://www.tessel-slack.herokuapp.com). Let us know if there are any extra plugin functions you think the CLI needs to accomodate or if you need help building a plugin for the language you'd like to build hardware with.

- Jon
