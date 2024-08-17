import { validateCourse } from "@/lib/formHandles";
import { Module } from "@/types";

describe("Validação do Curso", () => {
  it("deve retornar falso se o título do curso estiver vazio", () => {
    const result = validateCourse("", "Descrição", [], () => {});
    expect(result).toBe(false);
  });

  it("deve retornar falso se não houver módulos", () => {
    const result = validateCourse("Título", "Descrição", [], () => {});
    expect(result).toBe(false);
  });

  it("deve retornar falso se algum módulo não tiver título ou descrição", () => {
    const modules: Module[] = [
      { id: 1, title: "", description: "Descrição", lessons: [] },
    ];
    const result = validateCourse("Título", "Descrição", modules, () => {});
    expect(result).toBe(false);
  });

  it("deve retornar falso se algum módulo não tiver lições", () => {
    const modules: Module[] = [
      { id: 1, title: "Módulo 1", description: "Descrição", lessons: [] },
    ];
    const result = validateCourse("Título", "Descrição", modules, () => {});
    expect(result).toBe(false);
  });

  it("deve retornar verdadeiro para um curso válido", () => {
    const modules: Module[] = [
      {
        id: 1,
        title: "Módulo 1",
        description: "Descrição",
        lessons: [
          { id: 1, title: "Lição 1", description: "Descrição", content: "Conteúdo" },
        ],
      },
    ];
    const result = validateCourse("Título", "Descrição", modules, () => {});
    expect(result).toBe(true);
  });
});
