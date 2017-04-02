function htmlDecode (str) {
  if (!str) {
    return str
  }
  const arrEntities = {
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'amp': '&',
    'quot': '"'
  }
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, (all, t) => {
    console.log(all, t)
    return arrEntities[t]
  })
}

module.exports = {
  htmlDecode
}
