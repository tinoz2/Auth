const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        console.error(error)
        res.status(400)
    }
}

export default validate