(()=>{
  const r = require('rethinkdb')
  r.connect({
    host: "rethinkdb",
    port: 28015,
    db: 'test'
  }, function(err, conn) {
    console.log("Error: " + err)

    r.table('sample').filter({}).run(conn, (err, cursor) => {
      console.log("Error: " + err)

      cursor.toArray( (err, result) => {
        console.log("Error: " + err)
        console.log(JSON.stringify(result, null, 2));
      })
    });

    r.table("sample").changes().filter({}).run(conn, (err, cursor) => {
      cursor.on("data", (message) => {
        console.log(message)
      })
    })
  })

})()

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
