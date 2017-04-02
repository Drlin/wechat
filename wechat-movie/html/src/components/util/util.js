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
    return arrEntities[t]
  })
}

function filterTag (str) {
  if (!str) {
    return str
  }
  return str.replace(/<\/?(script|style|iframe|frame)>/ig, '')
}

module.exports = {
  htmlDecode,
  filterTag
}
