# Geo Polygon

Uber의 공간 분석 라이브러리 `h3-js`를 이용하여 지도에 다각형을 그리는 웹페이지 입니다.


## 미리 보기

![Main](/readmeAssets/geo-polygon.gif)

## 사전 준비

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

## 기술 스택

| Front-end              |
| :--------------------- |
| ES2015+                |
| React                  |
| React-router-dom       |
| Redux-toolkit          |
| Redux-saga             |

## 주요 기능

- '다각형보기' 버튼을 누르면 중심좌표(서울창업허브 웹사이트)를 기준으로 다각형이 표시됩니다.

- '주변다각형' 버튼을 누르면 기존다각형 주위로 `multipolygon`이 생성됩니다.

## 상세 내용

**리덕스 툴킷과 리덕스 사가**

redux-saga는 애플리케이션에서 서버로부터 데이터를 요청하는 fetch같은 비동기 로직이나 브라우저 캐시에 접근하는 것과 같은 순수하지 않은 것들, 즉, 사이드이펙트를 더 효과적으로 관리하려고 만들어졌습니다. 또한 redux 애플리케이션의 모든 상태값에 접근하고 redux 액션들을 디스패치 할 수 있기 때문에 freegeo API에서 반환되는 위도와 경도값을 전역상태로 설정해두면 useSelector를 통해 데이터 값을 용이하게 가져올 이용할 수 있기 때문에 추후에 애플리케이션의 확장성을 고려했을 때에도 적합하다고 판단되어 redux-saga를 사용했습니다. 또한 데이터 요청에 성공 했을 때, 실패했을 때를 각각 나눌 수 있어서 하나의 기능이더라도 상태에 맞게 예외처리를 하거나 적절한 뷰를 보여줄 수 있게끔 구현했습니다.

또한 redux-toolkit을 사용해 actions와 reducer를 하나로 합쳐주는 createSlice를 통해 기능별로 폴더를 나누는 형식의 ducks pattern을 사용해 디렉토리 구조를 새로 짜보았습니다. 기존에 redux를 사용했을 때에는 actions, reducers, constatns등 하나의 기능을 구현하기 위해 파일을 모두 분리했어야 했는데 redux toolkit의 slice를 통해 actions와 reducers를 통합해 보다 명시적인 폴더 구성을 이루고자 했습니다.

**ping**

메인 좌표값을 얻기 위해 서울창업허브 포탈사이트의 이미지가 호스팅하는 곳의 IP주소를 가져와야 했습니다. 콘솔 엘리먼트 창을 열어 확인해보니 로고 이미지가 가리키는 곳은 메인페이지였기 때문에 메인페이지의 주소를 IP주소로 변환했습니다. url을 IP로 변경하기 위한 여러 방법이 있지만 저는 터미널에서 `ping`을 이용해 IP주소를 얻을 수 있었습니다. `ping`의 기본적인 작동원리는 상태를 확인하려는 컴퓨터를 향해 일정 크기의 패킷을 보낸 후 대상 컴퓨터가 이에 응답하는 메세지를 보내면 이를 수신, 분석하여 상대 컴퓨터가 잘 작동하는지, 도달하는 네트워크 상태가 어떠한지 파악 할 수 있습니다. 터미널에 `$ping www.domain.com` 을 입력하면 상대 IP 주소를와 도달시간을 출력해줍니다.

IP주소로 데이터 요청을 하는게 도메인주소로 요청하는것보다 어떤 장점이 있을지 고민해보았을 때, 도메인이라는 것은 IP주소가 DNS를 통해 RESTful한 디자인으로, 즉 사용자가 알아보기 쉽게 변환된 것이여서 만약 IP주소를 통해 직접적으로 데이터 요청을 한다면 DNS를 거치지 않아 시간이 덜 걸린다는 장점이 있을 것 같습니다.

**리액트에서 스크립트로 구글 맵 띄우기**

기존 지도 관련 프로젝트나 과제들은 모두 3rd-party-library를 사용했습니다. 3rd-party-library를 사용하면 비교적 깔끔한 코드로 지도를 띄울 수 있지만 라이브러리에 의존성이 높고, 파일이 무거워질수 있다는 단점이 있기에 이번 과제에서는 외부 라이브러리를 사용하지 않고 스크립트 방식으로 구글 지도를 띄워보았습니다.
