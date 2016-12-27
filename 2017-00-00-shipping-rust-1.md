# Shipping Rust on Tessel

***Tessel is an open-source hardware platform for developing IoT devices.***

The Tessel board runs an embedded Linux distribution (OpenWRT) and uses a less-common chip architecture: MIPS with soft-float.
Our CLI is designed to require as few steps as possible between plugging in the Tessel board and running code. The board was designed to run Node.js, a runtime for JavaScript, which is an interpreted language. Beyond pruning the amount of code the user has downloaded to that which is actually needed on the device, essentially we just need to tarball a user’s code, unpack it, and run it behind the scenes over an SSH-like pipe:

```
$ t2 init
$ t2 run index.js
Blinking!
```

When we wanted to expand the CLI tool’s support for the Rust programming language, we had to rethink interactions with the command line tool—instead of running a script directory, you specify the target binary by name, for example—but none were more involved than cross-compilation. Tessel’s architecture is not one compiled by default for Rust, so we have to ship the pieces we need ourselves.

The cross-compilation process for Rust involves the following:

- Cross-compile the user’s Rust code. This is specified by the LLVM configuration in a target.json file, or the built-in specifications for several architectures (e.g. x86–64-darwin)
- Search for a libstd for the target platform. This libstd is compiled and provided for the user. You can pull down the target libraries for a set of platforms using `rustup target add ...`.
- Link these together using a linker for the target platform, e.g. `mipsel-openwrt-linux-ld`.

So this is two binaries we need to ship, as well as one JSON file.

First is libstd. We actually want to compile the Rust standard libraries against our target.json, but here we have a problem: how do you do this? … … We use [rust-cross-libs.sh](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Ftessel%2Ft2-rustlib%2Fblob%2Fmaster%2Frust-cross-libs.sh), a script to (with some effort) cross-compile the libstd and generate a new libstd according to the target.json file.

Because these libraries are updated constantly, we actually want to provide a separate libstd for whichever Rust version you are currently using. In our case, we made the decision to compile and version this bundle for each stable release of Rust (currently 1.11.0 and 1.12.0). Whichever version of Rust you are currently using, we pull down its libstd or prompt you to run the SDK install program.

The target.json file is straightforward: it describes the LLVM settings for the architecture, as well as configuration options like which memory allocator to use, which libc to compile against (gcc or uclibc), and more. Because libstd changes whenever this file changes, we just bundle both in the same archive.

Next, we need cross-compiler build tools. OpenWRT, the Linux distribution, is fully described by its binaries and package list. When you compile OpenWRT, you actually compile a series of host tools, then the cross-compiler toolchain, then the Linux kernel, and lastly all the packages going into your distribution. This “compile the world” approach is nice for embedded targets, but we only need the cross-compiler toolchain and any system libraries we want to link against. Luckily, OpenWRT also builds an SDK bundle that we can redistribute with just these.

The OpenWRT SDK bundle changes with each version of our firmware; since the bundle is big (~200mb) and firmware moves slowly, we made the decision to keep only the latest version of the SDK at all times on the user’s computer. One more caveat: host machine binaries are OS-specific. This means that we can compile an OpenWRT SDK on Linux, and redistribute to Linux systems. With some effort, we can compile an SDK on macOS as well; but compiling on Windows is much trickier, since it requires a Linux environment such as Cygwin or Windows 10 Professional’s Linux subsystem. For the moment, we limit our support to Linux and macOS.

When running cargo tessel sdk install:

```
$ cargo tessel sdk install
INFO Installing Tessel build tools...
INFO Downloading Tessel build tools...
INFO Installing MIPS libstd v1.12.0...
INFO Downloading MIPS libstd...
INFO SDK installed.
```

Great! We now have a MIPS libstd and a linker on our machine. But how to use them? It turns out, you can do this with an entirely unmodified cargo binary, all from the command line. We require these environment variables:

- RUST_TARGET_PATH set to the location of the target.json file.
- PATH set to include the linker program specified in target.json.
- RUSTFLAGS set to “-L {path to libstd}”.

We can run the cargo compiler then with these options:

```
cargo build --target=tessel2 --release
```

We load the settings from `tessel2.json`, we source the libraries from the RUSTFLAGS path, and invoke the linker. The result is a cross-compiled binary in our target directory:

```
$ file ./target/tessel2/release/blinky
./target/tessel2/release/blinky: ELF 32-bit LSB executable, MIPS, MIPS32 rel2 version 1, dynamically linked (uses shared libs), with unknown capability 0xf41 = 0x756e6700, with unknown capability 0x70100 = 0x3040000, not stripped
```

And indeed, when we scp this file over to our platform, we get a blinking LED from Rust:

[gif of that]

---

Interested? Help us write sensor drivers, hardware APIs and more on the [tessel-rust repository](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Ftessel%2Ftessel-rust).
