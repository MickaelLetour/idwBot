const play = require ('./play');

module.exports = {
     //information of module
    name : 'leave',
    description : 'Stop the bot and leave the channel',

    //function excute when command matches
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;// the vocalChannel of user
        
        //Bot leave the channel
        if (!voiceChannel) {
            return message.channel.send('Vous devex être dans un salon vocal pour exécuter cette commande')
        } else {
            play.queue =[];
            console.log(play.queue);
            await voiceChannel.leave();
            await message.channel.send('Leaving channel :smiling_face_with_tear:');
        }
    }
}