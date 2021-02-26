const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const DataFromHospital = require('../sdk/DataFromHospital');


/**
 * Récupérer toutes les données hospitalières
 * @author Paul Marie
 * @name Route : Récupération de la liste de tous les utilisateurs
 */
router.get('/api/getDataFromHospitals', async (ctx) => {
    const data = await DataFromHospital.getDataFromHospital();
    f.success(ctx, data);
});


router.get('/api/getDataFromHospitalAfterDate/:date', async (ctx) => {
    const data = await DataFromHospital.getDataFromHospitalAfterDate(ctx.params.date);
    f.success(ctx, data);
});

router.get('/api/getTotalData', async (ctx) => {
    const data = await DataFromHospital.getTotalData();
    f.success(ctx, data);
});

router.get('/api/getDataFromHospitalBeforeDate/:date', async (ctx) => {
    const data = await DataFromHospital.getDataFromHospitalBeforeDate(ctx.params.date);
    f.success(ctx, data);
});

router.get('/api/getDataFromHospitalInPeriod/:startDate/:endDate', async (ctx) => {
    const data = await DataFromHospital.getDataFromHospitalInPeriod(ctx.params.startDate, ctx.params.endDate);
    f.success(ctx, data);
});

router.get('/api/getDataFromHospitalInDepartment/:department', async (ctx) => {
    const data = await DataFromHospital.getDataFromHospitalInDepartment(ctx.params.department);
    f.success(ctx, data);
});

router.get('/api/getDataFromHospitalInRegions/:region', async (ctx) => {
    const data = await DataFromHospital.getDailyDataFromHosptitalInRegion();
    const auvergneRhoneAlpes = data[ctx.params.region]
    f.success(ctx, auvergneRhoneAlpes)
})

module.exports = router;

