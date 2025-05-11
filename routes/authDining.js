import express from "express"
const router = express.Router();


router.get('/Dining',(req,res)=>{
    res.render('Dining.ejs')
})

router.get('/Night',(req,res)=>{
    res.render('Night.ejs')
})



export default router;