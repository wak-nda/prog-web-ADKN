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
    await DataFromHospital.find().limit(10000).then(
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
    const size = dataFranceFromJson.length;
    return dataFranceFromJson[size - 1]
}

async function getDailyDataFrance(){
    return dataFranceFromJson.filter(r => r.code === 'FRA' && r.deces !== undefined && r.sourceType ==="ministere-sante");
}

async function getTotalDataFromHosptitalInRegions(){
    let depIntermediaire = {};
    let regionIntermediaire = [];

    await DataFromHospital.find().limit(10000).then(
        value => {
            let size = value.length;
            for(let idx = 0; idx < size; idx++){
                if(value[idx]['sexe'] === '0'){
                    if(value[idx]['dep'] in depIntermediaire){
                        depIntermediaire[value[idx]['dep']]['rea'] += value[idx]['rea'];

                        depIntermediaire[value[idx]['dep']]['hosp'] += value[idx]['hosp'];

                        depIntermediaire[value[idx]['dep']]['rad'] = value[idx]['rad'];

                        depIntermediaire[value[idx]['dep']]['dc'] = value[idx]['dc'];

                        depIntermediaire[value[idx]['dep']]['jour'] = value[idx]['jour'];
                    }else{
                        depIntermediaire[value[idx]['dep']] = {'rea': value[idx]['rea'], 'hosp': value[idx]['hosp'], 'rad': value[idx]['rad'], 'dc': value[idx]['dc'], 'jour': value[idx]['jour']}
                    }
                }
            }
        }
    );
    const depKeysData = Object.keys(depIntermediaire); 
    for (let idxKey = 0; idxKey < depKeysData.length; idxKey++){
        let depKey = depKeysData[idxKey]
        let region = findRegion(depKey);
        let sizeRegion = regionIntermediaire.length
        if(sizeRegion === 0){
            regionIntermediaire.push({'regionName': region,'numberOfPeopleInRea': depIntermediaire[depKey]['rea'], 'numberOfHospitalized': depIntermediaire[depKey]['hosp'], 'numberOfRecovered': depIntermediaire[depKey]['rad'], 'numberOfDeaths': depIntermediaire[depKey]['dc'], 'jour': depIntermediaire[depKey]['jour']})
        }
        else{
            const foundReg = regionIntermediaire.find(reg => reg.regionName === region)
            if(foundReg){
                foundReg['numberOfPeopleInRea'] += depIntermediaire[depKey]['rea'];
                foundReg['numberOfHospitalized'] += depIntermediaire[depKey]['hosp'];
                foundReg['numberOfDeaths'] += depIntermediaire[depKey]['dc']
                foundReg['numberOfRecovered'] += depIntermediaire[depKey]['rad']
                foundReg['jour'] = depIntermediaire[depKey]['jour']
            }else{
                regionIntermediaire.push({'regionName': region,'numberOfPeopleInRea': depIntermediaire[depKey]['rea'], 'numberOfHospitalized': depIntermediaire[depKey]['hosp'], 'numberOfRecovered': depIntermediaire[depKey]['rad'], 'numberOfDeaths': depIntermediaire[depKey]['dc'], 'jour': depIntermediaire[depKey]['jour']})
            }
        }
    }
    return regionIntermediaire
}

async function getDailyDataFromHosptitalInRegions(){
    let regionIntermediaire = [];
    await DataFromHospital.find().then(
        value => {
            let size = value.length;
            for(let idx = 0; idx < size; idx++){
                if(value[idx]['sexe'] === '0'){
                    let region = findRegion(value[idx]['dep']);
                    let sizeRegion = regionIntermediaire.length
                    if(sizeRegion === 0){
                        regionIntermediaire.push({'regionName': region, 'dailyDatas': [{'rea': value[idx]['rea'], 'hosp': value[idx]['hosp'], 'rad': value[idx]['rad'], 'dc': value[idx]['dc'], 'jour': value[idx]['jour']}]})
                    }else {
                        const foundReg = regionIntermediaire.find(reg => reg.regionName === region)
                        if(foundReg){
                            lastElementIdx = foundReg.dailyDatas.length - 1;
                            lastElementDay = foundReg.dailyDatas[lastElementIdx]['jour']
                            if(lastElementDay == value[idx]['jour']){
                                foundReg.dailyDatas['rea'] += value[idx]['rea'];
                                foundReg.dailyDatas['hosp'] += value[idx]['hosp'];
                                foundReg.dailyDatas['dc'] += value[idx]['dc']
                                foundReg.dailyDatas['rad'] += value[idx]['rad']
                            }else{
                                foundReg.dailyDatas.push({'rea': value[idx]['rea'], 'hosp': value[idx]['hosp'], 'rad': value[idx]['rad'], 'dc': value[idx]['dc'], 'jour': value[idx]['jour']})
                            }
                        }else{
                            regionIntermediaire.push({'regionName': region, 'dailyDatas': [{'rea': value[idx]['rea'], 'hosp': value[idx]['hosp'], 'rad': value[idx]['rad'], 'dc': value[idx]['dc'], 'jour': value[idx]['jour']}]})
                        }
                    }
                }
            }
        }
    );
    return regionIntermediaire
}

