// import express from  'express'
// import bcrypt from  'bcryptjs'
// import pool from '../config/db.js';
// import { hash } from 'crypto';
// const  router = express.Router();



// router.get('/Register',(req,res)=>{
//     res.render('Register.ejs')
// })




// router.post('/Register', async (req,res)=>{

//     const {Name,Email,Password,ConfirmPassowrd} = req.body;

//     console.log(req.body.Name)

//   try{

//     const result = await pool.query('select * from Customer where email = $1',[Email])

//     if(result.rows.length > 1){
        
//         const message = "Email is already Exits";
//         res.render('Register.ejs',{message})
//     }else{
 
//              // here i hash the Password and 10 is as Salting Round 
//         bcrypt.hash(Password,10, async (err,hash)=>{
//                if(err){
//                 console.log(err)
//                }else{
//             const result2 = await pool.query('insert into Customer (name,email,password) values($1,$2,$3)',[Name,Email,hash]) 
//             res.render('Login.ejs')
//                }
//         })
//     }



//   }catch(err){
//     console.log(err)
//    res.status(505).send('505')
//   }

      
// })



// export default router;



import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const router = express.Router();

// GET Register Page
router.get('/Register', (req, res) => {
    res.render('Register.ejs');
});

// POST Register Logic
router.post('/Register', async (req, res) => {
    const { Name, Email, Password, ConfirmPassword } = req.body;

    try {
        // Check if the email already exists
        const result = await pool.query('SELECT * FROM Customer WHERE email = $1', [Email]);

        if (result.rows.length > 0) {
            // Email already exists, display message
            const message = "Email already exists!";
            return res.render('Register.ejs', { message });
        } else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(Password, 10);

            // Insert new customer into the database
            await pool.query('INSERT INTO Customer (name, email, password) VALUES ($1, $2, $3)', [Name, Email, hashedPassword]);

            // Redirect to login page after successful registration
            res.render('Login.ejs');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
