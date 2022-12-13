
// function getDate(){
// var today = new Date();
// let options  = {
//     weekday:"long",
//     day:"numeric",
//     month:"long"
// };
// let day = today.toLocaleString("en-US",options)
// return day;
// }

// module.exports = getDate;



function getDate(){
    var today = new Date();
    let options  = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    let day = today.toLocaleString("en-US",options)
    return day;
    }
    
    module.exports = getDate;