function findRegion(dep){
    const auvergneRhoneAlpes = ["01","03","07","15","26","38","42","43","69","63","73","74"];
    const bourgogneFrancheComte = ["21","25","39","58","70","71","89","90"];
    const bretagne = ["22","29","35","56"];
    const centreValDeLoire = ["18","28","36","37","41","45"]
    const corse = ["2A","2B"]
    const grandEst = ["08","10","51","52","54","55","57","67","68","88"]
    const hautsDeFrance = ["02","59","60","62","80"]
    const ileDeFrance = ["75","77","78","91","92","93","94","95"];
    const normandie = ["14","27","50","61","76"]
    const nouvelleAquitaine = ["16","17","19","23","24","33","40","47","64","79","86","87"]
    const occitanie = ["09","11","12","30","31","32","34","46","48","65","66","81","82"]
    const paysDeLaLoire = ["44","49","53","72","85" ]
    const provenceAlpesCoteDazur = ["04","05","06","13","83","84"]
    const guadeloupe = ["971"]
    const martinique = ["972"]
    const guyane = ["973"] 
    const laReunion = ["974"]
    const mayotte = ["976"]
    if(auvergneRhoneAlpes.includes(dep)){
        return "Auvergne-Rhône-Alpes";
    }
    if(bourgogneFrancheComte.includes(dep)){
        return "Bourgogne-Franche-Comté";
    }
    if(bretagne.includes(dep)){
        return "Bretagne";
    }
    if(centreValDeLoire.includes(dep)){
        return "Centre-Val de Loire";
    }
    if(corse.includes(dep)){
        return "Corse";
    }
    if(grandEst.includes(dep)){
        return "Grand Est";
    }
    if(hautsDeFrance.includes(dep)){
        return "Hauts-de-France";
    }
    if(ileDeFrance.includes(dep)){
        return "Île-de-France";
    }
    if(normandie.includes(dep)){
        return "Normandie";
    }
    if(nouvelleAquitaine.includes(dep)){
        return "Nouvelle-Aquitaine";
    }
    
    if(occitanie.includes(dep)){
        return "Occitanie";
    }
    if(paysDeLaLoire.includes(dep)){
        return "Pays de la Loire";
    }
    if(provenceAlpesCoteDazur.includes(dep)){
        return "Provence-Alpes-Côte d'Azur";
    }
    if(guadeloupe.includes(dep)){
        return "Guadeloupe";
    }
    if(martinique.includes(dep)){
        return "Martinique";
    }
    if(guyane.includes(dep)){
        return "Guyane";
    }
    if(laReunion.includes(dep)){
        return "La Réunion";
    }
    if(mayotte.includes(dep)){
        return "Mayotte";
    }
            
}

async function sumDataByDepartment(dep){
    return await DataFromHospital
        .aggregate([
            { $match: { dep: dep.toString() } },
            {
                $group:
                    {
                        _id: dep.toString(),
                        sum_rea: { $sum: '$rea' },
                        sum_hosp: { $sum: '$hosp' },
                        sum_rad: { $sum: '$rad' },
                        sum_dc : { $sum: '$dc' }
                    }
            }
        ])
        .exec();
}

module.exports = {
    addDataFromHospital,
    getDataFromHospital,
    getDataFromHospitalBeforeDate,
    getDataFromHospitalInPeriod,
    getDataFromHospitalAfterDate,
    getTotalData,
    getFranceData,
    getDailyDataFrance,
    getTotalDataFromHosptitalInRegions,
    getDailyDataFromHosptitalInRegions,
    sumDataByDepartment
};
