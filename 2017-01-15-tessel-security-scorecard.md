# Tessel's Security Scorecard

In late October of 2016, an estimated [100,000 Internet-connected devices](http://dyn.com/blog/dyn-analysis-summary-of-friday-october-21-attack/) were used by a group of hackers to attack DNS services as a distributed denial-of-service (DDoS). These devices, mostly routers, printers, and IP cameras, were infected with malware called [Mirai](https://en.wikipedia.org/wiki/Mirai_(malware)), allowing the hackers to take control of those devices and cause outages for major services, like Twitter, Netflix, Spotify, Airbnb, Reddit, Etsy, SoundCloud and The New York Times. 

Since the attack, [Mirai's source code has been released](https://krebsonsecurity.com/2016/10/source-code-for-iot-botnet-mirai-released/) and revealed how it managed to infect all of these Internet-connected devices. With this knowledge, SparkFun wrote about ["5 Easy Ways to Secure Your IoT Devices"](https://www.sparkfun.com/news/2264).  We checked the Tessel against SparkFun's security scorecard to see if an out-of-the-box Tessel is vulnerable to a Mirai-type attack. 

## SparkFun's List

1. Unplug It
2. Power Cycle
3. Change The Default Password
4. Update Firmware
5. Disable Universal Plug and Play (UPnP)
6. (Bonus) Disable Telnet and SSH


### Unplug It

> The best possible safeguard against hackers is to simply not have the device available for them.

You may not need to directly unplug your Tessel in order to follow this tip. Instead, you can use Tessel's [network API](https://tessel.gitbooks.io/t2-docs/content/API/Network_API.html#wifi) to control when the board is connected to your network. Tessel can be programmed to disconnect from the network during certain times of day or night, or through some type of hardware control, like a big red button shown in SparkFun's article.

### Power Cycle

> Another interesting aspect of some malware like Mirai is that it only lives in volatile memory (e.g., RAM). That means simply turning off the device and turning it back on again will rid it of the malware

When you deploy your project to Tessel's Flash memory, consider including a periodic auto-reboot to clear anything that may have been introduced to RAM. This is easy with the Tessel [power management API](https://tessel.gitbooks.io/t2-docs/content/API/Hardware_API.html#board).

### Change the Default Password

> Seriously, if you do only one thing to secure your device, do this.

Tessel doesn't come with a default password because of this specific security consideration. Our [provisioning system](https://tessel.gitbooks.io/t2-docs/content/API/CLI.html#lan) is the only way to access the root system of Tessel over a network and requires a physical, USB connection to set up.

### Update Firmware

> ... it won’t be long before we start seeing attacks that target IoT services and open ports as potential means for intrusion.

Tessel runs an open-source, embedded Linux distribution called [OpenWRT](https://openwrt.org), an actively maintained project with frequent updates. We watch for security patches and keep our [version](https://github.com/tessel/openwrt-tessel) updated as needed. Once these updates are released, the [Tessel CLI](https://tessel.gitbooks.io/t2-docs/content/API/CLI.html#how-do-i-know-if-i-need-to-update-my-t2) will automatically inform you when it's available. 

### Disable UPnP

> The biggest security flaw in UPnP is that programs inside your network can automatically request port forwarding from the router.

Following the [recommendation in OpenWRT documentation](https://wiki.openwrt.org/doc/howto/upnp), Tessel ships without any support for UPnP, as evidenced by the [config files in our `openwrt-tessel` repo](https://github.com/tessel/openwrt-tessel/tree/master/files/etc/config). OpenWRT requires the [miniupnpd package and corresponding config file](https://wiki.openwrt.org/doc/howto/upnp) to enable UPnP. 

### (Bonus) Disable Telnet and SSH

> Mirai actually did its dirty work by trying to access a device through Telnet or SSH using default credentials.

We have a commit to our `openwrt-tessel` repo to [disable telnet](https://github.com/tessel/openwrt-tessel/blob/master/files/etc/init.d/telnet). As mentioned before, `ssh` is not disabled but it is only allowed by devices [provisioned with a shared key](https://tessel.gitbooks.io/t2-docs/content/API/CLI.html#lan). The Tessel team is against `ssh` with passwords, which is why we require that shared key creation through `t2-cli` over a physical, USB connection, meaning no root access for rogue, third-party bots scavenging the Internet. 

## Wrap Up

Thank you, SparkFun, for sharing that awesome post. Be sure to review all your Internet-connected devices' security scorecard and rest assured that the Tessel project is focused on keeping our boards secure. 

Check out the [Johnny-Five Inventor's Kit](https://www.sparkfun.com/products/13847) to start creating your own IoT projects and experiment. Join the [Tessel community](https://tessel.io/community) to learn more about what other people are building and how to start contributing to the Tessel project. 
