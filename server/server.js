const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compileRoutes = require('./routes/compile');
const mongoConfig = require('./mongoConfig');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(mongoConfig.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use('/api/compile', compileRoutes);

// Serve static files from the React app
app.use(express.static('../client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
