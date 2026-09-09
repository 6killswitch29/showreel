/**
 * 섹션 목록. 네비게이션과 섹션 머리가 **같은 출처**를 보게 해서
 * 라벨이나 번호가 한쪽만 바뀌는 일을 막는다. 순서를 바꾸면 번호도 같이 바뀐다.
 */
export const SECTIONS = [
  { id: "about", label: "소개" },
  { id: "career", label: "경력" },
  { id: "skills", label: "기술" },
  { id: "contact", label: "그 밖에" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** 섹션의 라벨과 순번(`"01"` 형식)을 돌려준다. */
export function sectionMeta(id: SectionId) {
  const i = SECTIONS.findIndex((s) => s.id === id);
  return { ...SECTIONS[i], index: String(i + 1).padStart(2, "0") };
}
