import serviceTrain from "../utils/trainrequest.js";

export function getTrain(depart,arrive,date){
    return serviceTrain({
        url:'/yii.php',
        method:'GET',
        params:{
            r:'train/trainTicket/getTickets',
            "primary[departureDate]":date,
            "primary[departureCityName]":depart,
            "primary[arrivalCityName]":arrive
        }
    })
}