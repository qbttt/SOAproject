import service from '@/utils/travleNews.js'

export function getNews(n,data){
    return service({
        url:'/index',
        method:'GET',
        headers:{
            "key":"76da367f17de4d0347be508f89612284"
          },
        params:{
            word:data,
            num:n
        }
    })
}
