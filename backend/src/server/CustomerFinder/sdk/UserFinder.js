/**
 * @author team C
 * @version 0.1
 */

const Users = require('../models/Users');



/*************************************************************************************************
 *       ################################  DATA   ############################################   *
 *************************************************************************************************/
/**
 * Retrouver un utilisateur via son email et son mot de passe
 *  @author Paul Marie
 * @param mail - adresse email de l'utilisateur
 *  @param password - mot de passe de l'utilisateur
 * @returns {Promise<any>}
 */
async function getUserByEmailAndPassword(mail, password) {
    // console.log("ici");
    return  Users.findOne({'email': mail, 'password': password});
}

module.exports = { getUserByEmailAndPassword };
