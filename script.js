(() => {
  const scene = document.querySelector("#scene-01");
  if (!scene) return;

  // 기존 화면의 요소를 사용합니다.
  const ageSelector = scene.querySelector(".age-selector");
  const usageTime = scene.querySelector("#usage-time");

  const feedbackValue = scene.querySelector("#feedback-value");
  const feedbackTitle = scene.querySelector("#feedback-title");
  const feedbackDescription = scene.querySelector(
    "#feedback-description"
  );
  const feedbackStatus = scene.querySelector("#feedback-status");

  const resultButton = scene.querySelector("#result-button");
  const buttonText = resultButton?.querySelector("span");

  const resultCard = scene.querySelector("#result-card");
  const resultCardTitle = scene.querySelector("#result-card-title");
  const resultStatLabel = scene.querySelector(
    "#result-card .result-stat-label"
  );
  const resultRate = scene.querySelector("#result-rate");
  const resultBar = scene.querySelector("#result-bar");
  const resultBarFill = scene.querySelector("#result-bar-fill");
  const resultAverage = scene.querySelector("#result-average");

  const requiredElements = [
    ageSelector,
    usageTime,
    feedbackValue,
    feedbackTitle,
    feedbackDescription,
    feedbackStatus,
    resultButton,
    buttonText,
    resultCard,
    resultCardTitle,
    resultStatLabel,
    resultRate,
    resultBar,
    resultBarFill,
    resultAverage,
  ];

  if (requiredElements.some((element) => !element)) {
    console.warn(
      "STATE 04의 결과 카드 HTML과 각 요소의 ID를 확인해주세요."
    );
    return;
  }

  /*
   * 실제 통계 자료
   * 방송통신위원회 「2024 방송매체 이용행태조사」
   *
   * p.51: 스마트폰을 일상생활 필수 매체로 선택한 비율
   *       해당 연령대 전체 응답자 기준
   *
   * p.142: 하루 평균 스마트폰 이용 시간
   *        스마트폰 이용자 기준, 음성통화 제외
   *
   * 평균 시간은 계산 오류를 피하기 위해 '분'으로 저장합니다.
   */
  const ageData = new Map([
    ["10", {
      label: "10대",
      scope: "13~19세 기준",
      averageMinutes: 181,
      essentialRate: 95.0,
    }],

    ["20", {
      label: "20대",
      scope: "",
      averageMinutes: 198,
      essentialRate: 93.0,
    }],

    ["30", {
      label: "30대",
      scope: "",
      averageMinutes: 163,
      essentialRate: 91.1,
    }],

    ["40", {
      label: "40대",
      scope: "",
      averageMinutes: 141,
      essentialRate: 88.0,
    }],

    // 기존 '50대+' 버튼을 유지합니다.
    // 50대·60대·70세 이상의 수치를 임의로 합치지 않습니다.
    ["50-plus", {
      label: "50대+",
      scope: "",
      averageMinutes: null,
      essentialRate: null,
    }],
  ]);

  // 사용자 선택 구간의 비교용 대표값입니다.
  // 실제 측정 시간이 아니라 추정값입니다.
  const timeData = new Map([
    ["under-1", {
      label: "1시간 미만",
      display: "<1H",
      minutes: 30,
    }],
    ["1-2", {
      label: "1~2시간",
      display: "1~2H",
      minutes: 90,
    }],
    ["2-3", {
      label: "2~3시간",
      display: "2~3H",
      minutes: 150,
    }],
    ["3-4", {
      label: "3~4시간",
      display: "3~4H",
      minutes: 210,
    }],
    ["4-5", {
      label: "4~5시간",
      display: "4~5H",
      minutes: 270,
    }],
    ["5-plus", {
      label: "5시간 이상",
      display: "5H+",
      minutes: 330,
    }],
  ]);

  const sourceText =
    "방통위, 2024 방송매체 이용행태조사 p.51·142";

  function formatMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes}분`;
    if (minutes === 0) return `${hours}시간`;

    return `${hours}시간 ${minutes}분`;
  }

  function getSelection() {
    const checkedAge = ageSelector.querySelector(
      'input[name="age"]:checked'
    );

    const timeKey = usageTime.value.toLowerCase();

    return {
      age: ageData.get(checkedAge?.value),
      time: timeData.get(timeKey),
      timeKey,
    };
  }

  // STATE 01~03
  function updateScene() {
    const { age, time } = getSelection();

    resultCard.hidden = true;
    feedbackValue.hidden = false;

    buttonText.textContent = "결과 확인하기";
    resultButton.disabled = !(age && time);

    if (age && time) {
      scene.dataset.state = "time-selected";

      feedbackValue.textContent = time.display;
      feedbackTitle.textContent = "선택이 완료되었습니다.";
      feedbackDescription.textContent =
        "아래 버튼을 눌러 결과를 확인해보세요.";
      feedbackStatus.textContent = "READY TO VIEW RESULTS";

    } else if (age) {
      scene.dataset.state = "age-selected";

      feedbackValue.textContent = age.label;
      feedbackTitle.textContent = "연령대가 선택되었습니다.";
      feedbackDescription.textContent =
        "이제 하루 스마트폰 사용시간을 선택해주세요.";
      feedbackStatus.textContent =
        "AGE SELECTED / WAITING FOR TIME...";

    } else {
      scene.dataset.state = "initial";

      feedbackValue.textContent = "?";
      feedbackTitle.textContent = "당신의 하루는?";
      feedbackDescription.textContent =
        "연령대와 사용시간을 선택하면 관련 통계를 확인할 수 있어요.";
      feedbackStatus.textContent = "WAITING FOR INPUT...";
    }
  }

  // STATE 04
  function showResult() {
    const { age, time, timeKey } = getSelection();

    if (!age || !time) {
      updateScene();
      return;
    }

    resultCardTitle.textContent =
      `${age.label}의 스마트폰 이용 현황`;

    resultStatLabel.textContent =
      "스마트폰을 일상생활 필수 매체로 선택한 비율";

    const hasStatistics =
      Number.isFinite(age.averageMinutes) &&
      Number.isFinite(age.essentialRate);

    if (hasStatistics) {
      const rate = age.essentialRate;
      const difference = time.minutes - age.averageMinutes;

      // 기존 숫자와 막대에 실제 수치를 적용합니다.
      resultRate.textContent = `${rate.toFixed(1)}%`;
      resultBarFill.style.width = `${rate}%`;

      resultBar.setAttribute("role", "meter");
      resultBar.setAttribute(
        "aria-label",
        "스마트폰을 일상생활 필수 매체로 선택한 비율"
      );
      resultBar.setAttribute("aria-valuemin", "0");
      resultBar.setAttribute("aria-valuemax", "100");
      resultBar.setAttribute("aria-valuenow", String(rate));
      resultBar.removeAttribute("aria-hidden");

      resultAverage.textContent =
        `하루 평균 ${formatMinutes(age.averageMinutes)} · 음성통화 제외`;

      let comparison;

      if (difference > 0) {
        comparison =
          `평균보다 약 ${formatMinutes(difference)} 길어요.`;
      } else if (difference < 0) {
        comparison =
          `평균보다 약 ${formatMinutes(Math.abs(difference))} 짧아요.`;
      } else {
        comparison = "평균과 같아요.";
      }

      feedbackTitle.textContent = "나의 하루와 비교해보세요.";

      feedbackDescription.textContent =
        `구간 대표값 ${formatMinutes(time.minutes)} 기준, ` +
        comparison;

      const scopeNote = age.scope ? ` · ${age.scope}` : "";

      const estimateNote =
        timeKey === "5-plus"
          ? "5시간 이상은 5시간 30분으로 추정"
          : "구간 대표값으로 추정 비교";

      feedbackStatus.textContent =
        `${estimateNote}${scopeNote} · ${sourceText}`;

    } else {
      // '50대+' 전체를 대표하는 검증된 통합 수치가 없습니다.
      // 0%로 오해하지 않도록 숫자는 '—'로 표시합니다.
      resultRate.textContent = "—";
      resultBarFill.style.width = "0%";

      resultBar.removeAttribute("role");
      resultBar.removeAttribute("aria-valuenow");
      resultBar.setAttribute("aria-hidden", "true");

      resultAverage.textContent = "50대 이상 통합 통계 없음";

      feedbackTitle.textContent = "선택한 시간을 확인해보세요.";
      feedbackDescription.textContent =
        `선택 시간은 ${time.label}입니다. 통합 평균 비교는 제공하지 않아요.`;

      feedbackStatus.textContent =
        `원문은 50대·60대·70세 이상으로 구분 · ${sourceText}`;
    }

    feedbackValue.hidden = true;
    resultCard.hidden = false;

    scene.dataset.state = "result";
    buttonText.textContent = "다음으로 넘어가기";
    resultButton.disabled = false;
  }

  ageSelector.addEventListener("change", (event) => {
    if (event.target.matches('input[name="age"]')) {
      updateScene();
    }
  });

  usageTime.addEventListener("change", updateScene);

  resultButton.addEventListener("click", () => {
    if (scene.dataset.state === "result") {
      // 다음 SCENE이 완성되면 이동 기능을 연결합니다.
      return;
    }

    showResult();
  });

  updateScene();
  window.addEventListener("pageshow", updateScene);
})();