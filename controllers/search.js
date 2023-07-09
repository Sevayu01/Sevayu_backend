const client = require('../config/search')

const find =async (req,res) =>{
    client.index('Hospitals').search(text).then((res) =>{
        res.json({data:res.hits})
    }) 

}


module.exports = {save,find}    
