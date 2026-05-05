const mineflayer = require('mineflayer')
const express = require('express')

function startBot() {
  const bot = mineflayer.createBot({
    host: 'YOUR_SERVER_IP',
    port: 25565,
    username: 'AFK_Bot',
    version: false
  })

  bot.on('spawn', () => {
    console.log('Bot joined')

    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)

      bot.look(Math.random() * Math.PI * 2, Math.random() * 0.5)
    }, 30000)

    setInterval(() => {
      bot.setControlState('forward', true)
      setTimeout(() => bot.setControlState('forward', false), 2000)
    }, 60000)
  })

  bot.on('end', () => {
    setTimeout(startBot, 5000)
  })
}

startBot()

const app = express()
app.get('/', (req, res) => res.send('Bot alive'))
app.listen(3000)
