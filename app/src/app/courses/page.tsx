"use client";

import { getCourses } from "@/api/courses";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/h1";
import { H3 } from "@/components/ui/h3";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Course } from "@/types";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation'

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getCourses();
      setCourses(response);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <H1>Cursos</H1>
      <div className="flex justify-between self-stretch">
        <H3>Clique em um curso para mais detalhes</H3>
        <Button>Novo curso</Button>
      </div>
      {loading ? (
        <Loader2 className="h-20 w-20 animate-spin" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Curso</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Número de módulos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <TableRow onClick={() => router.push(`/courses/${course.id}`)} key={course.id} className="cursor-pointer">
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.modules.length}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Nenhum curso encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
