/*
 * 12주차 인터랙티브반 공통 실습 시작 파일
 *
 * 연도 선택에 따라 학습용 가상 데이터의 수치·설명·그래프를 갱신한다.
 */

// 기존에 정상 작동하는 화면 진입 효과. 기능 추가 시 유지한다.
document.documentElement.classList.add('has-js');
const revealSections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

const yearData = {
  a: {
    label: 'YEAR A',
    name: '연도 A',
    rate: '4.2',
    title: '연도 A의 실업률 변화',
    description: '연도 A를 선택한 화면입니다. 학습용 가상 데이터의 실업률 추이를 확인할 수 있습니다.',
    image: 'images/year-a.svg',
    imageAlt: '가상 데이터 연도 A 실업률 추이 그래프'
  },
  b: {
    label: 'YEAR B',
    name: '연도 B',
    rate: '3.6',
    title: '연도 B의 실업률 변화',
    description: '연도 B를 선택한 화면입니다. 학습용 가상 데이터의 실업률 추이를 확인할 수 있습니다.',
    image: 'images/year-b.svg',
    imageAlt: '가상 데이터 연도 B 실업률 추이 그래프'
  }
};

const yearButtons = {
  a: document.querySelector('.year-button-a'),
  b: document.querySelector('.year-button-b')
};
const yearRate = document.querySelector('.year-rate');
const yearLabel = document.querySelector('.year-label');
const metricTitle = document.querySelector('.metric-title');
const yearDescription = document.querySelector('.year-description');
const yearChart = document.querySelector('.year-chart');
const chartYearLabel = document.querySelector('.chart-year-label');
const chartStatus = document.querySelector('.chart-status');
const practiceMessage = document.querySelector('.practice-message');

function animateYearChange() {
  [yearRate, yearChart].forEach((element) => {
    element.classList.remove('is-changing');
    void element.offsetWidth;
    element.classList.add('is-changing');
    element.addEventListener('animationend', () => {
      element.classList.remove('is-changing');
    }, { once: true });
  });
}

function selectYear(year) {
  const data = yearData[year];
  yearRate.innerHTML = `${data.rate}<span>%</span>`;
  yearLabel.textContent = data.label;
  metricTitle.textContent = data.title;
  yearDescription.textContent = data.description;
  yearChart.src = data.image;
  yearChart.alt = data.imageAlt;
  animateYearChange();
  chartYearLabel.textContent = data.name;
  chartStatus.textContent = `${data.name}의 가상 실업률 데이터가 표시 중입니다.`;
  practiceMessage.textContent = chartStatus.textContent;

  Object.entries(yearButtons).forEach(([buttonYear, button]) => {
    const isSelected = buttonYear === year;
    button.classList.toggle('active', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });
}

Object.entries(yearButtons).forEach(([year, button]) => {
  button.addEventListener('click', () => selectYear(year));
});

selectYear('a');
