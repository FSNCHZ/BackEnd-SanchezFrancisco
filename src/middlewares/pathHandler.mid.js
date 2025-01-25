const pathHandler = (req, res) => {
    let message = `Path not found`
    let status = 404
    let data = {
        method: req.method,
        url: req.url,
        error: message
    }
    return res.status(status).json({ data })
}

export default pathHandler