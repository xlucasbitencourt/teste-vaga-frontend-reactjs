const express = require('express');
const coursesRoutes = require('./routes/courses');
const fs = require('fs');
const data = require('../data.json');

const app = express();

app.use(express.json());

app.use('/courses', coursesRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  fs.writeFileSync('data/courses.json', JSON.stringify(data, null, 2));
  console.log(`Server running on port ${PORT}`);
});
