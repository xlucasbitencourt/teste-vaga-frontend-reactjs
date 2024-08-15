import { Course } from "@/types";
import { api } from "./index";

export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get("/courses");
  return response.data;
};