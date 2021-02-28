const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const Period = require('../sdk/Period');


/**
 * Récupérer toutes les données hospitalières
 * @name Route : Récupération de la liste de tous les utilisateurs
 */
router.get('/api/getPeriods', async (ctx) => {
    const data = await Period.getPeriods();
    f.success(ctx, data);
});

module.exports = router;
