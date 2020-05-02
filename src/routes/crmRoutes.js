import {
    addNewContact,
    getAllContacts,
    getContactWithId,
    removeContact,
    updateContact
} from '../controllers/crmController'

import {
    login,
    loginRequired,
    register
} from '../controllers/userController'

const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            //middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, loginRequired, getAllContacts)
        .post(loginRequired, addNewContact);

    app.route('/contact/:contactID')
        .get(loginRequired, getContactWithId)
        .put(loginRequired, updateContact)
        .delete(loginRequired, removeContact);

    // register Controller    
    app.route('/auth/register')
        .post(register);

    // login Controller
    app.route('/auth/login')
        .post(login);
}

export default routes