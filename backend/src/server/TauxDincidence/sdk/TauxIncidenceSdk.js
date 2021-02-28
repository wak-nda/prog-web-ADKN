const TauxIncidenceModel = require('../models/TauxIncidenceModel');



/*************************************************************************************************
 *       ################################  DATA   ############################################   *
 *************************************************************************************************/

async function addDataTauxIncidence(pays, week, pop, positifs, tauxIncidence) {
    await TauxIncidenceModel.create({
        "pays": pays,
        "week": week,
        "pop": Number(pop),
        "positifs": Number(positifs),
        "tauxIncidence": Number(tauxIncidence)
    }, function (err) {
        if (err) console.log(err);
    });
    return true;
}

module.exports = {
    addDataTauxIncidence
}