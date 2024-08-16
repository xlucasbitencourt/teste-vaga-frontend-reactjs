"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse } from "@/api/courses";
import CourseForm from "@/components/CourseForm";
import { Module } from "@/types";

export default function Page() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateCourse = async (title: string, description: string, modules: Module[]) => {
    await createCourse({ title, description, modules });
    router.push("/courses");
  };

  return (
    <CourseForm
      initialTitle=""
      initialDescription=""
      initialModules={[]}
      onSubmit={handleCreateCourse}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  );
}
