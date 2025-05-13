import express from 'express'
import bodyParser from 'body-parser';
// import LoginRoutes from './routes/LoginRoutes.js'
import RegisterRoutes from './routes/Register.js'
import session from 'express-session'; 
import passport from 'passport';
import './config/passport.js'; 
import './config/passport.js'
import OrderRoutes from './routes/authOrder.js'
import MainRoutes from './routes/authMain.js'



const app = express();
const port =  7000;
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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

 app.use('/',OrderRoutes)


 
    let items = [
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
      n: "burger",
      name: 'KFC',
      image: 'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.4,
      description: 'Chicken Burger, Fast Food',
      priceTime: '₹220 for one • 30 min',
      offer: '40% OFF'
    },




  {
    n: "paneer",
    name: 'Paneer King',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    description: 'Paneer Tikka, North Indian',
    priceTime: '₹250 for one • 35 min',
    offer: '30% OFF'
  },

  {
  n: "pizza",
  name: 'Domino’s Pizza',
  image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=600https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.2,
  description: 'Cheese Burst, Veg Pizza',
  priceTime: '₹260 for one • 30 min',
  offer: '40% OFF'
},
{
  n: "pizza",
  name: 'Pizza Hut',
  image: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.3,
  description: 'Pan Pizza, Sides, Beverages',
  priceTime: '₹240 for one • 25 min',
  offer: '35% OFF'
},
{
  n: "pizza",
  name: 'La Pino’z Pizza',
  image: 'https://images.pexels.com/photos/842519/pexels-photo-842519.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.5,
  description: 'Italian Pizza, Garlic Bread',
  priceTime: '₹280 for one • 32 min',
  offer: '25% OFF'
},
{
  n: "pizza",
  name: 'Oven Story Pizza',
  image: 'https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.1,
  description: 'Spicy Paneer, Cheese Pizza',
  priceTime: '₹270 for one • 27 min',
  offer: '30% OFF'
},
{
  n: "pizza",
  name: 'Eagle Boys Pizza',
  image: 'https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.0,
  description: 'Margherita, Farmhouse Pizza',
  priceTime: '₹250 for one • 24 min',
  offer: '20% OFF'
},









{
  n: "momos",
  name: 'Wow! Momo',
  image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.3,
  description: 'Steamed Momos, Fried Momos',
  priceTime: '₹150 for one • 20 min',
  offer: '30% OFF'
},
{
  n: "momos",
  name: 'Momo King',
  image: 'https://images.pexels.com/photos/3911228/pexels-photo-3911228.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.2,
  description: 'Veg Momos, Tandoori Momos',
  priceTime: '₹140 for one • 18 min',
  offer: '25% OFF'
},
{
  n: "momos",
  name: 'The Momo House',
  image: 'https://images.pexels.com/photos/18803177/pexels-photo-18803177/free-photo-of-plate-with-greasy-momos-dumplings.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.4,
  description: 'Chicken Momos, Schezwan Momos',
  priceTime: '₹160 for one • 22 min',
  offer: '35% OFF'
},


{
  n: "gulab jamun",
  name: 'Sweet Gully',
  image: 'https://images.pexels.com/photos/29259172/pexels-photo-29259172/free-photo-of-close-up-of-gulab-jamun-on-fork-in-indian-restaurant.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.6,
  description: 'Gulab Jamun, Rasgulla, Sweets',
  priceTime: '₹100 for one • 15 min',
  offer: '20% OFF'
},
{
  n: "gulab jamun",
  name: 'Jamun Junction',
  image: 'https://images.pexels.com/photos/30577321/pexels-photo-30577321/free-photo-of-delicious-indian-gulab-jamun-in-clay-pot.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.5,
  description: 'Hot Gulab Jamun, Bengali Sweets',
  priceTime: '₹90 for one • 12 min',
  offer: '15% OFF'
},





{
  n: "noodles",
  name: 'Noodle Nation',
  image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.3,
  description: 'Hakka Noodles, Manchurian',
  priceTime: '₹150 for one • 20 min',
  offer: '25% OFF'
},
{
  n: "noodles",
  name: 'Spicy Wok',
  image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.4,
  description: 'Chilli Garlic Noodles, Fried Rice',
  priceTime: '₹160 for one • 22 min',
  offer: '30% OFF'
},

{
  n: "noodles",
  name: 'Noodle Box',
  image: 'https://images.pexels.com/photos/2764905/pexels-photo-2764905.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.5,
  description: 'Chinese Noodles, Spring Rolls',
  priceTime: '₹170 for one • 25 min',
  offer: '35% OFF'
}








  ];






app.post('/search', (req, res) => {
  console.log('Incoming search request:', req.body);

  // Get search term and convert to lowercase
  let food = req.body.search?.toLowerCase() || '';

  

    const filteredItems = items.filter(item => item.n.includes(food));

  
  res.render('Search', { i: filteredItems });
});



 



app.listen(port,()=>{
    console.log(`Server is started at port ${port}`)
})








