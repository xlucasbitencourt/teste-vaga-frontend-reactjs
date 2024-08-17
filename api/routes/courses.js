const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const coursesFilePath = path.join(__dirname, '../data/courses.json');

// Helper function to read JSON file
const readData = () => {
  const data = fs.readFileSync(coursesFilePath);
  return JSON.parse(data);
};

// Helper function to write JSON file
const writeData = (data) => {
  fs.writeFileSync(coursesFilePath, JSON.stringify(data, null, 2));
};

// Get all courses
router.get('/', (req, res) => {
  const courses = readData();
  res.json(courses);
});

// Get a course by ID
router.get('/:id', (req, res) => {
  const courses = readData();
  const course = courses.find((c) => c.id == req.params.id);

  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Add a new course with modules and lessons
router.post('/', (req, res) => {
  const courses = readData();
  const { title, description, modules } = req.body;

  // Gerar ID único para o curso
  const newCourse = {
    id: Date.now().toString(),
    title,
    description,
    modules: modules.map(module => ({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 15), // Gerar ID único para o módulo
      title: module.title,
      description: module.description,
      lessons: module.lessons.map(lesson => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 15), // Gerar ID único para a lição
        title: lesson.title,
        description: lesson.description,
        content: lesson.content
      }))
    }))
  };

  courses.push(newCourse);
  writeData(courses);
  res.status(201).json(newCourse);
});



// Edit a course
router.put('/:id', (req, res) => {
  const courses = readData();
  const courseId = req.params.id;
  const courseIndex = courses.findIndex((c) => c.id == courseId);

  if (courseIndex !== -1) {
    courses[courseIndex] = { ...courses[courseIndex], ...req.body };
    writeData(courses);
    res.json(courses[courseIndex]);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});


// Delete a course
router.delete('/:id', (req, res) => {
  const courses = readData();
  const courseId = req.params.id;
  const newCourses = courses.filter((c) => Number(c.id) !== Number(courseId));

  if (newCourses.length !== courses.length) {
    writeData(newCourses);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

module.exports = router;
