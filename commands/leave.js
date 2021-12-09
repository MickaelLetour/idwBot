module.exports = {
    name : 'leave',
    description : 'Stop the bot and leave the channel',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
        
        if (!voiceChannel) {
            return message.channel.send('Vous devex être dans un salon vocal pour exécuter cette commande')
        } else {
            await voiceChannel.leave();
            await message.channel.send('Leaving channel :smiling_face_with_tear:');
        }
    }
}