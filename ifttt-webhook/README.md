# Webhooks - P5 + Webhook Smart Lamp

My sketch for the **Webhooks: Connecting IFTTT and P5** module (Ambient Computing).

It is a little smart-lamp controller. Pressing the **UP arrow** sends a webhook
request that means the lamp is **ON**, and **DOWN** means **OFF**. My "new way"
twist: I drew a lightbulb you can also **click** to toggle the lamp, and the
whole canvas glows yellow when the lamp is on so I can see the state on screen.

## Note: IFTTT now costs money

The tutorial uses IFTTT, but IFTTT's free plan **no longer includes Webhooks** -
they now require a paid Pro plan. So I used **Pipedream** instead, which is free
and works exactly the same way:

```
P5.js (httpGet request)  ->  Webhook URL (trigger)  ->  Action (send me an email)
```

This is the same webhook idea the module teaches - my P5 sketch makes an HTTP
request to a URL, and that triggers an action somewhere else.

## How to run it

1. Put your webhook URL in `config.js` (see below).
2. Open `index.html` in a browser (or paste `sketch.js` into the
   [p5.js web editor](https://editor.p5js.org/)).
3. Press **UP** / **DOWN**, or **click the bulb**, to turn the lamp on and off.
   Open the console to see the `sent state=on` / `sent state=off` messages.

## The webhook I made (Pipedream - free)

1. Sign in at [pipedream.com](https://pipedream.com).
2. **New workflow** -> add a trigger -> **HTTP / Webhook** -> "New requests".
   Pipedream gives me a unique URL like `https://abc123.m.pipedream.net`.
3. Add a step -> **Email** -> "Send yourself an email".
4. **Deploy** the workflow.
5. Paste the URL into `config.js`.

My sketch adds `?state=on` or `?state=off` to the end of the URL so the webhook
knows which event happened.

> Want to follow the tutorial with IFTTT exactly? It's the same code - just use
> your IFTTT URL `https://maker.ifttt.com/trigger/turn_on/with/key/MY_KEY` as the
> `WEBHOOK_URL`. That needs IFTTT Pro (there is a 7-day free trial).

## Keeping my URL secret

My real webhook URL lives in `config.js`, which is listed in `.gitignore`, so it
is **not** uploaded to GitHub (same as I did for the weather widget). To run
this, make your own `config.js`:

```js
const config = {
  WEBHOOK_URL: "https://PASTE-YOUR-PIPEDREAM-URL.m.pipedream.net"
}
```

## What I did (assignment checklist)

- Used `keyPressed()` with `UP_ARROW` / `DOWN_ARROW` like the tutorial.
- Built the request URL and sent it with `httpGet(...)`.
- Connected P5 to a real webhook that runs an action (emails me).
- **New way:** added `mousePressed()` so clicking the bulb also triggers the
  webhook, and drew an on-screen lightbulb that glows with the lamp state.
- Used `print()` to confirm each request in the console.

## Preview

Lamp OFF | Lamp ON
:---:|:---:
![lamp off](preview-off.png) | ![lamp on](preview-on.png)
