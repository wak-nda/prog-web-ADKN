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
    return DataFromHospital.find();
}

async function getDataFromHospitalAfterDate(date){
    console.log(date);
    const dateToCompare= Date.parse(date);

    let dataAfterDate= [];
    await getDataFromHospital().then(
      value =>   {
          let size = value.length;

          //Never use for loop again in your life
          for (let index=0; index<size; index++) {
              let object = value[index];
              if (Date.parse(object.jour)> dateToCompare){
                  dataAfterDate.push(object);
              }
          }
      }
    );


    return dataAfterDate;
}

async function getDataFromHospitalBeforeDate(date){
    const dateToCompare= Date.parse(date);
    let dataBeforeDate= [];
    await getDataFromHospital().then(
        value =>   {
            let size = value.length;

            //Never use for loop again in your life
            for (let index=0; index<size; index++) {
                let object = value[index];
                if (Date.parse(object.jour)< dateToCompare){
                    dataBeforeDate.push(object);
                }
            }
        }
    );

    return dataBeforeDate;
}

async function getDataFromHospitalInPeriod(startDate, endDate){
    const startDateToCompare= Date.parse(startDate);
    const endDateToCompare= Date.parse(endDate);
    let dataInPeriod= [];
    await getDataFromHospital().then(
    value =>   {
        let size = value.length;

        //Never use for loop again in your life
        for (let index=0; index<size; index++) {
            let object = value[index];
            if (Date.parse(object.jour)< endDateToCompare && Date.parse(object.jour)> startDate){
                dataInPeriod.push(object);
            }
        }
    }
);
      return dataInPeriod;
}

export { addDataFromHospital, getDataFromHospital, getDataFromHospitalBeforeDate, getDataFromHospitalInPeriod, getDataFromHospitalAfterDate }
