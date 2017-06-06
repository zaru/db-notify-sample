const redis = require("redis"),
      client = redis.createClient({ host: "redis", port: 6379 })

client.on("connect", () => {
  console.log("Connected")
})

client.on("error", (err) => {
    console.log("Error " + err)
})

// keyspace notificationsで変更イベントを受け取る
// ただしvalueは受け取れない
client.on("pmessage", (pattern, channel, message) => {
  console.log(pattern + " " + channel + " " + message)
})
client.psubscribe("__keyevent@0__:*")
client.psubscribe("__keyspace@0__:*")
