## New Features: All About Reboots!

![img1][img1]
*We've come a long way*

A reboot (or *reset*), on the surface, seems like a trivial tasks, but as the image above illustrates along with the anecdotes below, they present unique challenges of their own.<sup>2</sup>

### TLDR
Recent updates have given the Tessel new superpowers. You can now reboot your tessel:<sup>1</sup>:
- Using the cli...`t2 reboot` (includes remote reboot via `--lan ` option)
- Or Javascript... `tessel.reboot()`
- And, my favorite, the reset button (labeled **SW401** on the board)

Now, lets take a closer look at what it took to bring these features to life...

---
# WORK IN PROGRESS START

The meat of this article should go over interesting bits of implementing the 3 features above.

    - The button. This is where it started. Started easy but two chips makes tessel tricky to reset
    - The javascript. I didnt really do this but still overcomes a problem. Used as cheat code for the cli.
    - The cli. Need to reset via usb *AND* wifi. 

Start with button. 
### Such a simple button for such a simple task
2 chips on tessel
diagram - https://docs.google.com/drawings/d/124Qrry4MCywzKJq1mQSo8Xwk_S58YT4IG4OHf_2oUWM/pub?w=960&h=720

There are different types of reboot types (hard vs soft reset)


# WORK IN PROGRESS END
---
### Fun Fact<sup>3</sup>

Ever wonder why certain USB pins are longer than the rest?

![img2][img2]
*After ~100 times of inserting the wrong way, you start to notice*

From [lammertbies.nl](https://www.lammertbies.nl/comm/cable/USB-connector.html)
> If you look carefully at the connector you will see that the pins for the power connection (pin 1 and 4) are slightly longer. This is done on purpose to first connect the power supply when connecting a USB device, and only afterwards establish the data connection. With this sequence the chance that the driver or receiver ports of the data connection receive awkward and possible dangerous voltages is lowered substantially.


Happy Hacking,
Daniel Buentello

[img1]:https://f4.bcbits.com/img/0005211988_10.jpg "We've come a long way"
[img2]:https://codingrush.files.wordpress.com/2014/05/usb_figure.png "Ever wonder why some USB pins are longer than the others?"


<sup>1</sup>Better wording. Somehow include version numbers released?

<sup>2</sup>Run on sentence

<sup>3</sup>Try to better tie this into reboot theme
