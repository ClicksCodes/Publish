Welcome to Publish!

> How do I setup the bot?

It's already setup! By just inviting the bot you've made your announcement
channels automatically publish any messages sent to them

> How do I exclude a channel?

You can exclude a channel from being automatically published by adding
`{no_autopublish}` to the topic. You can also exclude only bots by adding
`{no_autopublish:bots}` to the topic, and exclude only humans by adding
`{no_autopublish:humans}`

> How do I exclude a single message?

Starting a message with `=>` will stop it from being automatically published. Once
you've sent it you can edit away the `=>`` if you'd like

> The bot isn't working

Try publishing the message yourself. Often you'll be on a cooldown, at which
point the bot won't be able to publish a message. (The limit is 10 messages per
hour). Once the cooldown expires, we'll publish new messages again, and catch up
on messages we couldn't publish earlier because of the cooldown. If that doesn't
seem to be the issue, make sure that we've got manage messages in the
announcement channel, and that you're not disabling autopublishes in the topic

> I need more help

Join [our support server](https://discord.gg/bPaNnxe) or shoot us a support
email at [`support@clicks.codes`](mailto:support@clicks.codes)

> Can I get this bot in my own server?

Of course, [here's the invite
link](https://discord.com/oauth2/authorize?client_id=739472176633085972&scope=bot&permissions=24576)

Alternatively you can run your own copy using [the code on our
GitHub](https://github.com/ClicksMinutePer/Publish)
