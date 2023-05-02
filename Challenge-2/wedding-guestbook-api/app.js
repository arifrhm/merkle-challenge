const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const guestRouter = require('./routes/guestRoutes');
const adminRouter = require('./routes/adminRoutes');

// Middleware to parse incoming JSON data
app.use(express.json());

// Routes
app.use('/guests', guestRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
