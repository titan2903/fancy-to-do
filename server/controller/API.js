const axios = require('axios');
require('dotenv').config();

class APIController {
    static holiday(req, res) {
        axios({
            method: 'GET'
        })
            .then((result) => {
                res.status(200).json()
            }).catch((err) => {
                res.status(500)({
                    message: `internal server error`
                })
            });
    }
}


module.exports = APIController
