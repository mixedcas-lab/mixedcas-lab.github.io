# MCAS Lab 홈페이지

서울시립대학교 MCAS Lab의 기존 Google Sites 내용을 옮긴 **GitHub Pages용 홈페이지**입니다. 네이비, 골드 포인트, 실제 칩 사진을 사용했습니다. 공개 배포 전의 완성 소스이며, 기존 홈페이지나 GitHub 저장소는 변경하지 않았습니다.

## 가장 먼저 볼 파일

- **다른 AI에게 맡기기:** [AI-HANDOFF.md](AI-HANDOFF.md)
- **화면과 구조 설명 대본:** [docs/EXPLANATION-SCRIPT.ko.md](docs/EXPLANATION-SCRIPT.ko.md)
- **GitHub에 올리는 방법:** [docs/DEPLOY.ko.md](docs/DEPLOY.ko.md)
- **기존 자료에서 확인할 사항:** [docs/CONTENT-REVIEW.ko.md](docs/CONTENT-REVIEW.ko.md)

## 들어 있는 내용

| 메뉴 | 내용 |
| --- | --- |
| Home | 칩 사진 첫 화면, 연구 분야, 대표 논문, ADC Census, 사진, 최근 소식, 모집 |
| Research | 기존 5개 연구 분야와 칩 사진 전체 |
| People | 교수 소개·경력·학력·활동, 기존 학생 페이지의 9명 |
| Publications | 논문·원고 30건, 제목·저자 검색, 연도·종류 필터, 특허 8건 |
| Life at MCAS | 38개 앨범, 원본 사진 83장, 확대 보기와 이전·다음 |
| News | 2022~2026 소식 40건, 검색과 연도 필터 |
| Teaching | 기존 강의 페이지의 8개 학기·기간 |
| Join / Contact | 대학원생 모집, 이메일, 교수 연구실 전화, 위치 |

논문 30건은 출판 완료뿐 아니라 원본에 있던 **게재 승인·심사 중 원고도 포함**합니다. 확인되지 않은 DOI를 만들지 않고 Google Scholar 제목 검색을 제공합니다. 전체 구성원·사진·게시물은 2026-10-23에 확인한 기존 사이트를 기준으로 합니다.

## 미리보기

Node.js 24와 pnpm 11.25.0을 사용하는 프로젝트입니다. 일반 Node.js 설치에 npm이 포함돼 있다면 다음 순서로 준비할 수 있습니다.

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

출력되는 로컬 주소를 브라우저에서 엽니다. 배포용 파일과 같은 결과를 보려면:

```sh
pnpm build
pnpm validate
node scripts/preview.mjs
```

기본 주소는 `http://127.0.0.1:4173/`입니다. 포트가 사용 중이면 기존 미리보기를 종료하거나 `PORT` 환경변수를 바꿉니다. 단순히 `index.html`을 더블클릭하면 폴더 주소 이동이 운영체제마다 달라질 수 있어 HTTP 미리보기를 권장합니다.

## 평소 수정은 데이터 파일에서

| 바꿀 내용 | 파일 |
| --- | --- |
| 연구실 이름·연락처·소개 | `src/data/site.json` |
| 교수 소개 | `src/data/professor.json` |
| 멤버 | `src/data/members.json` |
| 논문 | `src/data/publications.json` |
| 특허 | `src/data/patents.json` |
| 연구 분야 | `src/data/research.json` |
| 소식 | `src/data/news.json` |
| 사진 앨범 | `src/data/gallery.json` |
| 강의 | `src/data/teaching.json` |
| 색·글꼴·간격·모바일 배치 | `public/styles.css` |
| 첫 화면 구성·대표 항목 | `src/pages/index.astro` |

사진은 `public/images/`에 추가하고 데이터에는 `images/파일이름.jpg`처럼 씁니다. 임시 Google 이미지 주소에 의존하지 않습니다. 콘텐츠는 빌드할 때 HTML로 생성하므로 검색과 메뉴를 제외한 본문은 JavaScript 없이도 표시됩니다.

## 구성

```text
.github/workflows/   GitHub Pages 배포·PR 검사
src/data/            연구실 콘텐츠 JSON
src/pages/           페이지와 이전 URL 연결
src/components/      칩 사진, 논문 항목, 페이지 제목
src/layouts/         공통 메뉴·하단·메타 정보
src/lib/             상대 주소 계산
public/              CSS, 브라우저 동작, 사진
scripts/             검증·미리보기
docs/                배포·이관 기록·설명 대본
dist/                생성된 배포 파일 — 직접 수정하지 않음
```

Astro는 HTML 생성에만 사용합니다. 서버·데이터베이스·로그인·유료 서비스·외부 폰트가 필요하지 않습니다. 내부 주소가 상대 경로여서 `사용자.github.io/저장소명/`과 독립 도메인 모두에서 작동합니다.

## 검증

`pnpm build` 뒤 `pnpm validate`를 실행합니다. 생성된 페이지, 내부 링크, 문서 내 위치, 이미지 참조, 데이터 중복과 필수 필드를 검사합니다. 브라우저에서는 모바일 메뉴, 검색, 갤러리와 이메일 링크를 확인합니다. 검증 이력은 [docs/QA.ko.md](docs/QA.ko.md)에 기록합니다.

## 출처와 권리

기존 사이트: <https://mcas.uos.ac.kr/>. 공개 페이지의 연구실 내용과 사진을 사용자의 홈페이지 이전 요청에 따라 옮겼습니다. 사진과 논문 정보는 원저작자의 권리를 유지하며, 템플릿처럼 타 연구실 사진으로 재배포할 수 있다는 의미가 아닙니다. 이미지별 원본 페이지는 `docs/asset-sources.json`에 기록돼 있습니다. 그 파일의 Google 임시 주소는 기록용이며 사이트 실행에는 사용하지 않습니다.
