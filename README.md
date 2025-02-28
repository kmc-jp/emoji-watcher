npm i && npm run start

## Scope
- Enable Socket mode
- Bot Token Scopes
  - emoji:read
  - chat:write
  - groups:history
  - groups:write
  - im:history
  - mpim:history
- Event Subscriptions
  - emoji_changed
  - message.channels
  - message.groups
  - message.im
  - message.mpim

## Reference
- https://tools.slack.dev/bolt-js/getting-started/
- https://api.slack.com/events
- https://api.slack.com/events/emoji_changed

## Deploymenbt

## Deployment

see: <https://scrapbox.io/kmc/%E9%83%A8%E5%86%85%E3%81%A7%E5%8B%95%E3%81%8F%E5%8B%95%E7%9A%84Web%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E7%AB%8B%E3%81%A6%E3%82%8B%E6%96%B9%E6%B3%95>

on ringo
```
git clone git@github.com:kmc-jp/emoji-watcher.git
cd emoji-watcher
npm i
```

`~/.config/systemd/user/emoji-watcher.service`

```
 [Unit]
 Description=emoji watcher

 [Service]
 EnvironmentFile=/home/segre/channel-watcher/.env
 ExecStart=node /home/segre/channel-watcher/app.js

 [Install]
 WantedBy=default.target
```

```
systemctl --user daemon-reload
loginctl enable-linger $USER
systemctl --user enable --now channel-watcher.service
systemctl --user status channel-watcher.service
```
