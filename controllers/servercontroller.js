
const { response, request } = require('express');


const obtener = async (req = request, res = response) => {

    res.status(200).json({
        state: true,
        message: "Hello world"
    })

}

module.exports = {
    obtener
}