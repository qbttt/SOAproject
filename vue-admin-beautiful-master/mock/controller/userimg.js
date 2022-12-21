const data={
    'userlikelist':[
        "落日",
        "滑雪",
        "欢乐谷"
    ]
}
module.exports = [
    {
      url: '/user/userimg',
      type: 'get',
      response() {
        return {
          code: 200,
          msg: 'success',
          data,
        }
      },
    },
  ]