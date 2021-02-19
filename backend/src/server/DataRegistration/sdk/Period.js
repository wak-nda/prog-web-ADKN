/**
 * @author team C
 * @version 0.1
 */

const PeriodSchema = require('../models/Period');


/*************************************************************************************************
 *       ################################  DATA   ############################################   *
 *************************************************************************************************/

async function addPeriod(name, startDate, endDate) {
    await PeriodSchema.create({
        "name": name,
        "startDate": startDate,
        "endDate": endDate
    }, function (err, user) {
        if (err) console.log(err);
    });
    return true;
}

async function getPeriods() {
    return  PeriodSchema.find();
}

module.exports = {addPeriod, getPeriods};
