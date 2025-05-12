// import passport from "passport";
// import session from 'express-session';
// import bcrypt from 'bcryptjs'
// import { Strategy as LocalStrategy } from 'passport-local';
// import pool from "./db.js";
// import GoogleStrategy from "passport-google-oauth2";
// import dotenv from "dotenv"


// dotenv.config();



// passport.use(new LocalStrategy({
//     usernameField: 'Email',   
//     passwordField: 'Password' // match your form field name
//                               // match your form field name
// }, async function verify(Email, Password, cb) {
//     try {
//         const result = await pool.query('SELECT * FROM Customer WHERE email = $1', [Email]);
//         const user = result.rows[0];

//         if (!user) return cb(null, false); // return 

//         bcrypt.compare(Password, user.password, (err, matched) => {
//             if (err) return cb(err);
//             if (matched) return cb(null, user);
//             return cb(null, false);
//         });
//     } catch (err) {
//         return cb(err);
//     }
// }));



// passport.use("google", new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "https://gearupsport.onrender.com/auth/google/DashBord",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     passReqToCallback: true
// }, async (req, accessToken, refreshToken, profile, cb) => {
//     try {
//         const email = profile.email;

//         // Check if user already exists
//         const result = await pool.query('SELECT * FROM Customer WHERE email = $1', [email]);
//         let user = result.rows[0];

//         // If not, insert into DB
//         if (!user) {
//             const insert = await pool.query(
//                 'INSERT INTO Customer (name, email, password) VALUES ($1, $2, $3) RETURNING *',
//                 [profile.displayName, email, ''] // password can be empty for Google
//             );
//             user = insert.rows[0];
//         }

//         return cb(null, user);
//     } catch (err) {
//         return cb(err);
//     }
// }));


// passport.serializeUser((user,cb)=>{
//     return cb(null,user);
// })

// passport.deserializeUser((user,cb)=>{
//     return cb(null,user);
// })



import passport from "passport";
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import pool from "./db.js";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv";

dotenv.config();

// Local Strategy - Updated to use SportsCustomer table
passport.use(new LocalStrategy({
    usernameField: 'Email',   
    passwordField: 'Password'
}, async function verify(Email, Password, cb) {
    try {
        // Changed table name from Customer to SportsCustomer
        const result = await pool.query('SELECT * FROM Customer WHERE email = $1', [Email]);
        const user = result.rows[0];

        if (!user) {
            console.log("No user found with email:", Email);
            return cb(null, false);
        }

        bcrypt.compare(Password, user.password, (err, matched) => {
            if (err) return cb(err);
            if (matched) {
                console.log("Password matched for user:", Email);
                return cb(null, user);
            }
            console.log("Password incorrect for user:", Email);
            return cb(null, false);
        });
    } catch (err) {
        console.error("Login error:", err);
        return cb(err);
    }
}));

// Google OAuth Strategy - Updated to use SportsCustomer table
passport.use("google", new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://gearupsport.onrender.com/auth/google/DashBord",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, cb) => {
    try {
        const email = profile.email;

        // Changed table name from Customer to SportsCustomer
        const result = await pool.query('SELECT * FROM Customer WHERE email = $1', [email]);
        let user = result.rows[0];

        if (!user) {
            const insert = await pool.query(
                'INSERT INTO Customer (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [profile.displayName, email, ''] 
            );
            user = insert.rows[0];
        }

        return cb(null, user);
    } catch (err) {
        return cb(err);
    }
}));

// Fixed serialization/deserialization
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        // Changed table name from Customer to SportsCustomer
        const result = await pool.query('SELECT * FROM Customer WHERE id = $1', [id]);
        const user = result.rows[0];
        if (!user) {
            return cb(new Error('User not found'));
        }
        cb(null, user);
    } catch (err) {
        cb(err);
    }
});