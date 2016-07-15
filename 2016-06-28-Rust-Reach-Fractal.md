# Where are we going with Tessel? Rust, Reach, and Fractal

The aim of the Tessel Project is to create a fully open source hardware & software platform that makes it easy and intuitive to develop Internet-connected devices.

With Tessel 1, we tackled the "easy and intuitive" part of that mission statement. Tessel 2 furthered that piece of the mission, and began to work towards letting developers build at scale. Specifically, I think we've done quite well towards fulfilling two of our [core philosophies](https://github.com/tessel/project/blob/master/MISSION.md):

> **Developer experience is paramount.** Tessel should be the fastest way to build an idea, regardless of your background (or lack thereof) in electrical engineering or computer programming. Branding, documentation, and engineering design decisions should always take this into account.

> **Device design should focus on user experience rather than on implementation.** Tessel uses high level languages and modular plug & play hardware (see philosophy here) so that device creators can fully prototype and test device functionality before worrying about optimization and implementation specifics.

Our next efforts should take us down the road to this less-fulfilled core belief:

> **Tessel should be practical to use.** Tessel as a platform cannot have a big impact unless it is cost effective, reliable, and available for purchase. *It needs to be possible to purchase Tessel hardware at affordable prices, from quantity one up to production-level quantities (10,000+).*

(Emphasis added.)

## Where we are: the vision of Tessel 2

When we began to design Tessel 2, we envisioned it as the basis of products that can be taken to market. At the core of its design was the key idea:

**People should be able to scale the tools they use for prototyping all the way into production.**

This is a radical idea.

If you're a Node developer, this prototyping --> production path should feel familiar. Both Node.JS and Tessel subscribe to the philosophy that you should be able to build modularly. Both let you design iteratively, and swap out packaged components according to your (possibly changing) needs.

In hardware, this is nearly unheard of. It is very common to build a first prototype to show technical viability, then start from scratch to design a PCB that works with parts you can get at the x1000 scale.

With Tessel 2, we say: you shouldn't have to. This concept drove the following design decisions:

* All of the parts used for Tessel 2 are easily sourceable (they will continue to be manufactured and supported for a few years) and can be purchased in low (x100) quantities.
* Tessel 2 was designed in KiCad, which is perhaps the only fully-featured electrical engineering design tool you can download and use for free (it is open source). "Open Source Hardware" (OSHW) is fulfilled by making our schematics freely accessible, but it's important to us that you can pick up where we left off with our [design files](https://github.com/tessel/t2-hardware).
* The layout of the board itself is designed so that you can easily "break off" pieces you don't need in your production product. The PCB traces and passive components contained in a given functional block are also kept in a physical block. A block diagram of Tessel's hardware corresponds to its physical layout, so that you can remove e.g. the ethernet port (and save yourself the cost of the header) in your final product.

