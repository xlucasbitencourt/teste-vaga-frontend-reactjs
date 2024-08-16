"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/h1";
import { H2 } from "@/components/ui/h2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Module } from "@/types";
import {
  validateCourse,
  handleModuleChange,
  handleAddLesson,
  handleLessonChange,
  handleRemoveLesson,
  handleRemoveModule,
} from "@/lib/formHandles";

type CourseFormProps = {
  initialTitle: string;
  initialDescription: string;
  initialModules: Module[];
  onSubmit: (title: string, description: string, modules: Module[]) => void;
  onDelete?: () => void;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
};

export default function CourseForm({
  initialTitle,
  initialDescription,
  initialModules,
  onSubmit,
  onDelete,
  errorMessage,
  setErrorMessage,
}: CourseFormProps) {
  const [courseTitle, setCourseTitle] = useState(initialTitle);
  const [courseDescription, setCourseDescription] = useState(initialDescription);
  const [modules, setModules] = useState<Module[]>(initialModules);

  const router = useRouter();

  useEffect(() => {
    setCourseTitle(initialTitle);
    setCourseDescription(initialDescription);
    setModules(initialModules);
  }, [initialTitle, initialDescription, initialModules]);

  const handleAddModule = () => {
    setModules([...modules, { id: Date.now(), title: "", description: "", lessons: [] }]);
  };

  const handleFormSubmit = () => {
    if (!validateCourse(courseTitle, courseDescription, modules, setErrorMessage)) {
      return;
    }
    onSubmit(courseTitle, courseDescription, modules);
  };

  return (
    <div className="flex flex-col gap-4 w-3/4">
      <Button onClick={() => router.push("/courses")}>Voltar</Button>
      <H1>{onDelete ? "Editar Curso" : "Adicionar Novo Curso"}</H1>
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
              onChange={(e) =>
                handleModuleChange(
                  modules,
                  setModules,
                  moduleIndex,
                  "title",
                  e.target.value
                )
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Descrição do Módulo</label>
            <Textarea
              value={module.description}
              onChange={(e) =>
                handleModuleChange(
                  modules,
                  setModules,
                  moduleIndex,
                  "description",
                  e.target.value
                )
              }
            />
          </div>
          <Button onClick={() => handleAddLesson(modules, setModules, moduleIndex)}>
            Adicionar Lição
          </Button>
          {module.lessons.map((lesson, lessonIndex) => (
            <div key={lesson.id} className="flex flex-col gap-2 mt-2">
              <H2>Lição {lessonIndex + 1}</H2>
              <div className="flex flex-col gap-2">
                <label>Título da Lição</label>
                <Input
                  value={lesson.title}
                  onChange={(e) =>
                    handleLessonChange(
                      modules,
                      setModules,
                      moduleIndex,
                      lessonIndex,
                      "title",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Descrição da Lição</label>
                <Textarea
                  value={lesson.description}
                  onChange={(e) =>
                    handleLessonChange(
                      modules,
                      setModules,
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
                      modules,
                      setModules,
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
                onClick={() =>
                  handleRemoveLesson(modules, setModules, moduleIndex, lessonIndex)
                }
              >
                Remover Lição
              </Button>
            </div>
          ))}
          <Button
            variant="destructive"
            onClick={() => handleRemoveModule(modules, setModules, moduleIndex)}
          >
            Remover Módulo
          </Button>
        </div>
      ))}
      <Button onClick={handleAddModule}>Adicionar Módulo</Button>
      <Button variant="success" onClick={handleFormSubmit} className="mt-4">
        {onDelete ? "Salvar Curso" : "Criar Curso"}
      </Button>
      {onDelete && (
        <Button variant="destructive" onClick={onDelete}>
          Excluir Curso
        </Button>
      )}
    </div>
  );
}
