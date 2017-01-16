# Tessel's Security Scorecard

In late October of 2016, an estimated 100,000 Internet-connectied devices were used by a group of hackers to attack DNS services as a distributed denial-of-service (DDoS). These devices, mostly routers, printers, and IP cameras, were infected with malware called Mirai, allowing the hackers to take control of those devices and cause outages for major services, like Twitter, Netflix, Spotify, Airbnb, Reddit, Etsy, SoundCloud and The New York Times. 

Now that it is known how Mirai managed to infect all of these Internet-connected devices, Sparkfun wrote about ["5 Easy Ways to Secure Your IoT Devices"](https://www.sparkfun.com/news/2264). The Tessel team has always been proud of the Tessel 2's out-of-the-box experience, so we wanted show off the board's security scorecard based on Sparkfun's list. 

1. Unplug It
2. Power Cycle
3. Change The Default Password
4. Update Firmware
5. Disable Universal Plug and Play (UPnP)
6. (Bonus) Disable Telnet and SSH

## Unplug It

> The best possible safeguard against hackers is to simply not have the device available for them.

You control where to power Tessel and even how to power it. Battery, wall socket, or personal computer, you can unplug Tessel anytime.

## Power Cycle

> Another interesting aspect of some malware like Mirai is that it only lives in volatile memory (e.g., RAM). That means simply turning off the device and turning it back on again will rid it of the malware

 There is a handy `t2-cli` command for doing this: `t2 reboot`

## Change the Default Password

> Seriously, if you do only one thing to secure your device, do this.

We did! Our [provisioning system](https://tessel.gitbooks.io/t2-docs/content/API/CLI.html#lan) is the only way to access the root system of Tessel over a network and requires a physical connection, like USB, to set up.

## Update Firmware

> it won’t be long before we start seeing attacks that target IoT services and open ports as potential means for intrusion

Tessel runs an open-source, embedded Linux distribution called [OpenWRT](https://openwrt.org), an actively maintained projects with frequent updates. We watch for security patches and keep our [version](https://github.com/tessel/openwrt-tessel) updated as needed. 

## Disable UPnP

> The biggest security flaw in UPnP is that programs inside your network can automatically request port forwarding from the router.

We ship Tessel without any support for UPnP, as evidenced by the [config files in our `openwrt-tessel` repo](https://github.com/tessel/openwrt-tessel/tree/master/files/etc/config). OpenWRT requires the [miniupnpd package and corresponding config file](https://wiki.openwrt.org/doc/howto/upnp) to enable UPnP. 

## (Bonus) Disable Telnet and SSH

> Mirai actually did its dirty work by trying to access a device through Telnet or SSH using default credentials.

We literally have a commit to our `openwrt-tessel` repo to [disable telnet](https://github.com/tessel/openwrt-tessel/blob/master/files/etc/init.d/telnet). As mentioned before, `ssh` is not disabled but it is only allowed by devices [provisioned with a shared key](https://tessel.gitbooks.io/t2-docs/content/API/CLI.html#lan). That process can only happen using `t2-cli` over a physical, USB connection, meaning no root access for rouge, third-party bots scavenging the Internet. 

## Wrap Up

Thank you Sparkfun for sharing that awesome post. Be sure to review all your Internet-connected devices' security scorecard and rest assured that the Tessel project is focused on keeping our boards secure. Check out the [Johnny-Five Inventor's Kit](https://www.sparkfun.com/products/13847) to start creating your own IoT projects and experiment. Join the [Tessel community](https://tessel.io/community) to learn more about what other people are building and how to start contributing to the Tessel project.
