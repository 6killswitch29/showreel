import type { Resume } from "./resume.types";

/**
 * ★ 단일 데이터 소스. 이력 내용은 여기서만 고친다.
 *
 * 스키마는 `resume.types.ts` 참고.
 * 전화번호와 상세 주소는 넣지 않는다 — 사이트 노출 금지 항목이고, 연락은 이메일과 링크로만 받는다.
 * (인쇄용 PDF에만 넣고 싶다면 이 파일이 아니라 /resume 라우트에서 따로 처리한다.)
 *
 * 남은 빈칸은 `TODO:`를 grep 해서 채운다.
 */
export const resume: Resume = {
  profile: {
    name: "김용현",
    nameEn: "Yonghyun Kim",
    headline: "백엔드 중심 풀스택 개발자",
    specialty: "Product Engineer, Full-stack Developer",
    // 화면에는 안 나온다. 검색 결과 · 링크 미리보기용 한 문장.
    summary:
      "Google Workspace 보안 도메인의 B2B SaaS를 설계·개발·운영해 온 백엔드 중심 풀스택 개발자. 인증·인가, 테넌트 격리, fail-closed처럼 사고를 구조에서 예방하는 설계에 강점이 있습니다.",
    email: "ky8175@gmail.com",
    links: [
      { kind: "github", label: "GitHub", href: "https://github.com/6killswitch29" },
      // TODO: 개발일지 블로그 URL이 정해지면 추가. 없으면 이 줄을 지운다.
      // { kind: "blog", label: "개발일지", href: "https://..." },
    ],
  },

  about: {
    // 이력서의 Profile 문단. 문체: 경력기술서는 "~했다", 소개는 "~습니다".
    lead: [
      "Google Workspace 보안 도메인의 B2B SaaS를 설계·개발·운영해 온 백엔드 중심 풀스택 개발자입니다.",
      "멀티테넌트 보안 운영 플랫폼을 초기 요구사항과 DB 설계부터 백엔드·프론트엔드·인프라·운영까지 구축해 30개 이상 고객 도메인이 사용하는 프로덕션 서비스로 운영하고 있습니다.",
      "이후 AI 데이터 반출 통제(DLP), OAuth 2.1 기반 MCP 서버, 월간 보안 리포트 자동화, AI Agent 등 신규 제품을 PoC부터 실제 제품 기능까지 구현했습니다.",
      "특히 인증·인가, 테넌트 격리, fail-closed, 멱등성, 점진적 롤아웃처럼 장애와 보안 사고를 애플리케이션 구조에서 예방하는 설계에 관심과 강점이 있습니다.",
    ],

    principles: [
      {
        title: "권한은 필요한 만큼만, 경계는 미리 좁혀 둔다",
        body:
          "사고가 안 난다고 가정하지 않습니다. 났을 때 어디까지 닿는지를 먼저 계산하고, " +
          "그 범위를 줄일 수 있는 만큼 줄여 둡니다. " +
          "권한을 넓게 열어두면 당장은 편하지만, 그 편함은 사고가 난 뒤에 그대로 피해 크기가 됩니다.",
        evidence:
          "Agent마다 Google Workspace API Scope를 최소화해 기능별로 권한을 갈랐고, MCP 서버에서는 데이터를 갖지 않는 공개 파사드를 내부 API와 분리해 파사드가 뚫려도 닿는 범위를 한정했습니다. 가장 약한 자격이던 정적 토큰도 그때 없앴습니다.",
        relatedAchievementId: "gws-security-agent",
      },
      {
        title: "혼자 만들어도, 남이 이어받을 수 있게 남긴다",
        body:
          "담당자가 나 혼자인 시스템일수록 문서가 더 필요하다고 생각합니다. " +
          "왜 이 설정값인지, 장애가 나면 뭘 먼저 보는지를 남기지 않으면 그 지식은 제 머릿속에서만 살다가 사라집니다. " +
          "문서를 쓰는 일을 기능을 만드는 일과 같은 무게로 둡니다.",
        evidence:
          "2년 넘게 운영해 온 MSSP 플랫폼에 장애 복구 Runbook · ERD · API 명세 · 운영 문서를 남겨, 특정 개발자에게 의존하던 운영 지식을 문서로 옮겼습니다.",
        relatedAchievementId: "mssp-platform",
      },
      {
        title: "재발은 코드가 아니라 구조로 막는다",
        body:
          "같은 사고가 두 번 나면 그건 사람이 조심하지 않아서가 아니라 구조가 허용해서라고 봅니다. " +
          "fail-closed, 테넌트 격리, 멱등성, 점진적 롤아웃처럼 실수해도 사고로 번지지 않는 형태를 먼저 잡습니다.",
        evidence:
          "MCP 서버에서 테넌트를 요청 파라미터가 아닌 인증된 계정 정보로만 결정되게 하고, Cross-Tenant 접근이 불가능하다는 것을 테스트로 고정했습니다.",
        relatedAchievementId: "dlp-mcp-server",
      },
      {
        title: "AI가 낸 답은 재현해 보고 받는다",
        body:
          "구현·리뷰·수정 사이클에 AI를 적극적으로 쓰지만, 지적을 그대로 반영하지는 않습니다. " +
          "서로 다른 모델로 교차 검증하고, 상충하는 지적은 직접 재현해 본 뒤에 고칠지를 정합니다. " +
          "판단의 근거는 모델의 확신이 아니라 재현된 결과여야 합니다.",
        evidence:
          "보안 리뷰에서 나온 지적을 테스트로 재현한 뒤 수정했고, AI 기능 자체에도 최소 권한 · 인가 · Human Approval 같은 보안 원칙을 적용했습니다.",
        relatedAchievementId: "dlp-mcp-server",
      },
    ],

    sections: [
      {
        id: "in-a-team",
        title: "그럼 팀에서는 어떻게 일하나요?",
        body: [
          "혼자 만든 것이 이력의 대부분이라 이 질문을 자주 받습니다. 실제로는 이미 돌아가고 있는 팀 코드베이스에 들어가 승인 워크플로를 다시 설계한 적이 있고, 그때 배운 것은 단독 구축에서 배운 것과 달랐습니다.",
          "가장 큰 차이는 제 판단만으로 바꿀 수 없다는 점이었습니다. 승인 모델을 통째로 갈아야 했지만 이미 쓰고 있는 고객사가 있었기 때문에, 구 방식을 남긴 채 테넌트별 Feature Flag로 옮기는 쪽을 택했습니다. 혼자였다면 한 번에 바꿨을 겁니다.",
          "그래서 팀에서는 제 설계를 관철하는 것보다, 되돌릴 수 있는 형태로 제안하는 것을 먼저 생각합니다.",
        ],
      },
      {
        id: "ai-assisted",
        title: "AI를 개발에 어떻게 쓰나요?",
        body: [
          "Claude Code의 Hook과 Custom Sub-agent로 구현 → 리뷰 → 수정 사이클을 워크플로에 넣었습니다. 자격증명 검사나 코드 리뷰처럼 목적이 다른 리뷰어를 따로 두고 돌립니다.",
          "Claude와 OpenAI Codex를 교차로 써서 보안·코드 리뷰 결과를 비교합니다. 한 모델에만 기대면 놓치는 것과 치우치는 것이 같이 생겨서입니다.",
          "AI가 낸 코드나 보안 지적은 그대로 받지 않습니다. 문제라고 지적된 것은 직접 테스트로 재현한 뒤에 고칩니다. 판단 기준은 실제 실행 결과입니다.",
        ],
      },
    ],
  },

  experiences: [
    {
      id: "netkiller",
      company: "넷킬러 주식회사",
      companyNote: "Google Workspace 보안 도메인의 B2B SaaS 기업",
      role: "풀스택 개발자",
      period: { start: "2023-12" },
      employmentType: "fulltime",
      summary:
        "Google Workspace 기반 B2B 보안 제품의 설계·개발·배포·운영을 담당하며, 기존 제품 개선과 신규 제품 PoC 및 제품화를 함께 수행하고 있다.",
      stack: [
        "Java 17",
        "Spring Boot 3",
        "Spring Security 6",
        "TypeScript",
        "Node.js 22",
        "Python",
        "FastAPI",
        "React",
        "Angular",
        "MySQL",
        "Redis",
        "GCP",
        "Docker",
      ],
      // 날짜순이 아니라 중요도순. 순서를 바꾸려면 이 배열만 재배치하면 된다.
      achievements: [
        {
          id: "mssp-platform",
          title:
            "멀티테넌트 보안 관제 플랫폼을 초기 설계부터 구축해 30개 이상 고객 도메인 운영까지",
          contribution:
            "제품 설계 · Backend · Frontend · Infrastructure · Production Operation",
          featured: true,
          period: { start: "2024-04" },
          situation:
            "사내 보안 운영자가 고객사 Google Workspace의 Drive 활동 · 공유 권한 · 메일 사용량을 관제하고 월간 보안 리포트를 제공할 통합 수단이 없었다.",
          actions: [
            "요구사항 정의부터 MySQL 데이터 모델링, REST API 83개, 백엔드 · 관리자 콘솔 · 배포 환경까지 구축했다.",
            "React 기반 보안 관제 콘솔을 설계·구현해, 고객사별 계정 · Drive 활동 · 공유 권한 · 메일 사용 현황을 하나의 운영 화면에서 관리하도록 했다.",
            "GCP Cloud Build 기반 Sandbox / Production 배포 파이프라인과 Docker 실행 환경을 구축하고, Secret Manager로 애플리케이션 시크릿 관리 체계를 일원화했다.",
            "서버에 존재하던 SSL 개인키를 Cloud KMS · GCS 기반 구조로 이전하고 의존성 공급망 정책을 적용했다.",
            "장애 복구 Runbook · ERD · API 명세 · 운영 문서를 작성했다.",
          ],
          results: [
            "2024년 5월 첫 운영 투입 이후 30개 이상 고객 도메인을 관제하는 프로덕션 서비스로 운영 중이다.",
            "운영 서버의 장기 자격증명 노출 범위를 줄였다.",
            "특정 개발자에게 의존하던 운영 지식을 문서로 옮겼다.",
          ],
          metrics: [
            {
              label: "관제 중인 고객 도메인",
              value: 30,
              unit: "개 이상",
              note: "2024.05 첫 운영 투입 이후",
            },
            { label: "설계·구현한 REST API", value: 83, unit: "개" },
          ],
          stack: [
            "Java 17",
            "Spring Boot 3",
            "Spring Security 6",
            "MySQL",
            "React",
            "JavaScript",
            "GCP",
            "Docker",
          ],
        },
        {
          id: "ai-export-dlp",
          title:
            "생성형 AI로 나가는 파일과 프롬프트를 전송 순간에 통제해, 서버 판정을 통과한 것만 흘려보내는 제품을 PoC부터 제품 기능까지",
          contribution: "제품 설계 · Backend · Chrome Extension · Admin Console",
          featured: true,
          period: { start: "2026-07", end: "2026-07" },
          situation:
            "임직원이 ChatGPT · Claude · Gemini 등 생성형 AI 서비스로 파일이나 프롬프트를 전송할 때 기밀 데이터 유출을 통제할 수단이 없었다.",
          actions: [
            "브라우저의 사용자 전송을 capture → pause → verify → replay 단계로 분리해, 서버의 allow / warn / deny 판정 이후에만 원래 요청이 실행되는 fail-closed 구조를 설계했다.",
            "콘텐츠 SHA-256 해시 기반 인증 모델을 도입해 동일 콘텐츠의 중복 스캔을 제거하고, 파일명 변경을 이용한 DLP 우회 경로를 차단했다.",
            "최대 512MB 파일을 메모리에 전체 적재하지 않는 스트리밍 스캔 구조로 구현하고 Apache Tika 및 OCR 분석 파이프라인을 연동했다.",
            "Chrome MV3 Extension에서 파일 업로드 · 드래그앤드롭 · 붙여넣기 등 5개 전송 경로를 capture phase에서 제어하고, CSP · Trusted Types · IME 조합 입력 같은 브라우저 제약에 대응했다.",
            "테넌트별로 OFF → MONITOR → WARN → BLOCK 단계의 정책 집행 모델을 설계해, 운영 중인 고객에게 기능을 점진적으로 적용할 수 있게 했다.",
            "1만 사용자 환경을 가정한 경로별 성능·비용 분석을 수행했다.",
          ],
          results: [
            "PoC에서 제품 기능 수준까지 약 4주 만에 올렸다.",
            "인증 캐시 히트를 약 20ms로 만들어 같은 콘텐츠의 중복 스캔을 제거했다.",
            "업로드 대역폭을 약 33% 절감할 수 있는 구조 개선안을 제안했다.",
          ],
          metrics: [
            { label: "PoC → 제품 기능", value: 4, unit: "주" },
            { label: "인증 캐시 히트", value: 20, unit: "ms", note: "중복 스캔 제거" },
            { label: "업로드 대역폭", prefix: "-", value: 33, unit: "%", note: "구조 개선안" },
            { label: "스트리밍 스캔 상한", value: 512, unit: "MB", note: "메모리 전체 적재 없이" },
          ],
          stack: [
            "Java 17",
            "Servlet",
            "Spring JDBC",
            "MySQL",
            "Redis",
            "Apache Tika",
            "Tesseract OCR",
            "Angular 19",
            "Chrome Extension MV3",
            "HMAC-SHA256",
          ],
        },
        {
          id: "dlp-mcp-server",
          title:
            "외부 AI 클라이언트에 DLP 데이터를 여는 경로를 OAuth 2.1 인가 서버부터 구현하고, 테넌트 경계를 구조로 고정",
          contribution: "Architecture · OAuth/OIDC · MCP Server · Security Design",
          featured: true,
          period: { start: "2026-08", end: "2026-09" },
          situation:
            "Claude 등 외부 AI 클라이언트가 DLP 정책 · 위반 · 스캔 데이터를 조회할 수 있어야 했지만, 사용자에게 허용된 테넌트 범위를 벗어나지 않는다는 보장이 필요했다.",
          actions: [
            "외부에 노출되는 MCP Facade와 기존 DLP 내부 API를 분리한 Public Boundary ↔ Private API 2계층 구조를 설계했다.",
            "MCP 인증 요구사항을 충족하기 위해 OAuth 2.1 Authorization Server를 구현하고 PKCE S256, Ed25519 서명 액세스 토큰, 키 회전, Refresh Token Rotation을 적용했다.",
            "탈취된 Refresh Token 재사용을 탐지하면 해당 토큰 계열 전체를 폐기하는 Reuse Detection과, 외부 URL 접근에 대한 SSRF 방어를 넣었다.",
            "Google Workspace 계정을 이용한 OIDC 로그인 브리지를 구성하고, MCP 신규 · 기존 클라이언트 프로토콜을 동시에 지원했다.",
            "요청 파라미터가 아닌 인증된 계정 정보에서만 테넌트가 결정되도록 인가 경계를 구성했다.",
          ],
          results: [
            "테스트로 Cross-Tenant 접근이 불가능한 구조를 고정했다.",
            "자동화 테스트 165개와 보안 리뷰를 수행했다.",
            "기존 정적 토큰 기반 인증 경로를 제거해 장기 자격증명 사용 범위를 줄였다.",
          ],
          metrics: [
            { label: "자동화 테스트", value: 165, unit: "개" },
            { label: "설계 → 구현 완료", value: 6, unit: "일", note: "2026.08.28 → 09.02" },
          ],
          stack: [
            "TypeScript",
            "Node.js 22",
            "Express 5",
            "MCP SDK",
            "OAuth 2.1",
            "OIDC",
            "Java 17 Servlet",
            "Ed25519",
          ],
        },
        {
          id: "approval-workflow",
          title: "승인 병목과 테넌트 간 데이터 조회 경로를 함께 제거한 승인 워크플로 재설계",
          contribution: "설계 · 구현 담당 — 팀 코드베이스, Backend · Frontend",
          period: { start: "2026-08", end: "2026-08" },
          situation:
            "승인 담당자가 부재하면 데이터 반출 요청이 수일간 처리되지 않는 단일 승인자 구조였고, 승인 상세 조회에서 다른 테넌트의 데이터를 볼 수 있는 경로도 남아 있었다.",
          actions: [
            "단일 승인자를 복수 승인자 중 1인 승인 모델로 재설계했다.",
            "기존 고객에게 영향을 주지 않도록 테넌트별 Feature Flag 기반 점진적 롤아웃을 적용했다.",
            "Google Chat을 이용한 외부 승인 채널을 추가하고 요청 서명 검증을 적용했다.",
            "승인 상세 조회 API에 추가 인가 검증을 적용했다.",
          ],
          results: [
            "특정 승인자 부재로 전체 요청 처리가 중단되는 구조를 없앴다.",
            "제품에 직접 로그인하지 않고도 승인 · 반려할 수 있게 됐다.",
            "다른 테넌트의 승인 데이터를 조회할 수 있던 접근 경로를 차단했다.",
          ],
          stack: ["Java", "Spring", "Angular", "TypeScript", "Google Chat API"],
        },
        {
          id: "mssp-report-server",
          title: "고객사별로 반복하던 월간 보안 리포트 생성을 FastAPI 서비스로 자동화",
          contribution: "설계 · 구현 전담",
          period: { start: "2026-02", end: "2026-06" },
          situation:
            "고객사별 Google Workspace 월간 보안 리포트를 매달 수작업으로 만들고 있었다.",
          actions: [
            "데이터 조회부터 Chart → CSV → PDF → GCS Upload까지 이어지는 리포트 생성 파이프라인을 구현했다.",
            "특정 차트 생성 실패가 전체 리포트 실패로 전파되지 않도록 섹션 단위로 장애를 격리했다.",
            "Idempotency Key를 도입해 동일 작업 재실행 시 중복 결과 생성을 막았다.",
            "단계별 처리시간 메트릭과 8종 오류 분류 체계를 추가했다.",
            "Linux Headless 환경의 한글 폰트 렌더링 문제를 해결하고 PDF · CSV 한/영 리포트 생성을 지원했다.",
          ],
          results: [
            "월간 리포트 발행을 자동화했다.",
            "부분 실패에도 나머지 섹션으로 리포트가 나오고, 배치 재처리가 안전해졌다.",
            "실패 원인과 성능 병목을 추적할 수 있게 됐다.",
          ],
          // TODO: 확인되면 결과/metrics에 추가 — 월 발행 건수, 도메인당 자동 생성 시간.
          //       (수작업 시절 소요 시간은 기록이 없어 비교 수치로 쓰지 않는다.)
          metrics: [
            { label: "자동화 테스트", value: 99, unit: "개", note: "pytest" },
            { label: "오류 분류 체계", value: 8, unit: "종", note: "실패 원인 · 병목 추적" },
          ],
          stack: [
            "Python",
            "FastAPI",
            "Pydantic v2",
            "WeasyPrint",
            "Jinja2",
            "Matplotlib",
            "Pandas",
            "GCS",
            "Docker",
          ],
        },
        {
          id: "gws-security-agent",
          title: "GWS 관리자의 보안 점검을 자연어 인터페이스 하나로 통합",
          contribution: "단독 구축 — Agent Build Challenge 출품 · 완주",
          situation:
            "Google Workspace 관리자가 사용자 · 메일 · Drive 보안 상태를 확인할 때 각각 다른 Admin SDK API를 직접 조회해야 했다.",
          actions: [
            "사용자 · 메일 · Drive를 담당하는 3개 전문 Agent와 정책 Dashboard를 분리하고 A2A 기반으로 오케스트레이션했다.",
            "Agent별 Google Workspace API Scope를 최소화해 기능별 권한을 분리하고 독립적으로 배포 가능한 구조를 적용했다.",
            "Vertex AI RAG로 Admin SDK API 및 쿼리 정보를 Grounding해 잘못된 API 호출 생성 가능성을 낮췄다.",
            "사용자 계정이나 정책을 변경하는 모든 Write Action에 명시적인 사용자 승인 단계를 강제했다.",
          ],
          results: [
            "작업마다 API를 직접 조회하던 흐름을 자연어 요청 한 번으로 대체했다.",
            "Write Action에 승인 단계를 둬, 잘못된 자연어 해석이 곧바로 계정 변경으로 이어지지 않게 했다.",
            "Agent Build Challenge에 출품해 완주했다.",
          ],
          metrics: [
            { label: "단독 구축 기간", value: 3, unit: "주" },
            {
              label: "분리한 Agent",
              value: 3,
              unit: "개",
              note: "사용자 · 메일 · Drive + 정책 Dashboard",
            },
          ],
          stack: [
            "Python",
            "FastAPI",
            "Google ADK",
            "A2A",
            "Vertex AI Gemini",
            "RAG",
            "Redis",
            "Cloud Run",
          ],
        },
      ],
    },
  ],

  // 회사 업무는 experiences.achievements에 있다. 여기는 사이드 프로젝트 · OSS 자리.
  projects: [],

  // TODO: level(expert / proficient / familiar)과 years는 본인 판단으로 채운다.
  skills: [
    {
      id: "backend",
      category: "Backend",
      skills: [
        { name: "Java 17" },
        { name: "Spring Boot 3" },
        { name: "Spring Security 6" },
        { name: "Node.js" },
        { name: "Express" },
        { name: "Python" },
        { name: "FastAPI" },
        { name: "Spring JDBC" },
        { name: "MySQL" },
        { name: "Redis" },
      ],
    },
    {
      id: "frontend",
      category: "Frontend",
      skills: [
        { name: "React" },
        { name: "Angular" },
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "HTML/CSS" },
        { name: "Chrome Extension MV3" },
      ],
    },
    {
      id: "security",
      category: "Security & Authentication",
      skills: [
        { name: "OAuth 2.1" },
        { name: "OIDC" },
        { name: "PKCE" },
        { name: "DLP" },
        { name: "Multi-tenant Authorization" },
        { name: "HMAC-SHA256" },
        { name: "EdDSA" },
      ],
    },
    {
      id: "infra",
      category: "Cloud & Infrastructure",
      skills: [
        { name: "GCP" },
        { name: "Cloud Run" },
        { name: "GCE" },
        { name: "Cloud Build" },
        { name: "Cloud KMS" },
        { name: "Secret Manager" },
        { name: "GCS" },
        { name: "Docker" },
      ],
    },
    {
      id: "ai",
      category: "AI",
      skills: [
        { name: "Google ADK" },
        { name: "A2A" },
        { name: "Vertex AI" },
        { name: "RAG" },
        { name: "MCP" },
        { name: "Claude Code" },
        { name: "OpenAI Codex" },
      ],
    },
  ],

  education: [
    {
      school: "Seneca College of Applied Arts and Technology",
      degree: "전문학사 (2년제)",
      major: "Computer Programming",
      period: { start: "2021-01", end: "2022-12" },
    },
  ],

  languages: [{ name: "영어", level: "일상 회화" }],

  updatedAt: "2026-09",
};

export default resume;
