/**
 * @author team C
 * @version 0.1
 */

import { PeriodSchema } from '../models/Period.js';


/*************************************************************************************************
 *       ################################  DATA   ############################################   *
 *************************************************************************************************/

async function addPeriod(name,startDate,endDate) {
    await PeriodSchema.create({
        "name": name,
        "startDate": startDate,
        "endDate": endDate
    }, function (err, user) {
        if (err) console.log(err);
    });
    return true;
}

async function getPeriods(){
    return await PeriodSchema.find();
}

export { addPeriod, getPeriods }
