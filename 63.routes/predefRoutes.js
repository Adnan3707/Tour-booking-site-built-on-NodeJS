const express = require('express');
const userroutesp = express.Router();

const userroutesp = (req,res) =>{
    res.status(200).json({status : 'success',
    data : {
    tour :'< Users tour here... >'
           }
    })
}
// Implementing User routes
app.route('/api/v1/users').get(userroutesp);

module.exports = userroutesp ;