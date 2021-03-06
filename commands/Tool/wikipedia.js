const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['wiki'],
      description: language => language.get('COMMAND_WIKIPEDIA_DESCRIPTION'),
      usage: '<query:str>'
    })
  }

  async run(messsage, [query]) {
    const article = await fetch(`${this.client.fun.wiki(messsage.guild.settings.language)}/${encodeURIComponent(query)}`)
      .then(response => response.json())
      .catch(() => { throw 'I couldn\'t find a wikipedia article with that title!' })
    if (article.type === 'https://mediawiki.org/wiki/HyperSwitch/errors/not_found') {
      return messsage.sendEmbed(new MessageEmbed()
        .setColor('#ff0000')
        .setThumbnail('https://i.imgur.com/fnhlGh5.png')
        .setTitle('Not found.')
        .setDescription('Page or revision not found.')
      )
    }
    const embed = new MessageEmbed()
      .setColor('#0077ff')
      .setThumbnail((article.thumbnail && article.thumbnail.source) || 'https://i.imgur.com/fnhlGh5.png')
      .setURL(article.content_urls.desktop.page)
      .setTitle(article.title)
      .setDescription(article.extract)
    return messsage.sendEmbed(embed)
  }
}