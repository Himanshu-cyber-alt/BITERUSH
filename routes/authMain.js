import express from 'express';
import passport from 'passport';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';
const router = express.Router();

// Middleware to store the previous page before redirecting to the login page
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        // Store the current URL in the session before redirecting to the login page
        req.session.previousPage = req.originalUrl;
    }
    next();
});



router.get('/Home', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        return res.render('Home.ejs', { user: req.user });
    }else{
    res.render('Home.ejs');
    }
});
 

// Delivery page route
router.get('/Delivery', (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('Delivery.ejs', { user: req.user });
    }
    res.render('Delivery.ejs');
});

// Dining page route
router.get('/Dining', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        return res.render('Dining.ejs', { user: req.user });
    }
    res.render('Dining.ejs');
});
 


router.get('/Night',(req,res)=>{

    if(req.isAuthenticated){
       return res.render('Night.ejs',{uesr : req.user })
    }
    res.render('Night.ejs')
})


// Login page route
router.get('/Login', (req, res) => {
    res.render('Login.ejs');
});

// Handle Login POST request
router.post('/Login', passport.authenticate('local', {
    successRedirect: '/', // Default to redirect to home or a default page
    failureRedirect: '/Login' // Redirect back to login page if failed

}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/'); // Redirect to home page or a default page
    });
});

export default router;
