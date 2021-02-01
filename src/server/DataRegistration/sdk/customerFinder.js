/**
 * @author team C
 * @version 0.1
 */

const UserAModel = require('../models/CustomerAccount');


/*************************************************************************************************
 *       ################################  CUSTOMER    ############################################   *
 *************************************************************************************************/

/**
 * Retrouver tous les utilisateurs de notre DB
 *  @author Paul Marie
 * @returns {Promise<any[]>}
 */
async function getUsers() {
    const users = await UserAModel.find({});
    return users;
}


/**
 * Retrouver un utilisateur via son nom et prénom
 *  @author Paul Marie
 * @param name - nom de l'utilisateur
 * @param fname - prénom de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserByName(name, fname) {
    return await UserAModel.find({'firstName': fname, 'lastName': name});
}

/**
 * Retrouver un utilisateur via son adresse Mail
 *  @author Paul Marie
 * @param mail - adresse email de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserByEmail(mail) {
    return UserAModel.findOne({'email': mail});
}


/**
 * Retrouver un utilisateur via son id
 *  @author Paul Marie
 * @param id - id de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserById(id) {
    return await UserAModel.findById(id);
}


/**
 * Retrouver un utilisateur via son email et son mot de passe
 *  @author Paul Marie
 * @param mail - adresse email de l'utilisateur
 *  @param password - mot de passe de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserByEmailAndPassword(mail, password) {
    console.log("ici");
    return  UserAModel.findOne({'email': mail, 'password': password});
}

async function updateFirebaseTokenMobile(token, email) {
    await UserAModel.updateOne({"email": email}, {"fireBaseIdMobile": token}, function (err, p) {
        if (err) console.log(err);
    });
    return true;
}

async function updateWepPushToken(endpoint, p256dh, auth, email) {
    await UserAModel.updateOne({"email": email}, {"endpoint": endpoint , "p256dh" : p256dh, "auth" : auth}, function (err, p) {
        if (err) console.log(err);
    });
    return true;
}



module.exports = {
    getUsers,
    getUserByName,
    getUserByEmail,
    getUserById,
    getUserByEmailAndPassword,
    updateFirebaseTokenMobile,
    updateWepPushToken
};
