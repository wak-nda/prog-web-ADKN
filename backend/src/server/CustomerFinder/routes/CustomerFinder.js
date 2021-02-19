import  KoaRouter  from 'koa-router';
const UsersR = new KoaRouter();
import * as f from '../../utils/functions.js';
import * as jwt  from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as customerFinderSdk from '../sdk/CustomerFinder.js';

/**
 * Login
 * @author Paul Marie
 * @name Route : Login de l'application
 * @route {POST} paulkoffi.com:3000/api/login
 */
UsersR.post('/api/user', async (ctx) => {
    // const user = await customerFinderSdk.getUserById(ctx.params.id);
    var password = crypto.createHash('sha256').update(ctx.request.body.password).digest('hex');
    console.log('ici');
    // const user = await customerFinderSdk.getUserByEmail(ctx.request.body.mail);

    const user = await customerFinderSdk.getUserByEmailAndPassword(ctx.request.body.mail, password);
    f.success(ctx, user);
});


export const usersRouter = UsersR;
