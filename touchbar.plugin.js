//META{"name":"touchbar","website":"https://github.com/unknownguy2002/betterdiscord-touchbar","source":"https://github.com/unknownguy2002/betterdiscord-touchbar/touchbar.plugin.js"}*//

const { app, BrowserWindow, TouchBar, Tray, nativeImage } = require('electron').remote;
const { TouchBarLabel, TouchBarButton, TouchBarSpacer, TouchBarScrubber } = TouchBar;
const version = "1.0.0"

class touchbar {
    getName() { return "touchbar"; }
    getDescription() { return "Integration with the infamous mac touchbar(Which I have... I don't know if that's good or bad haha)."; }
    getVersion() { return version; }
    getAuthor() { return "unknownguy2002"; }

    load() {}

    start() {
        let libLoadedEvent = () => {
            try{ this.onLibLoaded(); }
            catch(err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); try { this.stop(); } catch(err) { console.error(this.getName() + ".stop()", err); } }
        };

		let lib = document.getElementById("NeatoBurritoLibrary");
		if(!lib) {
			lib = document.createElement("script");
			lib.id = "NeatoBurritoLibrary";
			lib.type = "text/javascript";
			lib.src = "https://rawgit.com/Metalloriff/BetterDiscordPlugins/master/Lib/NeatoBurritoLibrary.js";
			document.head.appendChild(lib);
		}
		this.forceLoadTimeout = setTimeout(libLoadedEvent, 30000);
        if(typeof window.NeatoLib !== "undefined") libLoadedEvent();
		else lib.addEventListener("load", libLoadedEvent);

    }
    onLibLoaded(){
        let touchBar = new TouchBar({
                items: [
                    new TouchBarLabel({
                        label: "[Discord]",
                        textColor: "#99AAB5"
                    }),
                    new TouchBarSpacer({
                        size: "large"
                    }),
                    new TouchBarLabel({
                        label: String(Object.keys(NeatoLib.Modules.get("getGuilds").getGuilds()).length)+" Guilds",
                        textColor: "#7289DA"
                    }),
                    new TouchBarSpacer({
                        size: "large"
                    }),
                    new TouchBarLabel({
                        label: "Guild Name",
                        textColor: "#FFFFFF"
                    }),
                    new TouchBarLabel({
                        label: "#Channel Name",
                        textColor: "#FFFFFF"
                    }),
                ]
        })
        BrowserWindow.getAllWindows()[0].setTouchBar(touchBar)
    }


    onSwitch(){
            let guildname = "Guild Name"
            let channelname = "Channel Name"
            if(BdApi.findModuleByProps("getGuild").getGuild(BdApi.findModuleByProps("getLastSelectedGuildId").getGuildId())){
                guildname = BdApi.findModuleByProps("getGuild").getGuild(BdApi.findModuleByProps("getLastSelectedGuildId").getGuildId()).name
            }
            if(BdApi.findModuleByProps("getChannel").getChannel(BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId())){
                channelname = BdApi.findModuleByProps("getChannel").getChannel(BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId()).name
            }
            let touchBar = new TouchBar({
                items: [
                    new TouchBarLabel({
                        label: "[Discord]",
                        textColor: "#99AAB5"
                    }),
                    new TouchBarSpacer({
                        size: "large"
                    }),
                    new TouchBarLabel({
                        label: String(Object.keys(NeatoLib.Modules.get("getGuilds").getGuilds()).length)+" Guilds",
                        textColor: "#7289DA"
                    }),
                    new TouchBarSpacer({
                        size: "large"
                    }),
                    new TouchBarLabel({
                        label: guildname,
                        textColor: "#FFFFFF"
                    }),
                    new TouchBarLabel({
                        label: "#"+channelname,
                        textColor: "#FFFFFF"
                    }),

                ]
            })
            BrowserWindow.getAllWindows()[0].setTouchBar(touchBar)
    }

    stop(){
        console.log("Stopped")
    }
}