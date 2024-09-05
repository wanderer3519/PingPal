import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

// Create a new instance of Pusher
export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "ap2",
    useTLS: true
});

// Create a new instance of PusherClient
export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, { cluster: "ap2" });