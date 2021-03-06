const Router = require('koa-router');
const router = new Router();
const f = require('../../utils/functions');
const Users = require('../sdk/UserFinder');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const KEY = "m yincredibl y(!!1!11!)<'SECRET>)Key'!";

/**
 * Login
 * @author Paul Marie
 * @name Route : Login de l'application
 * @route {POST} paulkoffi.com:3000/api/login
 */
router.post('/api/user', async (ctx) => {
    var password = crypto.createHash('sha256').update(ctx.request.body.password).digest('hex');
    const user = await Users.getUserByEmailAndPassword(ctx.request.body.mail, password);
    console.log('ici');

    if (user !== null) {
        // await customerFinderSdk.updateFirebaseTokenWeb(ctx.request.body.token, ctx.request.body.mail);
        // console.table(user);
        var payload = {
                email: ctx.request.body.mail,
                // userId: user._id
            }
        ;
        var token = jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: "15d"});
        const response =
            {
                "name": user.firstName,
                "token": token,
                "res" : true
            }
        console.log("Login Success");
        f.success(ctx, JSON.stringify(response));
    } else {
        const response =
            {
                "res": false
            }
        console.log("Login failure");
        f.success(ctx, JSON.stringify(response));
    }
});


module.exports = router;

