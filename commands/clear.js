const { DiscordAPIError } = require("discord.js")

module.exports = {
    name : 'clear',
    description : 'Clear messages!',
    async execute(message, args){
        if(!args[0]){
            return message.reply("Rentrez le nombre de messages a supprimer")
        } else if(isNaN(args[0])){
            return message.reply("Rentrez un nombre")
        } else if(args[0] > 20){
            return message.reply("Je ne peux supprimer plus de 20 messages a la fois")
        } else if(args[0] < 1){
            return message.reply("Vous devez supprimer au moins 1 message")
        } else {
            await message.channel.messages.fetch({limit: args[0]})
                .then(messages => { 
                    message.channel.bulkDelete(messages, true);
                })
        }
    }
}