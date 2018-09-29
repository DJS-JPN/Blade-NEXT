const { Command } = require("klasa")
const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      enabled: true,
      runIn: ["text", "dm", "group"],
      description: language => language.get("COMMAND_ANIME_DESCRIPTION")
    })
  }

  async run(message) {
    const image =  await fetch("https://konachan.com/post.json?tags=order%3Arandom+rating:safe&limit=1").then(res => res.json())
    return message.channel.send(new MessageEmbed()
      .setAuthor(message.author.tag)
      .setImage(image[0]["file_url"])
    )
  }
}