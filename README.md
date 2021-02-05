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

PORT=8888
REACT_APP_GOOGLE_API_KEY=<YOUR Google maps API Key>
REACT_APP_API_ADDRESS=175.126.38.231

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
| Redux-saga             |
| Axios                  |
| Styled-components      |
| React-testing-library  |

### 기능

- '다각형보기' 버튼을 누르면 중심좌표(서울창업허브 웹사이트)를 기준으로 다각형이 표시됩니다.

- '주변다각형' 버튼을 누르면 기존다각형 주위로 `multipolygon`이 생성됩니다.

### 러닝 포인트

**리덕스 툴킷과 리덕스 사가**

react 프레임 워크에 redux-saga를 도입한 경험이 있지만, toolkit과의 연관성을 고려해 적용시킨 적은 없었다.

redux-saga는 애플리케이션에서 서버로부터 데이터를 요청하는 fetch같은 비동기 로직이나 브라우저 캐시에 접근하는 것과 같은 순수하지 않은 것들, 즉, 사이드이펙트를 더 효과적으로 관리하려고 만들어졌다. 그래서 redux-saga를 사용하면 테스트에 용이하고, 쉽게 에러핸들링을 할 수 있다는 장점이 있다. 또한 redux 애플리케이션의 모든 상태값에 접근하고 redux 액션들을 디스패치 할 수 있기 때문에 freegeo API에서 반환되는 위도와 경도값을 전역상태로 설정해두면 해당 애플리케이션의 확장성을 고려햇을 떄도 useSelector를 통해 가져와 데이터 값을 이용할 수 있기 때문에 redux-saga를 사용했다.

 비동기 로직이 샐행하기 전, 실행 되었을 떄, 실행에 실패했을떄를 각각 나눌 수 있어서 하나의 기능이더라도 각각의 상태에 맞게 예외처리를 하거나 적절한 뷰를 보여줄 수 있기 때문에 비동기 로직에서 더 효과적이게 사용할 수 있지 않았나 싶다.

툴킷같은 경우도 actions와 reducer를 하나로 합쳐주는 createSlice를 통해 기능별로 폴드 스트럭쳐를 나누는 형식의 ducks pattern을 사용해 디렉토리 구조를 새로 짜보았다. 기존에 redux를 사용했을 ㄸㅐ는 actions, reducers, constatns등 하나의 기능을 구현하기 위해 파일을 모두 분리했어야 했는데 redux toolkit의 slice를 통해 actions와 reducers를 통합해 보다 명시적인 디렉토리 스트럭쳐를 구성해보았다.

**외부 IP 가져오기**

처음 과제를 전달 받았을 때는 hostname이 아니라 왜 IP주소로 데이터 요청을 해야 하는건지 둘의 차이를 잘 몰랐다. 하지만 hostname이라는 것은 결국 IP주소가 DNS를 통해 RESTful한 디자인으로 (모든 웹사이트가 RESTful한건 아니지만) 즉 사용자가 알아보기 슆게 변환된 것이기 때문에 만약 IP주소를 통해 직접적으로 페이지에 접근한다면 DNS를 거치지 않아 hostname으로 요청 했을 때 보다 시간적 성능이 빨라지는 것 같다는 생각을 했따.

**리액트에서 스크립트로 구글 맵 띄우기**

기존 지도 관련 프로젝트나 과제들은 모두 3rd-party-library를 사용했습니다. 이번 과제에서는 외부 라이브러리를 사용하지 않고 스크립트 방식으로 구글 지도를 띄워보았습니다. 스크립트 방식과 3rd-party-library를 사용했을 떄의 장단점은 스크립트 방식은 API의 key값을 .env를 통해 감출 수 있기 때문에 노출 위험이 덜 하다는 장점이 있지만 google API의 다른 라이브러리를 사용 할 때 useEffect 사용량이 늘어나 state의 의존서이 높아진다는 단점이 있습니다 반면 스크립트 방식은 단순해보이지만 3rd-party-library를 이용해 작성한 코드보다 더 복잡해 질 수 있고, 기타 라이브러리에 의존을 해야 한다는 점이 있어 해당 라이브러리의 지원이 잘 되는지 확인해야 하는 단점이 있습니다.

**h3 라이브러리를 처음 사용해본 후기**

1차 프로젝트에서 polyline을통해 출발지 부터 도착지 까지의 루트를 그리긴 했지만 다각형과 같은 모양을 내는데에서 