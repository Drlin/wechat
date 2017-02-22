'use strict'

module.exports = {
	'button': [
	{
		'name': '点击事件',
		'type': 'click',
		'key': 'menu_click'
	}, 
	{
		'name': '点出菜单',
			'sub_button': 
			[
				{
					'name': '跳转url',
					'type': 'view',
					'url': 'http://github.com'
				},
				{
					'name': '弹出系统拍照',
					'type': 'pic_sysphoto',
					'key': 'pic_photo'
				},{
					'name': '弹出系统拍照或者相册',
					'type': 'pic_photo_or_album',
					'key': 'pic_photo_album'
				}
			]
		},{
			'name': '地理位置选择',
			'type': 'location_select',
			'key': 'location_select'
		}
	]
}