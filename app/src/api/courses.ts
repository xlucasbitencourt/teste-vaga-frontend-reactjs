import { Course } from "@/types";
import { api } from "./index";

export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get("/courses");
  return response.data;
};

export const getCourse = async (id: string): Promise<Course> => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (course: Course): Promise<Course> => {
  const response = await api.post("/courses", course);
  return response.data;
};

export const updateCourse = async (id: string, course: Course): Promise<Course> => {
  const response = await api.put(`/courses/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await api.delete(`/courses/${id}`);
};