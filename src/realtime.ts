import createSubscriber from "pg-listen"
import {dbUrl} from "./config.ts";
import {EChannelName} from "./types.ts";

export const subscriber = createSubscriber(
    {
        connectionString: dbUrl,
    }
);

async function registerNotifications() {
        subscriber.notifications.on(EChannelName.doc_insert_channel, (payload) => {
            if(payload) {

            }
        });
        subscriber.notifications.on(EChannelName.doc_update_channel, (payload) => {
            if(payload) {

            }
        });
        subscriber.notifications.on(EChannelName.doc_delete_channel, (payload) => {
            if(payload) {

            }
        });
        subscriber.notifications.on(EChannelName.doc_truncate_channel, (payload) => {
            if(payload) {

            }
        });
}

async function registerListeners() {
    await subscriber.listenTo(EChannelName.doc_insert_channel);
    await subscriber.listenTo(EChannelName.doc_update_channel);
    await subscriber.listenTo(EChannelName.doc_delete_channel);
    await subscriber.listenTo(EChannelName.doc_truncate_channel);
}

function cleanUpListeners() {
    subscriber.events.on("error", (error) => {
        console.error("Fatal database connection error:", error)
        process.exit(1)
    });

    process.on("exit", async () => {
        await subscriber.close()
    });
}

export async function setupPostgresRealTime() {
    try {
        await subscriber.connect();
        await registerListeners();
        cleanUpListeners();
    } catch (e) {
        console.log("EXCEPTION OCCURRED SETTING UP POSTGRES REAL TIME")
        process.exit(1);
    }

}
