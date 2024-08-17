"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse } from "@/api/courses";
import CourseForm from "@/components/CourseForm";
import { Module } from "@/types";
import Modal from "@/components/ui/Modal";

export default function Page() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const router = useRouter();

  const handleCreateCourse = async (
    title: string,
    description: string,
    modules: Module[]
  ) => {
    await createCourse({ title, description, modules });
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <CourseForm
        initialTitle=""
        initialDescription=""
        initialModules={[]}
        onSubmit={handleCreateCourse}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <Modal
        title="Curso Adicionado"
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
