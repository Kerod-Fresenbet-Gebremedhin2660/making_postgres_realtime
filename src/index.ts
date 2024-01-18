import {Elysia} from "elysia";
import {
    cleanUpListeners,
    registerListeners,
    registerNotifications,
    setupPostgresRealTime,
} from "./realtime.ts";
import { cors } from '@elysiajs/cors';
import { Stream } from '@elysiajs/stream'

export const app = new Elysia();

app.derive(({ headers }) => {
    return headers;
});

app.use(cors());


app.get('/sse', ({headers}) => new Stream(async (stream) => {
    console.log(headers);
    stream.send('hello')

    await stream.wait(1000)

    stream.send('world')

    stream.close()
}))


app.listen(3001, async () => {
    await setupPostgresRealTime();
    console.log("started elysia doc project");
});
