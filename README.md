# Geo Polygon

Uber의 공간 분석 라이브러리 `h3-js`를 이용하여 지도에 다각형을 그리는 웹페이지 입니다.

### 사전 준비

1. Local 환경에서 실행하기 위한 사전 준비가 필요합니다.

  - [Google Maps API Key](https://cloud.google.com/maps-platform/?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_460848633529-ADGP_Hybrid%20%7C%20AW%20SEM%20%7C%20BKWS%20~%20Google%20Maps%20API%20Key-KWID_43700035216023629-aud-581578347266%3Akwd-298247230705-userloc_1030760&utm_term=KW_google%20maps%20api%20key-ST_google%20maps%20api%20key&gclid=Cj0KCQiA0fr_BRDaARIsAABw4Et9xmLM_rakYTnqBv9JqmyA-Ws2uNNtmuXAquyx3lQ804b8sIW7DYwaAs65EALw_wcB)

2. 프로젝트를 클론 받습니다.

```

git clone https://github.com/midohree/geo-polygon.git
cd geo-polygon
npm install

```

3. Root 디렉토리에 `.env` 파일을 생성하고, 사전에 준비한 Google Maps API Key로 환경 변수를 설정합니다.

```

REACT_APP_GOOGLE_API_KEY=<YOUR Google maps API Key>

```

4. 애플리케이션을 실행합니다.

```

npm start

```

### 기술 스택

| Front-end              |
| :--------------------- |
| ES2015+                |
| React                  |
| React-router-dom       |
| Redux-toolkit          |
| Axios                  |
| Styled-components      |
| React-testing-library  |
