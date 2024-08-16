export interface Course {
    id?: number;
    title: string;
    description: string;
    modules: Module[];
}

export interface ModuleRequest {
    title: string;
    description: string;
    lessons: Lesson[];
}

export interface Module {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
}

export interface Lesson {
    id: number;
    title: string;
    description: string;
    content: string;
}