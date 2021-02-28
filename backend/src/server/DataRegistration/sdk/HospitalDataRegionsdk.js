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
        for(let prop in rep){
            let sizeDatas = regionIntermediaire.dailyDatas.length
            if(sizeDatas === 0){
                regionIntermediaire = {'regionName': region, 'dailyDatas': [{'rea': rep[prop]['rea'], 'hosp': rep[prop]['hosp'], 'rad': rep[prop]['rad'], 'dc': rep[prop]['dc'], 'jour': rep[prop]['jour']}]};
            }else {
                lastElementIdx = regionIntermediaire.dailyDatas.length - 1;
                lastElementDay = regionIntermediaire.dailyDatas[lastElementIdx]['jour']
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
    });
    return regionIntermediaire
}

module.exports = {
    getTotalDataFromHosptitalInRegions,
    getDailyDataFromHosptitalInRegions
};