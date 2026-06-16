const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        msg: err.message || "Internal Server Error"
    });
};

module.exports = errorMiddleware;