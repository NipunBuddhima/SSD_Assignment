import validator from 'validator';

const ValidationMiddleware = {};

// Sanitize all string inputs
ValidationMiddleware.sanitizeInput = (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        for (let key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = validator.escape(req.body[key].trim());
            }
        }
    }

    if (req.query && typeof req.query === 'object') {
        for (let key in req.query) {
            if (typeof req.query[key] === 'string') {
                req.query[key] = validator.escape(req.query[key].trim());
            }
        }
    }

    next();
};

// Validate NIC format
ValidationMiddleware.validateNIC = (req, res, next) => {
    const { nic } = req.body;

    if (nic && !/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(nic)) {
        return res.status(400).send({ error: "Invalid NIC format" });
    }

    next();
};

// Validate email format
ValidationMiddleware.validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (email && !validator.isEmail(email)) {
        return res.status(400).send({ error: "Invalid email format" });
    }

    next();
};

export default ValidationMiddleware;