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
    let intermediaire = {};
    await DataFromHospital.find().then(
        value => {
            let size = value.length;
            for(let idx = 0; idx < size; idx++){
                if(value[idx]['sexe'] === '0'){
                    if(value[idx]['dep'] in intermediaire){
                        intermediaire[value[idx]['dep']]['rea'] = value[idx]['rea'];

                        intermediaire[value[idx]['dep']]['hosp'] = value[idx]['hosp'];

                        intermediaire[value[idx]['dep']]['rad'] = value[idx]['rad'];

                        intermediaire[value[idx]['dep']]['dc'] = value[idx]['dc'];
                    }else{
                        intermediaire[value[idx]['dep']] = {'rea': value[idx]['rea'], 'hosp': value[idx]['hosp'], 'rad': value[idx]['rad'], 'dc': value[idx]['dc']}
                    }
                }
            }
        }
    );
    for (var prop in intermediaire){
        numberOfDeaths += intermediaire[prop]['dc'];
        numberOfRecovered += intermediaire[prop]['rad'];
        numberOfHospitalized += intermediaire[prop]['hosp'];
        numberOfPeopleInRea += intermediaire[prop]['rea'];
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

const dataFranceFromJson = require('../../data/contrib-data.json')

async function getFranceData(){
    const size = dataFranceFromJson.length
    return dataFranceFromJson[size - 1]
}

module.exports = {
    addDataFromHospital,
    getDataFromHospital,
    getDataFromHospitalBeforeDate,
    getDataFromHospitalInPeriod,
    getDataFromHospitalAfterDate,
    getTotalData,
    getFranceData
};
