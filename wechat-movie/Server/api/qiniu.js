const qiniu = require("qiniu");

qiniu.conf.ACCESS_KEY = 'C51ie9211SP_Focs2fgz31iwqLRVsahJsLy4tmjp';
qiniu.conf.SECRET_KEY = 'f7HjCzo7NT31zPs7WuoYkgMLp_9sD-h7PhicFIAI';

module.exports = {
  uptoken (key) {
    const putPolicy = new qiniu.rs.PutPolicy('wexin'+":"+key);
    return putPolicy.token();
  },
  uploadFile (uptoken, key, localFile) => {
    const extra = new qiniu.io.PutExtra();
      return new Promise((resolve, reject) => {
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
          if(!err) {
            resolve(ret.hash, ret.key, ret.persistentId);       
          } else {
            reject(err);
          }
        });
      })
  }
}