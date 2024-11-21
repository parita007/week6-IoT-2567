import express from 'express'; // import module
import connectMongoDB from './config/db.js';
import authRouth from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';

dotenv.config(); // โหลดตัวแปรจากไฟล์ .env

const app = express(); // create app
const port = process.env.PORT || 8080; // ถ้าไม่พบ PORT ใน .env จะใช้ค่าเริ่มต้นที่ 8080

// เชื่อมต่อ MongoDB
connectMongoDB();

// Middleware
app.use(express.json()); // แปลงข้อมูลที่มีรูปแบบ JSON String ให้อยู่ในรูป JSON Objext
app.use(express.urlencoded({ extended: false })); // แปลงข้อมูลจาก form ในรูปแบบ url encode เป็น Object

// Cookie middleware
app.use(cookieParser(process.env.COOKIE_SECRET));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,  // แก้ไขจาก SESSION_SECERT เป็น SESSION_SECRET
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60 * 24 * 7 // 1 week
    }
}));

// Flash message middleware
app.use(flash());

// Store flash message for views
app.use(function (req, res, next) {
    res.locals.message = req.flash();
    next();
});

// Store authenticated user's session data for view
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Set view/template engine: views
app.set('view engine', 'ejs');

// Post page
app.get('/posts',(req,res) => {
    return res.render('posts/index.ejs',{title: 'Post Page',active:'posts'})
})


//auth route
app.use('/', authRouth)
//post route
app.use('/',postRoute)

app.listen(port, () => {
    console.log(`SERVER is running on http://localhost:${port}`);
});
