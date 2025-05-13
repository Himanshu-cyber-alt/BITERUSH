import express from "express"
import passport from 'passport';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';
const router = express.Router();


router.get('/Order',(req,res)=>{
    res.render('Order.ejs')
})

router.get('/OrderForm', ensureAuthenticated, (req, res) => {
    res.render('OrderForm.ejs');
});

router.post('/Submit',ensureAuthenticated,(req,res)=>{

    res.render('Submit.ejs')

})


export default router;