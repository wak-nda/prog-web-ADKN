/**
 * @author team C
 * @version 0.1
 */

import { DataFromHospital } from '../models/DataFromHospital.js';


/*************************************************************************************************
 *       ################################  DATA   ############################################   *
 *************************************************************************************************/

async function addDataFromHospital(dep,sexe,jour,hosp,rea,rad,dc) {
        await DataFromHospital.create({
            "dep": dep,
            "sexe": sexe,
            "jour": jour,
            "hosp": Number(hosp),
            "rea": Number(rea),
            "dc": Number(dc),
            "rad": Number(rad)
        }, function (err, user) {
            if (err) console.log(err);
        });
    return true;
}

async function getDataFromHospital(){
    return await DataFromHospital.find();
}

async function getDataFromHospitalAfterDate(date){
    const dateToCompare= Date.parse(date);
    let dataAfterDate= [];
    let data =  await DataFromHospital.find();
    for (const dataFromHospital in data) {
        if (Date.parse(dataFromHospital.jour)> dateToCompare){
            dataAfterDate.push(dataFromHospital);
        }
    }

    return dataAfterDate;
}

async function getDataFromHospitalBeforeDate(date){
    const dateToCompare= Date.parse(date);
    let dataBeforeDate= [];
    let data =  await DataFromHospital.find();
    for (const dataFromHospital in data) {
        if (Date.parse(dataFromHospital.jour)< dateToCompare){
            dataBeforeDate.push(dataFromHospital);
        }
    }

    return dataBeforeDate;
}

async function getDataFromHospitalInPeriod(startDate, endDate){
    const startDateToCompare= Date.parse(startDate);
    const endDateToCompare= Date.parse(endDate);
    let dataInPeriod= [];
    let data =  await DataFromHospital.find();
    for (const dataFromHospital in data) {
        if (Date.parse(dataFromHospital.jour)< endDateToCompare && Date.parse(dataFromHospital.jour)> startDate){
            dataInPeriod.push(dataFromHospital);
        }
    }

    return dataInPeriod;
}

export { addDataFromHospital, getDataFromHospital, getDataFromHospitalBeforeDate, getDataFromHospitalInPeriod, getDataFromHospitalAfterDate }
