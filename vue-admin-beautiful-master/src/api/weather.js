import service1 from '../utils/weatherrequest.js'


export function getWeather(data){
    return service1({
        url:'/simpleWeather/query',
        method:'GET',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        params:{
            key:"3d4ba2cee9fd6ccbc03651e489df0e3e",
            city:data,
        }
    })
}

export function getLife(data){
    return service1({
        url:'simpleWeather/life',
        method:'GET',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        params:{
            key:"3d4ba2cee9fd6ccbc03651e489df0e3e",
            city:data,
        }
    })
}