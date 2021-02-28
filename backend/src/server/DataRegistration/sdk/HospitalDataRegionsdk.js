const HospitalDataRegion = require('../models/HospitalDataRegion');

async function getTotalDataFromHosptitalInRegions(){
    let regionIntermediaire = [];
    let regions = ["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne", "Centre-Val de Loire",
                    "Corse", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur",
                    "Guadeloupe", "Martinique", "Guyane", "La Réunion", "Mayotte"]
    
    for(let r in regions){
        let tempObj = {
            'regionName': regions[r],
            'jour': '2021-02-21',
        }
        await HospitalDataRegion.aggregate([
            {"$match": {"reg": regions[r], "sexe": '0'}},
            {
                "$group": {
                    "_id": regions[r],
                    "sumHosp" : {$sum : '$hosp'},
                    "sumRea": {$sum: '$rea'}
                }
            }
        ])
        .exec()
        .then((rep) => {
            tempObj['numberOfPeopleInRea'] = rep[0].sumRea,
            tempObj['numberOfHospitalized'] = rep[0].sumHosp
        })
        .catch((err) => {
            throw err;
        });

        await HospitalDataRegion.aggregate([
            {"$match": {"reg": regions[r], "sexe": '0', "jour":"2021-02-21"}},
            {
                "$group": {
                    "_id": regions[r],
                    "sumRad" : {$sum : '$rad'},
                    "sumDc": {$sum: '$dc'}
                }
            }
        ])
        .exec()
        .then((rep) => {
            tempObj['numberOfRecovered'] = rep[0].sumRad,
            tempObj['numberOfDeaths'] = rep[0].sumDc
        })
        .catch((err) => {
            throw err;
        });
        regionIntermediaire.push(tempObj);
    }
    return regionIntermediaire
}

async function getDailyDataFromHosptitalInRegions(region){
    let regionIntermediaire = {'regionName': region, 'dailyDatas':[]};
    await HospitalDataRegion.find({"reg":region, "sexe":'0'}).exec().then((rep) => {
        // console.log(rep)
        for(let prop in rep){
            let sizeDatas = regionIntermediaire.dailyDatas.length
            if(sizeDatas === 0){
                regionIntermediaire = {'regionName': region, 'dailyDatas': [{'rea': rep[prop]['rea'], 'hosp': rep[prop]['hosp'], 'rad': rep[prop]['rad'], 'dc': rep[prop]['dc'], 'jour': rep[prop]['jour']}]};
            }else {
                lastElementIdx = regionIntermediaire.dailyDatas.length - 1;
                lastElementDay = regionIntermediaire.dailyDatas[lastElementIdx]['jour']
                // console.log(lastElementDay)
                if(lastElementDay == rep[prop]['jour']){
                    regionIntermediaire.dailyDatas['rea'] += rep[prop]['rea'];
                    regionIntermediaire.dailyDatas['hosp'] += rep[prop]['hosp'];
                    regionIntermediaire.dailyDatas['dc'] += rep[prop]['dc']
                    regionIntermediaire.dailyDatas['rad'] += rep[prop]['rad']
                }else{
                    regionIntermediaire.dailyDatas.push({'rea': rep[prop]['rea'], 'hosp': rep[prop]['hosp'], 'rad': rep[prop]['rad'], 'dc': rep[prop]['dc'], 'jour': rep[prop]['jour']})
                }
            }
        }
    })
       
    // await DataFromHospital.find().limit(10000).then(
    //     value => {
    //         let size = value.length;
    //         for(let idx = 0; idx < size; idx++){
    //             if(value[idx]['sexe'] === '0'){
    //                 let region = findRegion(value[idx]['dep']);
    //                 let sizeRegion = regionIntermediaire.length
    //                 if(sizeRegion === 0){
    //                     regionIntermediaire.push({'regionName': region, 'dailyDatas': [{'rea': value[idx]['rea'], 'hosp': value[idx]['hosp'], 'rad': value[idx]['rad'], 'dc': value[idx]['dc'], 'jour': value[idx]['jour']}]})
    //                 }else {
    //                     const foundReg = regionIntermediaire.find(reg => reg.regionName === region)
    //                     if(foundReg){
    //                         lastElementIdx = foundReg.dailyDatas.length - 1;
    //                         lastElementDay = foundReg.dailyDatas[lastElementIdx]['jour']
    //                         if(lastElementDay == value[idx]['jour']){
    //                             foundReg.dailyDatas['rea'] += value[idx]['rea'];
    //                             foundReg.dailyDatas['hosp'] += value[idx]['hosp'];
    //                             foundReg.dailyDatas['dc'] += value[idx]['dc']
    //                             foundReg.dailyDatas['rad'] += value[idx]['rad']
    //                         }else{
    //                             foundReg.dailyDatas.push({'rea': value[idx]['rea'], 'hosp': value[idx]['hosp'], 'rad': value[idx]['rad'], 'dc': value[idx]['dc'], 'jour': value[idx]['jour']})
    //                         }
    //                     }else{
    //                         regionIntermediaire.push({'regionName': region, 'dailyDatas': [{'rea': value[idx]['rea'], 'hosp': value[idx]['hosp'], 'rad': value[idx]['rad'], 'dc': value[idx]['dc'], 'jour': value[idx]['jour']}]})
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // );
    return regionIntermediaire
}

module.exports = {
    getTotalDataFromHosptitalInRegions,
    getDailyDataFromHosptitalInRegions
};