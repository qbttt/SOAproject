import service from '@/utils/myrequest'

export function getCombo(data){
    return service({
        url:'/combo',
        method:'GET',
        params:{
            cityName:data,
        }
    })
}
export function getRecommend(city,num,data){
    return service({
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
    return service({
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
    return service({
        url:'/guide/category',
        method:'GET',
    })
}
export function getGuide(city,distri,c,number,data){
    return service({
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
    return service({
        url:'/user/userimg',
        method:'GET',
        params:{
            username:data
        }
    })
}