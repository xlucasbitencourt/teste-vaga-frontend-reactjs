"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/h1";
import { H2 } from "@/components/ui/h2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Module, Lesson } from "@/types";
import { getCourse, updateCourse, deleteCourse } from "@/api/courses";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    courseId: string;
  };
};

export default function EditCoursePage({ params: { courseId } }: Props) {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourse(courseId);
        setCourseTitle(response.title);
        setCourseDescription(response.description);
        setModules(response.modules);
      } catch (error: any) {
        console.error(error.response.data.message);
      }
    };

    fetchCourse();
  }, [courseId]);

  const validateCourse = () => {
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
        if (
          !lesson.title.trim() ||
          !lesson.description.trim() ||
          !lesson.content.trim()
        ) {
          setErrorMessage("Todas as lições devem ter título, descrição e conteúdo.");
          return false;
        }
      }
    }

    setErrorMessage(null);
    return true;
  };

  const handleAddModule = () => {
    setModules([...modules, { id: Date.now(), title: "", description: "", lessons: [] }]);
  };

  const handleRemoveModule = (moduleIndex: number) => {
    const updatedModules = [...modules];
    updatedModules.splice(moduleIndex, 1);
    setModules(updatedModules);
  };

  const handleModuleChange = (index: number, field: keyof Module, value: string) => {
    const updatedModules = [...modules];
    (updatedModules[index][field] as string) = value;
    setModules(updatedModules);
  };

  const handleAddLesson = (moduleIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons.push({
      id: Date.now(),
      title: "",
      description: "",
      content: "",
    });
    setModules(updatedModules);
  };

  const handleRemoveLesson = (moduleIndex: number, lessonIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);
    setModules(updatedModules);
  };

  const handleLessonChange = (
    moduleIndex: number,
    lessonIndex: number,
    field: keyof Lesson,
    value: string
  ) => {
    const updatedModules = [...modules];
    (updatedModules[moduleIndex].lessons[lessonIndex][field] as string) = value;
    setModules(updatedModules);
  };

  const handleSubmit = async () => {
    if (!validateCourse()) {
      return;
    }

    const updatedCourse = {
      title: courseTitle,
      description: courseDescription,
      modules: modules,
    };

    await updateCourse(courseId, updatedCourse);
    router.push("/courses");
  };

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      await deleteCourse(courseId);
      router.push("/courses");
    }
  };

  return (
    <div className="flex flex-col gap-4 w-3/4">
      <Button onClick={() => router.push("/courses")}>Voltar</Button>
      <H1>Editar Curso</H1>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div className="flex flex-col gap-2">
        <label>Título do Curso</label>
        <Input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <label>Descrição do Curso</label>
        <Textarea
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
      </div>
      <H2>Módulos</H2>
      {modules.map((module, moduleIndex) => (
        <div key={module.id} className="flex flex-col gap-4 mb-4">
          <H2>Módulo {moduleIndex + 1}</H2>
          <div className="flex flex-col gap-2">
            <label>Título do Módulo</label>
            <Input
              value={module.title}
              onChange={(e) => handleModuleChange(moduleIndex, "title", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Descrição do Módulo</label>
            <Textarea
              value={module.description}
              onChange={(e) =>
                handleModuleChange(moduleIndex, "description", e.target.value)
              }
            />
          </div>
          <Button onClick={() => handleAddLesson(moduleIndex)}>Adicionar Lição</Button>
          {module.lessons.map((lesson, lessonIndex) => (
            <div key={lesson.id} className="flex flex-col gap-2 mt-2">
              <H2>Lição {lessonIndex + 1}</H2>
              <div className="flex flex-col gap-2">
                <label>Título da Lição</label>
                <Input
                  value={lesson.title}
                  onChange={(e) =>
                    handleLessonChange(moduleIndex, lessonIndex, "title", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Descrição da Lição</label>
                <Textarea
                  value={lesson.description}
                  onChange={(e) =>
                    handleLessonChange(
                      moduleIndex,
                      lessonIndex,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Conteúdo da Lição</label>
                <Textarea
                  value={lesson.content}
                  onChange={(e) =>
                    handleLessonChange(
                      moduleIndex,
                      lessonIndex,
                      "content",
                      e.target.value
                    )
                  }
                />
              </div>
              <Button
                variant="destructive"
                onClick={() => handleRemoveLesson(moduleIndex, lessonIndex)}
              >
                Remover Lição
              </Button>
            </div>
          ))}
          <Button variant="destructive" onClick={() => handleRemoveModule(moduleIndex)}>
            Remover Módulo
          </Button>
        </div>
      ))}
      <Button onClick={handleAddModule}>Adicionar Módulo</Button>
      <Button variant="success" onClick={handleSubmit} className="mt-4">
        Salvar Curso
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        Excluir Curso
      </Button>
    </div>
  );
}
