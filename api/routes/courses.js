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

// Add a new course
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
  const courseIndex = courses.findIndex((c) => c.id === courseId);

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
  const newCourses = courses.filter((c) => c.id !== courseId);

  if (newCourses.length !== courses.length) {
    writeData(newCourses);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Add a new module to a course
router.post('/:courseId/modules', (req, res) => {
  const courses = readData();
  const courseId = req.params.courseId;
  const course = courses.find(c => c.id === courseId);

  if (course) {
    const newModule = {
      id: Date.now().toString(),
      title: req.body.title,
      description: req.body.description,
      lessons: req.body.lessons || []
    };
    course.modules.push(newModule);
    writeData(courses);
    res.status(201).json(newModule);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Edit a module in a course
router.put('/:courseId/modules/:moduleId', (req, res) => {
  const courses = readData();
  const courseId = req.params.courseId;
  const moduleId = req.params.moduleId;

  const course = courses.find(c => c.id === courseId);
  if (course) {
    const module = course.modules.find(m => m.id === moduleId);
    if (module) {
      Object.assign(module, req.body);
      writeData(courses);
      res.json(module);
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Delete a module from a course
router.delete('/:courseId/modules/:moduleId', (req, res) => {
  const courses = readData();
  const courseId = req.params.courseId;
  const moduleId = req.params.moduleId;

  const course = courses.find(c => c.id === courseId);
  if (course) {
    const newModules = course.modules.filter(m => m.id !== moduleId);
    if (newModules.length !== course.modules.length) {
      course.modules = newModules;
      writeData(courses);
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Add a new lesson to a module
router.post('/:courseId/modules/:moduleId/lessons', (req, res) => {
  const courses = readData();
  const courseId = req.params.courseId;
  const moduleId = req.params.moduleId;

  const course = courses.find(c => c.id === courseId);
  if (course) {
    const module = course.modules.find(m => m.id === moduleId);
    if (module) {
      const newLesson = {
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
      };
      module.lessons.push(newLesson);
      writeData(courses);
      res.status(201).json(newLesson);
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Edit a lesson in a module
router.put('/:courseId/modules/:moduleId/lessons/:lessonId', (req, res) => {
  const courses = readData();
  const courseId = req.params.courseId;
  const moduleId = req.params.moduleId;
  const lessonId = req.params.lessonId;

  const course = courses.find(c => c.id === courseId);
  if (course) {
    const module = course.modules.find(m => m.id === moduleId);
    if (module) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) {
        Object.assign(lesson, req.body);
        writeData(courses);
        res.json(lesson);
      } else {
        res.status(404).json({ message: 'Lesson not found' });
      }
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Delete a lesson from a module
router.delete('/:courseId/modules/:moduleId/lessons/:lessonId', (req, res) => {
  const courses = readData();
  const courseId = req.params.courseId;
  const moduleId = req.params.moduleId;
  const lessonId = req.params.lessonId;

  const course = courses.find(c => c.id === courseId);
  if (course) {
    const module = course.modules.find(m => m.id === moduleId);
    if (module) {
      const newLessons = module.lessons.filter(l => l.id !== lessonId);
      if (newLessons.length !== module.lessons.length) {
        module.lessons = newLessons;
        writeData(courses);
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Lesson not found' });
      }
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});


module.exports = router;
