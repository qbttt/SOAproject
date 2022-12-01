import service from '../utils/cityreuqest.js'


export function getCitylist(){
    return service({
        url:'/list',
        method:'GET',
        headers:{
            "app_id":"s030nllezpgsnstr",
            "app_secret":"Vi9MTFUzbjNZWE9Md3FReWVqYXZpQT09"
        },
        params:{
            
        }
    })
}