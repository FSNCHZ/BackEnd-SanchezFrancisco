const errorHandler = (error, req, res, next) => {
    let status = error.statusCode || 500
    let message = error.message || "API Error"
    let data = {
        method: req.method,
        url: req.url,
        error: message
    }
    return res.status(status).json({data})
}

export default errorHandler 