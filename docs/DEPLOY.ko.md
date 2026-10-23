# GitHub Pages에 공개하기

## 권장: 원본 프로젝트 + GitHub Actions

이 방식은 나중에 AI가 내용을 고치기 가장 편합니다. `mcas-lab-site-source.zip`을 풀어 사용합니다.

1. GitHub에서 연구실 소유의 새 저장소를 만듭니다. 이름은 예를 들어 `mcas-website`로 할 수 있습니다. 기존 `adc-census` 저장소와 별도로 만드세요. 무료 GitHub Pages를 이용할 경우 공개 저장소를 사용합니다.
2. 이 프로젝트의 **내용물**을 새 저장소 루트에 넣습니다. `package.json`, `src`, `public`, `.github`, `pnpm-lock.yaml` 등이 저장소 첫 화면에 있어야 합니다. `mcas-lab-site` 폴더를 한 겹 더 넣으면 워크플로가 프로젝트를 찾지 못합니다. GitHub Desktop이나 Git을 이용하면 숨김 폴더 `.github`도 함께 올리기 편합니다.
3. 저장소 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택합니다.
4. `main`에 파일을 반영한 다음 **Actions → Build and deploy MCAS Lab**을 확인합니다. 첫 업로드가 Pages 활성화보다 먼저여서 실패했다면 설정 후 **Run workflow** 또는 **Re-run jobs**를 실행합니다.
5. 성공한 배포의 URL을 열어 메뉴·이미지·논문 검색·갤러리를 확인합니다.

이 프로젝트는 파일 경로를 상대 주소로 만들기 때문에 저장소명이 바뀌어도 별도 경로 수정이 필요하지 않습니다. Actions의 Pages 설정 단계에서 실제 주소를 받아 정식 URL 정보에 사용합니다. 별도 API 키나 저장소 토큰을 파일에 넣을 필요가 없습니다.

`node_modules`, `.astro`, `dist`는 저장소에 넣지 않습니다. GitHub가 원본을 받아 빌드합니다. 잠금 파일 `pnpm-lock.yaml`은 반드시 포함합니다.

## 대안: 완성된 정적 파일만 업로드

`mcas-lab-site-static.zip`에는 빌드가 끝난 HTML·CSS·JavaScript·이미지가 있습니다. 서버 프로그램 없이 공개할 수 있습니다.

1. 압축을 풉니다. `index.html`, `images`, `styles.css`, `research` 등의 **내용물**을 저장소 루트에 넣습니다.
2. Settings → Pages의 Source를 **Deploy from a branch**로 지정합니다.
3. 브랜치 `main`, 폴더 `/(root)`를 선택합니다.

이 방식에서는 내용을 바꿀 때 원본 프로젝트를 다시 빌드한 후 파일을 교체해야 합니다. 장기 운영에는 첫 번째 방식이 편합니다. 원본 프로젝트와 정적 결과물을 같은 저장소 루트에 섞어 넣지 마세요.

정적 묶음의 404 페이지는 공개 주소를 모르는 상태로 만들어졌습니다. 임의의 깊은 주소에 대한 맞춤 404 화면까지 정확히 연결하려면 실제 주소를 `SITE_URL`로 지정해 다시 빌드하거나 GitHub Actions 방식을 사용합니다. 정상 메뉴 경로에는 영향이 없습니다.

## 기존 주소 연결

새 GitHub 주소에서 내용과 화면을 확인한 후 진행합니다.

- 학교에서 `mcas.uos.ac.kr`의 DNS 설정을 변경할 권한 또는 담당자 협조가 필요합니다.
- GitHub Pages Custom domain에 해당 주소를 등록하고, 학교 DNS 담당자가 GitHub 안내에 따라 연결합니다.
- 이 준비물에는 `CNAME` 파일을 미리 넣지 않았습니다. 기존 Google Sites의 도메인을 자동으로 전환하지 않습니다.
- 공식 도메인을 조직/사용자 대표 저장소에 설정하면 다른 프로젝트 사이트의 주소에도 영향을 줄 수 있습니다. ADC Census의 주소와 연결 상태를 함께 확인합니다. 홈페이지를 별도 프로젝트 저장소로 유지하는 구성이 이해하기 쉽습니다.

## 향후 운영

AI에게 수정 요청 → 미리보기 확인 → `pnpm build`와 `pnpm validate` → GitHub 변경 반영 → Actions 성공 확인.

잘못 바꿨다면 GitHub의 변경 이력을 이용해 해당 변경을 되돌린 후 다시 배포할 수 있습니다. 이전의 이미지를 덮어쓰기보다 새 파일명으로 추가하면 변경 비교가 쉽습니다.

## 공식 참고

- [GitHub Pages 소개](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Astro의 GitHub Pages 배포](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages 도메인 연결](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
