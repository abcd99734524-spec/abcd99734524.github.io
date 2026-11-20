# SCENE 01 초기 화면 실행 안내

## 가장 빠른 방법
1. ZIP 파일을 다운로드하고 압축을 풉니다.
2. VS Code에서 파일 → 폴더 열기를 누르고 scene-01 폴더를 선택합니다.
3. 왼쪽에서 index.html을 클릭하면 HTML, css 폴더의 style.css를 클릭하면 CSS를 수정할 수 있습니다. 코드는 이미 파일에 들어 있으므로 다시 붙여넣을 필요가 없습니다.
4. Finder에서 index.html을 더블클릭하면 브라우저에서 열립니다. 별도 설치나 명령어가 필요 없습니다.
5. VS Code에서 수정한 뒤 Cmd+S로 저장하고 브라우저에서 Cmd+R로 새로고침합니다.

## 직접 파일을 만들 경우
1. 원하는 위치에 scene-01 폴더를 만듭니다.
2. 그 안에 index.html 파일과 css 폴더를 만듭니다.
3. css 폴더 안에 style.css 파일을 만듭니다.
4. 제공된 index.html 내용은 index.html에, style.css 내용은 css/style.css에 전체 복사합니다.
HTML의 <link rel="stylesheet" href="css/style.css">가 두 파일을 연결합니다. 폴더와 파일 이름을 그대로 유지하세요.

## 파일 역할
- index.html: 제목, 문구, 연령대 입력, 시간 선택창, 결과 패널의 구조
- css/style.css: 배치, 크기, 색상, 여백, 작은 화면 대응
- README.md: 이 안내

## 현재 구현 범위
- HTML과 CSS만 사용합니다. JavaScript 파일과 외부 이미지가 필요 없습니다.
- 연령대는 라디오 입력으로 하나만 선택되며 선택한 항목은 연두색으로 표시됩니다.
- 시간 선택창은 기본 HTML 선택창입니다. 시간 구간은 임시이며 나중에 변경할 수 있습니다.
- 결과 버튼은 disabled 상태입니다. 연령대와 시간을 선택해도 결과가 계산되거나 오른쪽 패널이 바뀌지 않습니다.
- 우측 상단 두 줄 표시는 디자인 장식이며 메뉴 기능은 아직 없습니다.
- 하단 막대는 SCENE 01 / 05 기준 20% 표시입니다.
- 기준 디자인은 1920×1080입니다. 작은 데스크톱에서는 비율을 줄이고 900px 이하에서는 세로로 배치합니다.
- 폰트 파일이 제공되지 않아 시스템 대체 글꼴을 사용합니다. 원본 폰트에 따라 글자 폭과 굵기에 차이가 있습니다.

## 나중에 JavaScript로 연결할 요소
- 전체 화면: #scene-01 (data-state="initial")
- 입력 폼: #usage-form
- 연령대: input[name="age"] (각 입력에 value와 data-age 지정)
- 시간: #usage-time
- 결과 버튼: #result-button
- 오른쪽 패널: #feedback-panel
- 변경 수치: #feedback-value
- 변경 제목: #feedback-title
- 변경 설명: #feedback-description
- 변경 상태 문구: #feedback-status

## 다음 요청 예시
이 HTML·CSS에 JavaScript를 추가해줘. 연령대와 사용 시간을 모두 선택하면 결과 버튼을 활성화하고, STATE 02~04에 맞춰 오른쪽 패널을 변경해줘. 기존 배치와 디자인은 유지해줘. 실제 통계가 없으니 결과 데이터는 가상 데이터라고 명시해줘.

## 확인 상태
HTML 구조, CSS 경로와 입력 요소 구성을 확인했습니다. 제작 환경의 브라우저 실행 제한으로 화면 렌더링과 실제 클릭 검증은 완료하지 못했습니다.
