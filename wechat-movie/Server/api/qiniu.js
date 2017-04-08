const qiniu = require("qiniu");
const config = require('../../wechat/config/config')
const Wechat = require('../../wechat/wechat')
const WechatApi = new Wechat(config.wechat);

qiniu.conf.ACCESS_KEY = 'C51ie9211SP_Focs2fgz31iwqLRVsahJsLy4tmjp';
qiniu.conf.SECRET_KEY = 'f7HjCzo7NT31zPs7WuoYkgMLp_9sD-h7PhicFIAI';

uploadFile = (uptoken, key, localFile) => {
  const extra = new qiniu.io.PutExtra();
  return new Promise((resolve, reject) => {
    qiniu.io.putFile(uptoken, key, localFile, extra, (err, ret) => {
      if(!err) {
        resolve(ret.persistentId);       
      } else {
        reject(err);
      }
    });
  })
}

module.exports = {
  *getMedia (media_id) {
    try {
      yield WechatApi.getMedia(media_id)
    } catch (e) {
      throw new Error('获取失败');
    }
    let key = `${media_id}.png`
    let uptoken = new qiniu.rs.PutPolicy('weixin'+":"+key).token();
    try {
      console.log(yield uploadFile(uptoken, key, `./image/${key}`))
    } catch (e) {
      throw new Error('获取失败');
    }
  }
}