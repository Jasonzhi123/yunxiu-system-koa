const Router = require('koa-router')
const callCloudDB = require('@utils/callCloudBD')
const callCloudFn = require('@utils/callCloudFn')

const router = new Router({
  prefix: '/wxCloud/songSheet'
})

router.get('/list', async (ctx, next) => {
  const query = ctx.request.query
  console.log(query)
  const res = await callCloudFn(ctx, 'music', {
    $url: 'getSongSheetList',
    start: parseInt(query.start),
    count: parseInt(query.count)
  })
  console.log(res.data);
  // let data = []
  // if (res.resp_data) {
  //   data = JSON.parse(res.resp_data).data
  // }
  // ctx.body = {
  //   data,
  //   code: 20000,
  // }
})

// 通过ID获取详情
router.get('/getById', async (ctx, next) => {
  const query = `db.collection('songSheetList').doc('${ctx.request.query.id}').get()`
  const res = await callCloudDB(ctx, 'databasequery', query)
  console.log(res.data);
  ctx.body = {
    code: 200,
    data: JSON.parse(res.data.data)
  }
})

// 修改歌单详情
router.post('/updateSongSheetList', async (ctx, next) => {
  const params = ctx.request.body
  const query = `
      db.collection('songSheetList').doc('${params._id}').update({
          data: {
              name: '${params.name}',
              copywriter: '${params.copywriter}'
          }
      })
  `
  const res = await callCloudDB(ctx, 'databaseupdate', query)
  ctx.body = {
    code: 200,
    data: res
  }
})

module.exports = router