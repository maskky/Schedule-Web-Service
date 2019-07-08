module.exports =  function (req, res, next) {
    if (req.user.role == 'viewer') return res.status(403).send('You do not have permission.');
    next();
}