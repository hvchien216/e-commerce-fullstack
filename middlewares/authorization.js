const jwt = require('jsonwebtoken');

module.exports = {
    auth: async (req, res, next) => {
        const bearerToken = req.header('authorization');
        if (!bearerToken) return res.status(401).send({ error_code: 'token_invalid' });

        try {
            if (typeof bearerToken !== 'undefined') {
                const bearer = bearerToken.split(' ');
                const token = bearer[1];
                jwt.verify(token, process.env.JWT_SECRET, ((err, decoded) => {
                    if (err) {
                        return res.status(401).json({ error_code: 'token_invalid' })
                    };
                    req.user = decoded;
                }))
                await next();
            }
            else {
                res.status(400).send({ error_code: 'bad_request' });
            }

        }
        catch (err) {
            res.status(400).send({ error_code: 'bad_request' });
        }
    },
    admin: async (req, res, next) => {
        // 401 Unauthorized
        // 403 Forbidden 

        if (!req.user.isAdmin || req.user.role !== 'admin') return res.status(403).send({ error_code: 'access_denied' });

        await next();
    }
}
