"use client";

import { getCourses } from "@/api/courses";
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

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCourses();
      setCourses(response);
    };

    fetchData();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Curso</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Número de módulos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell className="font-medium">{course.title}</TableCell>
            <TableCell>{course.description}</TableCell>
            <TableCell>{course.modules.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
