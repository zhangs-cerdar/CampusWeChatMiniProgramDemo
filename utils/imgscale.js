
function imageUtil(e) {
  
  var originalWidth = e.detail.width;//图片原始宽
  var originalHeight = e.detail.height;//图片原始高
  var originalScale = originalHeight / originalWidth;//图片高宽比
  console.log('originalWidth: ' + originalWidth)
  console.log('originalHeight: ' + originalHeight)
  console.log('originalScale: ' + originalScale)
  return originalScale ;
}

module.exports = {
  imageUtil: imageUtil
}
