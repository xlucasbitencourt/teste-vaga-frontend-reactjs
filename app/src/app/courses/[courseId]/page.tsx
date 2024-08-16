"use client";

import { getCourse } from "@/api/courses";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/h1";
import { H2 } from "@/components/ui/h2";
import { H3 } from "@/components/ui/h3";
import { P } from "@/components/ui/p";
import { Course } from "@/types";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation'

type Props = {
  params: {
    courseId: string;
  };
};

export default function Page({ params: { courseId } }: Props) {
  const [course, setCourse] = useState<Course>();
  const [loading, setLoading] = useState(true);

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCourse(courseId);
        setCourse(response);
      } catch (error: any) {
        console.error(error.response.data.message);
        router.push("/courses");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Loader2 className="h-20 w-20 animate-spin" />;

  return (
    <div className="flex flex-col gap-4">
      <H1>{course?.title}</H1>
      <H3>{course?.description}</H3>
      <H2>Módulos</H2>
      <div className="grid grid-cols-1 gap-4">
        {course?.modules.map((module, moduleIndex) => (
          <div key={module.id} className="flex flex-col gap-2">
            <H3>
              {moduleIndex + 1}. {module.title}
            </H3>
            <P>{module.description}</P>
            <H3>Lições deste módulo:</H3>
            <ul className="bg-gray-100 rounded-xl max-h-40 overflow-auto">
              {module.lessons.length > 0 && (
                <li className="ml-10">
                  {module.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex flex-col gap-2 mb-4">
                      <H3>
                        Lição {index + 1}: {lesson.title}
                      </H3>
                      <P>{lesson.description}</P>
                      <P>{lesson.content}</P>
                    </div>
                  ))}
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