![Tessel 2 block diagram](http://softdroid.net/sites/default/files/resize/remote/eb0193ce7bae91d87724d28642c83ab7-500x458.png)

This takes OSHW beyond just licensing. We want you to take our designs and use the parts of them you need in your own products. With your help, we can push the boundaries of what OSHW is: a platform for serious product development, not just a sharing marketplace for makers.

> Openness promotes innovation. Tessel is fully open source, hardware and software, so that developers can create and build on these efforts, as projects and as products, without worry of legal hassle. This project seeks to expand and promote openness as a movement in both software and hardware, and be a leader in community developed hardware.

### At the crossroads

Now that we've shipped Tessel 2, there are several things we could do:

1. Keep adding features in software, like support for more languages or additional features
1. Build more modules to expand the platform
1. Work on a "Tessel 3" that is an evolution of the board
1. Work on a "Tessel X" that uses some of the same tooling but suits a different niche
1. Something else entirely, which approaches the mission in a different way

This is where the Steering Committee comes in. It's our job, as leaders of the project, to determine the vision and create a plan for future development.

For us, this is the first major vision-type decision we've had to make since moving to an all-volunteer open governance model. It's challenging to craft cohesive vision in our limited face-to-face meeting time.

To make a decision of this type, we need to lean back on our mission and core principles, on the logistical implications of our decisions, and on the needs of our community.

Critically, we need to pick projects that are well-scoped and highly focused, so that we can progress measurably with the time and person-power we have available. All of these projects are arguably worthwhile. Which is best?

## Fulfilling the vision

Coming back to the core, we want to build the OSHW movement through our platform. This problem fits the original vision for Tessel 2, to help people of different backgrounds create products quickly and easily.

We've come some of the way towards making Tessel 2 the base for a product you can take to market. But we're not all the way there yet. Here are some of the issues we see:

1. It's not easy for most of the Tessel community to take the tools we've created so far and go to market. If you don't come from an electrical engineering background, the next step might be insurmountably daunting. Firstly, you might not know what the next step is: what do you when you have one of something and want more? What do you need to change, or make, and why? Secondly, if you wanted to make your design more efficient, you might not know what things you can afford to remove from the design, or how much efficiency or cost they would save you.
1. Connected device products tend to exist in a networked configuration, usually involving several low-cost, low-power devices. A standard for usability in this vein is the ability to run on a battery for months to years. This makes Tessel 2 not well suited to a lot of product applications.
1. You can optimize to a point, but at the end of the day you are running JavaScript. This might not be as efficient or as innately reliable as you want your product to be. Additionally, you might have needs that are not supported in the language.

## A path forward: Rust, Reach, and Fractal

Drawing on some exploratory work we did over a year ago, we think we can work on these problems such that their solutions build upon each other. Here's the idea:

1. Work on improved **Rust** support. The Rust language executes code much faster and more robustly than JavaScript and should serve well in production. The code is overall pretty legible, and it's a welcoming community with good documentation. We've already begun tooling for this on the [tessel-rust](//github.com/tessel/tessel-rust) repo. Tessel Project work on Rust doesn't mean reduced support for or interest in JavaScript – we think they have the potential to play well together (check out the [Neon](https://github.com/rustbridge/neon) project!) and want both to have first-class support.
1. Build on this for our **Tessel Reach** project: cheap, low-power boards which break out to Tessel module ports. Think of a Reach board as an extension cable for a module– this is how it should feel to use one. Except instead of the long wires and limited number of modules, Tessel Reach boards will connect wirelessly to a USB BLE dongle on T2 and not be limited by the number of module ports available on the Tessel 2. You can see a bit more detail on [this issue](https://github.com/tessel/project/issues/142).
1. Use the JavaScript --> Rust compilation work to begin building the **Fractal** project: software tooling to help you optimize your prototype (software and hardware) into production. Explicit hardware requirements and memory-efficient software can let us begin to suggest hardware optimization. Eventually, this would move toward easily comprehensible messaging, such as "compile to Rust and reduce your file size of X to Y", "you aren't using Module Port B, remove it?" and "you're only using Y memory- you may want to consider this cheaper chip (link)".

## What do you think?

This is the beginning of a plan. It's an outline of a roadmap of a vision, and it's going to be a lot of work.

For me, it's an inspiration. I want to work in the context of a grand plan. And it's my hope that this grand plan excites and inspires you, too.

When it comes down to it, that's the crux. What do you think? Is this something you're excited about building, and do these tools feel like they would be useful to you? Per our final core philosophy:

> **Community matters.** This project should be a welcoming, inclusive, and respectful place. It’s important to communicate, to question, and to come together.

Please reach out on [this issue](https://github.com/tessel/project/issues/186), share your knowledge and use cases, and let us know what you think. We need to hear if you're excited, if you're unexcited, or if there's something in particular you want to do. Because in the end, the Tessel Project is built out of the community, and we can't do it without you.

See you soon.

Kelsey Breseman, on behalf of the Tessel Project Steering Committee
