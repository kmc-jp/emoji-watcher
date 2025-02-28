require('dotenv').config();
const { App } = require('@slack/bolt');

// #emoji-watch
const NOTIFY_CHANNEL = "C1VMYMPN2";

const app = new App({
    socketMode: true,
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
});

app.view("modal-id", async ({ ack, view, logger }) => {
    logger.info(`Submitted data: ${view.state.values}`);
    await ack();
});

app.event("emoji_changed", async ({ event, client, logger }) => {
    try {
        var type = event.subtype;
        if (type === "add") {
            var name = event.name;
            var value = event.value;
            if (!value.includes("alias")) {
                const result = await client.chat.postMessage({
                    channel: NOTIFY_CHANNEL,
                    blocks: [
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: ":raising_hand: Added::" + name + ": (" + name + ")"
                            },
                            accessory: {
                                type: "image",
                                image_url: value,
                                alt_text: name
                            }
                        }
                    ]
                });
            }
            else{
                const result = await client.chat.postMessage({
                    channel: NOTIFY_CHANNEL,
                    text: ":raising_hand: Alias Added::" + name + ": (" + name + ")"
                });
            }
        }
        else if (type === "remove") {
            var name = event.names;
            const result = await client.chat.postMessage({
                channel: NOTIFY_CHANNEL,
                text: ":wave: Removed: " + name
            });
        }
    }
    catch (error) {
        logger.error(error);
    }
});

(async () => {
    await app.start();
    console.log('⚡️ Bolt app is running!');
})();
