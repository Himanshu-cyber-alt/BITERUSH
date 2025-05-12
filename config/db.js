// import pkg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const { Pool } = pkg;

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false }
// });

// // Run table creation only once (optional for dev)
// (async () => {
//     try {
//         await pool.query(`
//             CREATE TABLE IF NOT EXISTS SportsCustomer (
//                 id SERIAL PRIMARY KEY,
//                 name VARCHAR(30) NOT NULL,
//                 email VARCHAR(105) UNIQUE NOT NULL,
//                 password VARCHAR(100)
//             );
//         `);
//         console.log(" SportsCustomer table is ready");
//     } catch (err) {
//         console.error(" Error creating table:", err);
//     }
// })();

// export default pool;




// db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Initialize tables
(async () => {
    try {
        // Customer table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS SportsCustomer (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(105) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL
            );
        `);

        // Food item table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS FoodItem (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                type VARCHAR(50),
                image TEXT,
                price DECIMAL(10, 2) NOT NULL,
                rating DECIMAL(2, 1)
            );
        `);

        // Orders table linking customer and food
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Orders (
                id SERIAL PRIMARY KEY,
                customer_id INTEGER REFERENCES SportsCustomer(id),
                food_id INTEGER REFERENCES FoodItem(id),
                order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("All tables are set up.");
    } catch (err) {
        console.error("Error creating tables:", err);
    }
})();

export default pool;
