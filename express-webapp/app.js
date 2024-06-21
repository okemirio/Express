const express = require('express');
const app = express();
const path = require('path');

// Middleware to check if request is within working hours
const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = date.getHours();

    // Check if it's Monday to Friday (dayOfWeek 1 to 5) and between 9 AM to 5 PM (hour 9 to 17)
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue to next middleware or route handler
    } else {
        res.send('Sorry, the website is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
};

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, etc.) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Apply working hours middleware to all routes
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
