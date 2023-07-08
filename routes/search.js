const router = require('express').Router();

router.get('/:id',async (req,res)=>{
    try{
        const item = await axios.get(`https://searchme.onrender.com/product/search/${req.params.item}`);
        return res.json(item.data);
    }
    catch(e){
        console.log(e);
    }
})
module.exports = router;