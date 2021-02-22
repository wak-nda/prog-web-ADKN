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
            console.log(size);
            let counter = 0;
            let sexe = "";
            // let jour = ""
            for(let idx = 0; idx < size; idx++){
                if(value[idx]['sexe'] === '0'){
                    if(value[idx]['dep'] in intermediaire){
                        // console.log(intermediaire[value[idx]['dep']]);
                        // if(value[idx]['dep'] )
                        // if( value[idx]['rea'] > intermediaire[value[idx]['dep']]['rea']){
                        //     temp = value[idx]['rea'] - intermediaire[value[idx]['dep']]['rea'];
                        //     intermediaire[value[idx]['dep']]['rea'] += temp;
                        // }
                        // if( value[idx]['hosp'] > intermediaire[value[idx]['dep']]['hosp']){
                        //     temp = value[idx]['hosp'] - intermediaire[value[idx]['dep']]['hosp'];
                        //     intermediaire[value[idx]['dep']]['hosp'] += temp;
                        // }
                        // if( value[idx]['rad'] > intermediaire[value[idx]['dep']]['rad']){
                        //     temp = value[idx]['rad'] - intermediaire[value[idx]['dep']]['rad'];
                        //     intermediaire[value[idx]['dep']]['rad'] += temp;
                        // }
                        // if( value[idx]['dc'] > intermediaire[value[idx]['dep']]['dc']){
                        //     temp = value[idx]['dc'] - intermediaire[value[idx]['dep']]['dc'];
                        //     intermediaire[value[idx]['dep']]['dc'] += temp;
                        // }
                        // temp = value[idx]['rea'] + intermediaire[value[idx]['dep']]['rea'];
                        intermediaire[value[idx]['dep']]['rea'] = value[idx]['rea'];

                        // temphosp = value[idx]['hosp'] + intermediaire[value[idx]['dep']]['hosp'];
                        intermediaire[value[idx]['dep']]['hosp'] = value[idx]['hosp'];

                        // temprad = value[idx]['rad'] + intermediaire[value[idx]['dep']]['rad'];
                        intermediaire[value[idx]['dep']]['rad'] = value[idx]['rad'];

                        // tempdc = value[idx]['dc'] + intermediaire[value[idx]['dep']]['dc'];
                        intermediaire[value[idx]['dep']]['dc'] = value[idx]['dc'];
                    }else{
                        intermediaire[value[idx]['dep']] = {'rea': value[idx]['rea'], 'hosp': value[idx]['hosp'], 'rad': value[idx]['rad'], 'dc': value[idx]['dc'],}
                    }
                    
                    // if(counter < 10){
                    //     console.log(value[idx]['dc'] +'-'+ value[idx]['dep'])
                    //     counter += 1;
                    //     numberOfDeaths += value[idx]['dc']
                    // }else{

                    //     break;
                    // }
                    // numberOfDeaths += value[idx]['dc']
                    // numberOfHospitalized += value[idx]['hosp']
                    // numberOfPeopleInRea += value[idx]['rea']
                }
            }
            // for (let data of value){ 
            //     numberOfHospitalized += data['hosp'];
            //     numberOfPeopleInRea += data['rea'];
            //     numberOfDeaths += data['dc'];
            //     numberOfRecovered += data['rad'];
            //     lastUpdateDate = data['jour']
            // }
            console.log(intermediaire);
        }
    );
    for (var prop in intermediaire){
        numberOfPeopleInRea += intermediaire[prop]['dc'];
    }
    console.log(numberOfPeopleInRea);
    return [{'numberOfHospitalized' : numberOfHospitalized, 'numberOfPeopleInRea': numberOfPeopleInRea, 'numberOfDeaths': numberOfDeaths, 'numberOfRecovered': numberOfRecovered, 'lastUpdateDate': lastUpdateDate}];
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
