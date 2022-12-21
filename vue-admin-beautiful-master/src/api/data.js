import request from '@/utils/request'

export function getCombo(data){
    return request({
        url:'/combo',
        method:'GET',
        params:{
            cityName:data,
        }
    })
}
export function getRecommend(city,num,data){
    return request({
        url:'/recommend',
        method:'GET',
        params:{
            cityName:city,
            number:num,
            word:data
        }
    })
}
export function getAccomodation(city,distri,d,data){
    return request({
        url:'/accomodation',
        method:'GET',
        params:{
            cityName:city,
            district:distri,
            date:d,
            word:data
        }
    })
}
export function getCategory(){
    return request({
        url:'/guide/category',
        method:'GET',
    })
}
export function getGuide(city,distri,c,number,data){
    return request({
        url:'/guide',
        method:'GET',
        params:{
            cityName:city,
            district:distri,
            category:c,
            num:number,
            word:data
        }
    })
}
export function getLikes(data){
    return request({
        url:'/user/userimg',
        method:'GET',
        params:{
            username:data
        }
    })
}