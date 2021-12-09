const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name : 'play',
    description : 'Joins and play a video from youtube',
    async execute(message, args){
        queue = ['test'];
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) {
            return message.channel.send('Vous avez besoin d\'etre dans un salon vocal pour cette commande')
        } else if (!args.length){
            return message.channel.send('Vous devez precisez la musique recherche');
        } else {

            const validUrl = (str) => {
                var regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
                if (!regex.test(str)){
                    return false;
                } else {
                    return true;
                }
            }

            if(validUrl(args[0])){
                const connection = await voiceChannel.join();
                const stream = ytdl(args[0], {filter: 'audioonly'});

                connection.play(stream, {seek:0, volume: 1})
                .on('finish', () => {
                    voiceChannel.leave();
                    message.channel.send('leaving channel')
                });

                await message.reply(`:thumbsup: Now playing ***Your Link!***`)

                return
            }


            const connection = await voiceChannel.join();

            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query);

                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await videoFinder(args.join(' '));

            if(video){
                const stream = ytdl(video.url, {filter: 'audioonly'});
                connection.play(stream, {Seek:0, volume: 1})
                .on('finish', () => {
                    voiceChannel.leave();
                });

                await message.reply(`:thumbsup: Now playing ***${video.title}***`)
            } else {
                message.channel.send('pas de video trouve');
            }
        }
    }
}