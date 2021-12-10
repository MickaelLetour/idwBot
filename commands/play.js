//necessary for youtube Search by link or keywords
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    //information of module
    name : 'play',
    description : 'Joins and play a video from youtube',

    /**
     * function excute when command matches
     * @param {*} message 
     * @param {*} args 
     * @returns 
     */
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;// the vocalChannel of user

        /**
         * check if the link param is correct
         * @param {*} str 
         * @returns 
         */
        const validUrl = (str) => {
            var regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
            if (!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }

        /**
         * Got the first video of the video list got by keyword
         * @param {*} query 
         * @returns 
         */
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            //return first video of a list if found
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        /**
         * start the bot with the song in the channel
         * @param {*} arg 
         */
        const streaming = async (arg) => {
            const connection = await voiceChannel.join();//bot join the same channel of user
            const stream = ytdl(arg, {filter: 'audioonly'});//got the video transform to only song
            connection.play(stream, {Seek:0, volume: 1})//play the song
            .on('finish', () => {
                voiceChannel.leave();
                message.channel.send('leaving channel');
            });
        }

        if(!voiceChannel) {
            return message.channel.send('Vous avez besoin d\'être dans un salon vocal pour utilisez cette commande')
        } else if (!args.length){
            return message.channel.send('Vous devez précisez la musique recherchée');
        } else {

            //if the valid url
            if(validUrl(args[0])){
                await streaming(args[0]);
                await message.reply(`:thumbsup: Now playing ***Your Link!***`)
                return
            } else {//if not url but keywords
                const video = await videoFinder(args.join(' '));
                if(video){
                    streaming(video.url)
                    await message.reply(`:thumbsup: Now playing ***${video.title}***`);
                } else {
                    message.channel.send('pas de video trouve');
                    return
                }
            }
        }
    }
}