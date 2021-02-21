/**
 * @author team C
 * @version 0.1
 */

const DataFromHospital = require('../models/DataFromHospital');



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

async function getTotalData(){
    let numberOfHospitalized = 0;
    let numberOfPeopleInRea = 0;
    let numberOfDeaths = 0;
    let numberOfRecovered = 0;
    let lastUpdateDate = "";
    const hospitalDataFromDatabase = await DataFromHospital.find();
    for (let data of hospitalDataFromDatabase){
        numberOfHospitalized += data['hosp'];
        numberOfPeopleInRea += data['rea'];
        numberOfDeaths += data['dc'];
        numberOfRecovered += data['rad'];
        lastUpdateDate = data['jour']
    }
    return {'numberOfHospitalized' : numberOfHospitalized, 'numberOfPeopleInRea': numberOfPeopleInRea, 'numberOfDeaths': numberOfDeaths, 'numberOfRecovered': numberOfRecovered, 'lastUpdateDate': lastUpdateDate};
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

async function getDataFromHospitalInDepartment(department) {
    let dataFromDepartment= [];
    await getDataFromHospital().then(
        value =>   {
            let size = value.length;

            //Never use for loop again in your life
            for (let index=0; index<size; index++) {
                let object = value[index];
                if (object.dep === department.toString()){
                    dataFromDepartment.push(object);
                }
            }
        }
    );
    return dataFromDepartment;
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

module.exports = {
    addDataFromHospital,
    getDataFromHospital,
    getDataFromHospitalBeforeDate,
    getDataFromHospitalInPeriod,
    getDataFromHospitalAfterDate,
    getTotalData
};
