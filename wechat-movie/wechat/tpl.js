'use strict'

const ejs = require('ejs');
const heredoc = require('heredoc');

const tpl = heredoc(() => {/*
	<xml>
	<ToUserName><![CDATA[<%= ToUserName %>]]></ToUserName>
	<FromUserName><![CDATA[<%= FromUserName %>]]></FromUserName>
	<CreateTime><%= CreateTime %></CreateTime>
	<MsgType><![CDATA[<%= MsgType %>]]></MsgType>
	<%= if (MsgType === 'text') { %>
		<Content><![CDATA[<%= Content %>]]></Content>
	<%= } else if(MsgType === 'image') { %>
		<Image>
		<MediaId><![CDATA[<%= Content.media_id %>]]></MediaId>
		</Image>
	<%= } else if(MsgType === 'voice') { %>
		<Voice>
		<MediaId><![CDATA[<%= Content.media_id %>]]></MediaId>
		</Voice>
	<%= } else if(MsgType === 'video') { %>
		<Video>
		<MediaId><![CDATA[<%= Content.media_id %>]]></MediaId>
		<Title><![CDATA[<%= Content.title %>]]></Title>
		<Description><![CDATA[<%= Content.description %>]]></Description>
		</Video> 
	<%= } else if(MsgType === 'music') { %>
		<Music>
		<Title><![CDATA[<%= Content.title %>]]></Title>
		<Description><![CDATA[<%= Content.description %>]]></Description>
		<MusicUrl><![CDATA[<%= Content.MUSIC_Url %>]]></MusicUrl>
		<HQMusicUrl><![CDATA[<%= Content.HQ_MUSIC_Url %>]]></HQMusicUrl>
		<ThumbMediaId><![CDATA[<%= Content.media_id %>]]></ThumbMediaId>
		</Music>
	<%= } else if(MsgType === 'music') { %>
		<Music>
		<Title><![CDATA[<%= Content.title %>]]></Title>
		<Description><![CDATA[<%= Content.description %>]]></Description>
		<MusicUrl><![CDATA[<%= Content.MUSIC_Url %>]]></MusicUrl>
		<HQMusicUrl><![CDATA[<%= Content.HQ_MUSIC_Url %>]]></HQMusicUrl>
		<ThumbMediaId><![CDATA[<%= Content.media_id %>]]></ThumbMediaId>
		</Music>
	<%= } else if(MsgType === 'news') { %>
		<Articles>
		<%= Content.foreach(function(item) {) %>
			<item>
			<Title><![CDATA[<%= item.title %>]]></Title> 
			<Description><![<%= CDATA[item.description %>]]></Description>
			<PicUrl><![CDATA[<%= item.picurl %>]]></PicUrl>
			<Url><![CDATA[<%= item.url %>]]></Url>
			</item>
		<%= }) %>
		</Articles>
	<%= } %>
	</xml>
*/})

const compiled = ejs.compiled(tpl);

module.exports = {
	compiled
}