const db = require('../lib/db/queries');

class Auth {
    static isAdmin(req, res, next) {
        if (!req.session.userid) {
            res.redirect('/login');
        } else {
            db.getUserById(req.session.userid).then(user => {
                if (user.isAdmin) {
                    next();
                } else {
                    next(createError(404));
                }
            });
        }
    }
}

module.exports = Auth;
