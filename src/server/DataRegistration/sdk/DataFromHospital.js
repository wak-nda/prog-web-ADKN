// /**
//  * @author team C
//  * @version 0.1
//  */
//
// const UserAModel = require('../models/CustomerAccount');
//
//
// /*************************************************************************************************
//  *       ################################  CUSTOMER    ############################################   *
//  *************************************************************************************************/
//
// /**
//  * Ajouter un nouveau utilisateur dans notre BD
//  *  @author Paul Marie
//  * @param name - nom de l'utilisateur
//  * @param fname - prénom de l'utilisateur
//  * @param email - adresse email de l'utilisateur
//  * @param password - mot de passe de l'utilisateur
//  * @param gender - sexe de l'utilisateur
//  */
//
// async function addUser(fname, lname, email, password, tel, address, gender) {
//     if (lname !== undefined && fname !== undefined) {
//         await UserAModel.create({
//             "firstName": fname,
//             "lastName": lname,
//             "email": email,
//             "password": password,
//             "address": address,
//             "phone_number": tel,
//             "gender": gender,
//             "cardId" : "1R5321T4T64163134",
//             "endpoint": "" ,
//             "p256dh" : "",
//             "auth" : "",
//             "fireBaseIdMobile" : ""
//         }, function (err, user) {
//             if (err) console.log(err);
//         });
//     }
//     return true;
// }
//
//
//
// /**
//  * modifier l'email ou, & le password de l'utilisateur
//  *  @author Paul Marie
//  * @param email - adresse email de l'utilisateur
//  * @param newEmail - nouvelle adresse email de l'utilisateur
//  * @param password - mot de passe de l'utilisateur
//  */
// async function updateMailAndPassword(newEmail, password, email) {
//     await UserAModel.updateOne({"email": email}, {"email": newEmail, "password": password}, function (err, p) {
//         if (err) console.log(err);
//     });
//     return true;
// }
//
//
// /**
//  * Supprimer un utilisateur à partir de son adresse email
//  *  @author Paul Marie
//  * @param email - adresse email de l'utilisateur
//  */
// async function removeUserByEmail(email) {
//     await UserAModel.findOneAndRemove({
//         "email": email
//     }, function (err, user) {
//         if (err)
//             return false;
//     });
//     return true;
// }
//
//
// module.exports = {
//     addUser,
//     updateMailAndPassword,
//     removeUserByEmail
// };
