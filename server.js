import express from 'express'
import bodyParser from 'body-parser';
// import LoginRoutes from './routes/LoginRoutes.js'
import RegisterRoutes from './routes/Register.js'
import session from 'express-session'; 
import passport from 'passport';
import './config/passport.js'; 
import './config/passport.js'
// import DiningRoutes from './routes/authDining.js'
// import DeliveryRoutes from './routes/authDelivery.js'
// import OrderRoutes from './routes/authOrder.js'
import MainRoutes from './routes/authMain.js'



const app = express();
const port =  7000;
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))


app.use(session({
 
    secret : "Lappy",
    resave : false,
    saveUninitialized : true,
   cookie : {
    maxAge : 1000 * 60 * 60 * 24 // this is 1 day seesion cookie you can reduce 
     // this define how much time user is log in out website
   }
   


}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


app.get('/',(req,res)=>{
    res.render('Home.ejs')
})

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/DashBord",
  passport.authenticate("google", {
    successRedirect: "/DashBord",
    failureRedirect: "/login",
  })
);


 app.use('/',RegisterRoutes);
 app.use('/',MainRoutes)
//  app.use('/',LoginRoutes);
//  app.use('/',DiningRoutes)
//  app.use('/',DeliveryRoutes)
 // app.use('/',OrderRoutes)



let items = ['dosa','pizza','burger']

app.post('/search', (req, res) => {
  let food = req.body.search.toLowerCase();

  const items = [
    {
      n: "burger",
      name: 'Burger King',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      rating: 4.3,
      description: 'Burger, Fast Food, Beverages',
      priceTime: '₹200 for one • 25 min',
      offer: '50% OFF'
    },
    {
      n: "burger",
      name: 'McDonald’s',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      rating: 4.1,
      description: 'Burger, Wraps, Beverages',
      priceTime: '₹180 for one • 20 min',
      offer: '30% OFF'
    },
    {
      n: "dosa",
      name: 'KFC',
      image: 'https://images.unsplash.com/photo-1606756791084-546ab9f8cd46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      rating: 4.4,
      description: 'Chicken Burger, Fast Food',
      priceTime: '₹220 for one • 30 min',
      offer: '40% OFF'
    }
  ];

  const filteredItems = items.filter(item => item.n.includes(food));

  console.log(typeof filteredItems)

  res.render('test', { items: filteredItems });
});



 



app.listen(port,()=>{
    console.log(`Server is started at port ${port}`)
})