import type { Link } from "@/data/resume.types";

const linkClass =
  "underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-current dark:decoration-zinc-700";

/** `https://github.com/foo/` → `github.com/foo` */
function displayPath(href: string) {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * 외부 링크 하나. 올려놓거나 포커스하면 어디로 가는지 주소를 보여준다.
 *
 * 순수 CSS(`group-hover` / `group-focus-within`)로만 열고 닫는다 — 이것 하나 때문에
 * 클라이언트 컴포넌트를 만들 이유가 없다. 키보드 포커스에서도 뜨고,
 * `aria-describedby`로 스크린리더에도 읽힌다.
 *
 * `scope`는 같은 링크가 여러 섹션에 나올 때 id가 겹치지 않게 하기 위한 접두사다.
 */
function ExternalLink({ link, scope }: { link: Link; scope: string }) {
  const hintId = `hint-${scope}-${link.kind}`;

  return (
    <span className="group relative inline-block">
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={hintId}
        className={linkClass}
      >
        {link.label}
      </a>
      <span
        id={hintId}
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-20 mt-2 whitespace-nowrap rounded-md border border-zinc-200 bg-background px-3 py-2 text-[11px] leading-relaxed text-zinc-500 opacity-0 shadow-sm transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 dark:border-zinc-800 dark:text-zinc-400"
      >
        {displayPath(link.href)}
      </span>
    </span>
  );
}

/** 이메일 + 외부 링크 한 줄. 히어로와 하단에서 같이 쓴다. */
export function ContactLinks({
  email,
  links,
  scope,
}: {
  email: string;
  links: Link[];
  scope: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm">
      <a href={`mailto:${email}`} className={linkClass}>
        {email}
      </a>
      {links.map((link) => (
        <ExternalLink key={link.href} link={link} scope={scope} />
      ))}
    </div>
  );
}
