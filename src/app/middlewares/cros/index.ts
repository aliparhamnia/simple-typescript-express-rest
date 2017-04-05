function Allow_Cros_Middleware (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.CROS_ALLOWED_SOURCE);
    res.setHeader('Access-Control-Allow-Headers', process.env.CROS_ALLOWED_HEADERS);
    next();
}

export default Allow_Cros_Middleware;