# 모윤희 포트폴리오

웹 퍼블리셔·프론트엔드 포트폴리오 (정적 페이지, SCSS 사용)

화면은 히어로(점 격자 배경)와 두 개의 탭으로 구성

- **화면 구현 사례 탭**: 실제 서비스 화면처럼 구성한 샘플 (Swiper 배너·도서 슬라이더, 반응형 카드 그리드, 공지·FAQ, 1:1 문의 스텝 폼, 적용 기준). 도서관 서비스는 가상의 예시입니다.
- **프로젝트와 이력 탭**: 프로젝트, 기술, 이력, 학력

## 폴더 구조

```
portfolio/
├─ index.html
├─ package.json            # SCSS 빌드 명령
├─ .nojekyll
└─ site/
   ├─ scss/                # 수정은 여기서
   │  ├─ main.scss         # 진입 파일
   │  ├─ abstracts/        # _variables(색상·중단점), _mixins(respond, theme, hover, visually-hidden)
   │  ├─ base/             # _root(토큰·리셋), _animations, _utilities(container, sr-only, skip-link)
   │  ├─ components/       # _button _nav _tabs _chip _tag _accordion _list _spec
   │  │                    # _form _check _stepper _modal _toast _carousel _faq _card _top-btn
   │  └─ sections/         # _hero _section _project _inquiry
   ├─ vendor/swiper/       # Swiper (MIT), 슬라이더 라이브러리
   ├─ css/main.css         # SCSS 컴파일 결과 (GitHub 에 함께 올림)
   ├─ js/
   │  ├─ utils.js          # 공통 도구 ($, $$, createTabs)
   │  ├─ data.js           # 프로젝트·이력 데이터
   │  ├─ tabs.js           # 메인 탭, 섹션 이동(goTo)
   │  ├─ projects.js       # 프로젝트 목록, 아코디언, 필터, 이력 링크
   │  ├─ carousel.js       # Swiper 설정 (배너, 도서 슬라이더)
   │  ├─ components.js     # FAQ, 1:1 문의 폼(스텝), 약관 모달, 토스트, 현재 화면 표시
   │  ├─ hero-canvas.js    # 히어로 점 격자 배경
   │  ├─ theme.js          # 라이트/다크 전환
   │  └─ main.js           # 진입점
   └─ img/
      ├─ icons/            # 바로가기 SVG 아이콘 (order, coupon, event, inquiry)
      └─ projects/        # 프로젝트 이미지 (default.svg = 기본 이미지)
```

스크립트는 `index.html` 에 적힌 순서대로 불러와요 (`utils.js` 가 가장 먼저).

## 클래스 규칙 (BEM)

- 블록: `.nav` `.tabs` `.btn` `.chip` `.tag` `.accordion` `.stepper` `.modal` `.banner` `.project` `.hero`
- 요소: `.tabs__tab` `.accordion__trigger` `.banner__title`
- 변형: `.btn--primary` `.btn--sm` `.btn--icon` `.btn--outline`
- 상태: `.is-open` `.is-active` `.is-visible` `.is-fading` `.is-loading` `.is-error`

## 자주 하는 수정

| 하고 싶은 일 | 수정 위치 |
| 색상 변경 | `site/scss/abstracts/_variables.scss` 의 `$themes` |
| 중단점 변경 | `site/scss/abstracts/_variables.scss` 의 `$breakpoints` |
| 프로젝트·이력 수정 | `site/js/data.js` |
| 프로젝트 이미지 추가 | 이미지를 `site/img/projects/` 에 넣고 `image: { src, alt, mobileSrc }` 입력, 없으면 `image: null` |
| 사이트 링크 추가 | `data.js` 의 `link` |
| 컴포넌트 시연 추가 | `index.html` 의 `.showcase` 에 `.banner` 추가, 동작은 `components.js` |
| 기술·학력 수정 | `index.html` |

## 업데이트할 때 주의

- `index.html` 과 `site/` 폴더를 **항상 함께** 교체하세요. 일부만 바꾸면 이전 버전 파일이 섞여 화면이 달라집니다.
- 이전 버전의 `site/assets/` 폴더가 남아 있다면 삭제하세요.
- 배포 후 화면이 그대로면 강력 새로고침(Ctrl+Shift+R)하세요. 파일을 고칠 때는 `index.html` 의 `?v=15` 숫자를 올리면 캐시가 갱신됩니다.
- 기본 화면은 항상 라이트 모드이고, 상단 버튼으로만 다크 모드가 켜집니다.

## SCSS 빌드

CSS 는 이미 컴파일되어 있어서, SCSS 를 수정했을 때만 빌드하면 됩니다.

```bash
npm install        # 최초 1회
npm run build      # site/css/main.css 생성
npm run watch      # 수정할 때마다 자동 빌드
```

## GitHub Pages 배포

1. 저장소 루트에 `index.html` 이 오도록 **폴더 안의 파일**을 올립니다 (폴더 자체를 올리면 안 됨)
2. **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**
