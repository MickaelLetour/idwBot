module.exports = {
    //information of module
    name : 'clear',
    description : 'Clear messages!',

    //function excute when command matches
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
            //got the number of user message and delete the messages if the messages dates less than 14 days
            await message.channel.messages.fetch({limit: args[0]})
                .then(messages => { 
                    message.channel.bulkDelete(messages, true);
                })
        }
    }
}