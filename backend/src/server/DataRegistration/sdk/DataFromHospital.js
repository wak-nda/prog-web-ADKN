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

export { addDataFromHospital, getDataFromHospital }
