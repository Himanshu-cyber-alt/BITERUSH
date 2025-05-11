import express from "express"
const router = express.Router();


router.get('/Delivery',(req,res)=>{
    res.render('Delivery.ejs')
})

export default router;