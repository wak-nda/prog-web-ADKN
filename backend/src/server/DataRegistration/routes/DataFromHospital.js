const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const DataFromHospital = require('../sdk/DataFromHospital');
const HopistalDataRegion = require('../sdk/HospitalDataRegionsdk');


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

router.get('/api/getDataFrance', async (ctx) => {
    const dataFrance = await DataFromHospital.getFranceData();
    f.success(ctx, dataFrance)
});

router.get('/api/getDailyDataFrance', async (ctx) => {
    const dataFrance = await DataFromHospital.getDailyDataFrance();
    f.success(ctx, dataFrance)
});

router.get('/api/getHopsDataInRegions', async (ctx) => {
    const dataRegions = await HopistalDataRegion.getTotalDataFromHosptitalInRegions();
    f.success(ctx, dataRegions)
});

// router.get('/api/getHopsDataInRegionsSecond', async (ctx) => {
//     const dataRegions = await HopistalDataRegion.getTotalDataFromHosptitalInRegions();
//     f.success(ctx, dataRegions)
// });

router.get('/api/getHopsDataInRegions/:region', async (ctx) => {
    const dataRegions = await DataFromHospital.getDailyDataFromHosptitalInRegions();
    const dataRegion = dataRegions.find(reg => reg.regionName === ctx.params.region)
    f.success(ctx, dataRegion)
});

router.get('/api/getSumByDep/:dep', async (ctx) => {
    await DataFromHospital.sumDataByDepartment(ctx.params.dep).then((rep) => {
        f.success(ctx, rep);
    })
        .catch((err) => {
            f.failure(ctx, err);
        });
});

router.get('/api/getSumByDeps', async (ctx) => {
    await DataFromHospital.sumDataByDepartments().then((rep) => {
        f.success(ctx, rep);
    })
        .catch((err) => {
            f.failure(ctx, err);
        });
});

router.get('/api/getMaxSumByDeps', async (ctx) => {
    await DataFromHospital.sumDataByDepartments().then((rep) => {
        let rp = {
            "maxRea": 0,
            "maxHos": 0,
            "maxDec": 0,
            "maxRad": 0
        };
        const size = rep.length;
        for (let idx = 0; idx < size; idx++) {
            rp.maxRea = (rep[idx].sum_rea > rp.maxRea) ? rep[idx].sum_rea : rp.maxRea;
            rp.maxHos = (rep[idx].sum_hosp > rp.maxHos) ? rep[idx].sum_hosp: rp.maxHos;
            rp.maxDec = (rep[idx].sum_dc > rp.maxDec) ? rep[idx].sum_dc : rp.maxDec;
            rp.maxRad = (rep[idx].sum_rad > rp.maxRad) ? rep[idx].sum_rad : rp.maxRad;
        }
        f.success(ctx, rp);
    })
        .catch((err) => {
            f.failure(ctx, err);
        });
});

router.get('/api/getSum', async (ctx) => {
    await DataFromHospital.sumData().then((rep) => {
        f.success(ctx, rep);
    })
        .catch((err) => {
            f.failure(ctx, err);
        });
});

module.exports = router;

