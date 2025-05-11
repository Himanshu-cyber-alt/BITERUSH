import express from "express"
const router = express.Router();


router.get('/Dining',(req,res)=>{
    res.render('Dining.ejs')
})

export default router;