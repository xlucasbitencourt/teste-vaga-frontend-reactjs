import { Module, Lesson } from "@/types";

export const validateCourse = (
  courseTitle: string,
  courseDescription: string,
  modules: Module[],
  setErrorMessage: (message: string | null) => void
): boolean => {
  if (!courseTitle.trim() || !courseDescription.trim()) {
    setErrorMessage("O título e a descrição do curso são obrigatórios.");
    return false;
  }

  if (modules.length === 0) {
    setErrorMessage("O curso deve ter pelo menos um módulo.");
    return false;
  }

  for (const moduleItem of modules) {
    if (!moduleItem.title.trim() || !moduleItem.description.trim()) {
      setErrorMessage("Todos os módulos devem ter título e descrição.");
      return false;
    }

    if (moduleItem.lessons.length === 0) {
      setErrorMessage("Cada módulo deve ter pelo menos uma lição.");
      return false;
    }

    for (const lesson of moduleItem.lessons) {
      if (!lesson.title.trim() || !lesson.description.trim() || !lesson.content.trim()) {
        setErrorMessage("Todas as lições devem ter título, descrição e conteúdo.");
        return false;
      }
    }
  }

  setErrorMessage(null);
  return true;
};

export const handleRemoveModule = (
  modules: Module[],
  setModules: (modules: Module[]) => void,
  moduleIndex: number
) => {
  const updatedModules = [...modules];
  updatedModules.splice(moduleIndex, 1);
  setModules(updatedModules);
};

export const handleModuleChange = (
  modules: Module[],
  setModules: (modules: Module[]) => void,
  index: number,
  field: keyof Module,
  value: string
) => {
  const updatedModules = [...modules];
  (updatedModules[index][field] as string) = value;
  setModules(updatedModules);
};

export const handleAddLesson = (
  modules: Module[],
  setModules: (modules: Module[]) => void,
  moduleIndex: number
) => {
  const updatedModules = [...modules];
  updatedModules[moduleIndex].lessons.push({
    id: Date.now(),
    title: "",
    description: "",
    content: "",
  });
  setModules(updatedModules);
};

export const handleRemoveLesson = (
  modules: Module[],
  setModules: (modules: Module[]) => void,
  moduleIndex: number,
  lessonIndex: number
) => {
  const updatedModules = [...modules];
  updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);
  setModules(updatedModules);
};

export const handleLessonChange = (
  modules: Module[],
  setModules: (modules: Module[]) => void,
  moduleIndex: number,
  lessonIndex: number,
  field: keyof Lesson,
  value: string
) => {
  const updatedModules = [...modules];
  (updatedModules[moduleIndex].lessons[lessonIndex][field] as string) = value;
  setModules(updatedModules);
};
