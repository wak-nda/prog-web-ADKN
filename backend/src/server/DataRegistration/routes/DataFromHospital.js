import  KoaRouter  from 'koa-router';
const DataFromHospitalRouter= new KoaRouter();
import * as f from '../../utils/functions.js';
// var jwt = require('jsonwebtoken');
// var crypto = require('crypto');
import * as DataFromHospital from '../sdk/DataFromHospital.js';
// const KEY = "m yincredibl y(!!1!11!)<'SECRET>)Key'!";
// const PUBLIC_VAPID = 'BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg';
// const PRIVATE_VAPID = '_kRzHiscHBIGftfA7IehH9EA3RvBl8SBYhXBAMz6GrI';
// const webpush = require('web-push');
// webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID);


/**
 * Récupérer toutes les données hospitalières
 * @author Paul Marie
 * @name Route : Récupération de la liste de tous les utilisateurs
 */
DataFromHospitalRouter.get('/api/getDataFromHospitals', async (ctx) => {
    const data = await DataFromHospital.getDataFromHospital();
    f.success(ctx, data);
});

// /**
//  * Recherche d'un utilisateur précis
//  * @author Paul Marie
//  * @name Route : Recherche d'un utilisateur précis (par Email)
//  * @bodyparam {String} mail Adresse mail de l'utilisateur
//  */
// router.get('/api/getUsers/:mail', async (ctx) => {
//     const users = await customerFinderSdk.getUserByEmail(ctx.params.mail);
//     f.success(ctx, users);
// });
//
//
// /**
//  * Recherche d'un utilisateur précis
//  * @author Paul Marie
//  * @name Route : Recherche d'un utilisateur précis (par Id)
//  * @bodyparam {String} id Id de l'utilisateur
//  */
// router.get('/api/user/:id', async (ctx) => {
//     const user = await customerFinderSdk.getUserById(ctx.params.id);
//     f.success(ctx, user);
// });
//
// /**
//  * Inscription d'un utilisateur
//  * @author Paul Marie
//  * @name Route : Inscription d'un utilisateur
//  */
// router.post('/api/user/signup', async (ctx) => {
//     // console.log("wtf");
//     var password = crypto.createHash('sha256').update(ctx.request.body.password).digest('hex');
//     const user = await customerFinderSdk.getUserByEmail(ctx.request.body.mail);
//     console.table(user);
//     if (user !== null) {
//         console.error("can't create user " + ctx.request.body.mail);
//         f.failure409(ctx, "An user with that email already exists");
//     } else {
//         console.log("Can create user " + ctx.request.body.mail);
//         await customerRegistrationSdk.addUser(ctx.request.body.firstName, ctx.request.body.lastName, ctx.request.body.mail, password, ctx.request.body.tel, ctx.request.body.address, ctx.request.body.gender);
//         f.success(ctx, "Success");
//     }
// });
//
// router.post('/api/user', async (ctx) => {
//     // const user = await customerFinderSdk.getUserById(ctx.params.id);
//     var password = crypto.createHash('sha256').update(ctx.request.body.password).digest('hex');
//     console.log('ici');
//     // const user = await customerFinderSdk.getUserByEmail(ctx.request.body.mail);
//
//     const user = await customerFinderSdk.getUserByEmailAndPassword(ctx.request.body.mail, password);
//     f.success(ctx, user);
// });
//
//
// /**
//  * Login
//  * @author Paul Marie
//  * @name Route : Login de l'application
//  * @route {POST} paulkoffi.com:3000/api/login
//  */
// router.post('/api/user/login', async (ctx) => {
//     console.log('ici');
//     var password = crypto.createHash('sha256').update(ctx.request.body.password).digest('hex');
//     console.log('ici');
//
//     const user = await customerFinderSdk.getUserByEmailAndPassword(ctx.request.body.mail, password);
//     console.log('ici');
//
//     if (user !== null) {
//         // await customerFinderSdk.updateFirebaseTokenWeb(ctx.request.body.token, ctx.request.body.mail);
//         // console.table(user);
//         var payload = {
//                 email: ctx.request.body.mail,
//                 // userId: user._id
//             }
//         ;
//         var token = jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: "15d"});
//         const response =
//             {
//                 "firstName": user.firstName,
//                 "lastName": user.lastName,
//                 "token": token
//             }
//         console.log("Login Success");
//         f.success(ctx, JSON.stringify(response));
//     } else {
//         console.error("Login Failure");
//         f.failure(ctx, JSON.stringify("There's no user matching that"));
//     }
// });
//
//
// router.post('/api/user/log', async (ctx) => {
//     console.log('ici');
// });
//
// router.post('/api/user/updatefirebasetokenmobile', async (ctx) => {
//     const rep = await customerFinderSdk.updateFirebaseTokenMobile(ctx.request.body.token, ctx.request.body.mail);
//     if (rep) {
//         f.success(ctx, JSON.stringify(rep));
//     } else {
//         console.error("Login Failure");
//         f.failure(ctx, JSON.stringify("There's no user matching that"));
//     }
// });
//
// router.post('/api/user/subs', async (ctx) => {
//     console.log("===> SUBSCRIPTION");
//     // console.log(ctx.request.body);
//     const rep = await customerFinderSdk.updateWepPushToken(ctx.request.body.sub.endpoint, ctx.request.body.sub.keys.p256dh, ctx.request.body.sub.keys.auth, ctx.request.body.mail);
//     if (rep) {
//         f.success(ctx, JSON.stringify(rep));
//     } else {
//         console.error("Login Failure");
//         f.failure(ctx, JSON.stringify("There's no user matching that"));
//     }
// });
//
// // Test
// router.post('/api/data', async (ctx) => {
//     // var str = ctx.get('Authorization');
//     const str = ctx.request.body.password;
//     console.log("token " + str);
//     try {
//         jwt.verify(str, KEY, {algorithm: 'HS256'});
//         console.log("getData Success");
//         f.success(ctx, "Données secrètes du back end");
//     } catch {
//         f.failure(ctx, "Bad Token");
//     }
// });
//
// router.post('/api/sendTest', async (ctx) => {
//     const sub = {
//         endpoint: 'https://fcm.googleapis.com/fcm/send/ej-NkX2UvlI:APA91bEaBLhiseNS9UJPkWR4QILzwslAXthdcYTZFDfIiZiiifPTYjTz663nIVzjjviT1JE-vTAIFDqC-Z1b8PxZ-5g0iixiCFkN0uMFs0O_gfH44nLm6g2hlhUeTqswTb-48TmkDeoq',
//         expirationTime: null,
//         keys: {
//             p256dh: 'BLUkvtfBoI_aMt32MwOHKe4-2zDVX92sLi8Rc05odiN11W2Lhk9_7uMTLLQDt4QOYb9VNUIw8EncdiLcGlGxnZk',
//             auth: '71NVEaCc_Dw_w5Ig4lsUjg'
//         }
//     };
//     const notificationPayload = {
//         notification: {
//             title: 'New Notification',
//             body: 'This is the body of the notification',
//             icon: 'assets/icons/icon-512x512.png'
//         }
//     };
//     webpush.sendNotification(sub, JSON.stringify(notificationPayload));
//     f.success(ctx, "OK");
// });
//
// router.post('/api/user/sign', async (ctx) => {
//
// });

export const dataFromHospital =DataFromHospitalRouter;
