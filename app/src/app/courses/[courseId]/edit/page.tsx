"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCourse, updateCourse, deleteCourse } from "@/api/courses";
import CourseForm from "@/components/CourseForm";
import Modal from "@/components/ui/Modal";
import { Module } from "@/types";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

  const handleUpdateCourse = async (
    title: string,
    description: string,
    modules: Module[]
  ) => {
    await updateCourse(courseId, { title, description, modules });
    router.push("/courses");
  };

  const handleDeleteCourse = async () => {
    setIsModalOpen(true);
  };

  const confirmDeleteCourse = async () => {
    await deleteCourse(courseId);
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <CourseForm
        initialTitle={courseTitle}
        initialDescription={courseDescription}
        initialModules={modules}
        onSubmit={handleUpdateCourse}
        onDelete={handleDeleteCourse}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <Modal
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita."
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteCourse}
        confirmButtonText="Excluir"
        cancelButtonText="Cancelar"
      />
      <Modal
        title="Curso Excluído"
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          router.push("/courses");
        }}
        confirmButtonText="Fechar"
        onlyClose
      />
    </>
  );
}
