const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const TauxIncidenceSdk = require('../sdk/TauxIncidenceSdk');


/**
 * Récupérer toutes les données hospitalières
 * @author Paul Marie
 * @name Route : Récupération de la liste de tous les utilisateurs
 */
router.get('/api/getCurrentTauxIncidenceFrance', async (ctx) => {
    const data = await TauxIncidenceSdk.getDataTauxIncidenceFrance();
    let size = data.length;
    const current = data[size - 1]
    f.success(ctx, current);
});

router.get('/api/getWeeklyTauxIncidenceFrance', async (ctx) => {
    const data = await TauxIncidenceSdk.getDataTauxIncidenceFrance();
    f.success(ctx, data);
});

module.exports = router;