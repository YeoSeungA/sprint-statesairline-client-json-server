import Head from 'next/head';
import { use, useEffect, useState } from 'react';
import { getFlight } from '../api/FlightDataApi';
import FlightList from './component/FlightList';
import LoadingIndicator from './component/LoadingIndicator';
import Search from './component/Search';
import Debug from './component/Debug';
// 후반 테스트를 진행할 때 아래 import를 삭제합니다.
import json from '../resource/flightList';


// Main 이 하나의 컴포넌트
// 파라미터가 없음 ==> 내려받는 props가 없다!
export default function Main() {
  // 항공편 검색 조건을 담고 있는 상태g
  const [condition, setCondition] = useState({
    departure: '', destination:''
  });

  // json이 아닌 []로 초기값을 받음/
  const [flightList, setFlightList] = useState([]);
  const [isLoading, setisLoding] = useState(false);

  // 주어진 검색 키워드에 따라 condition 상태를 변경시켜주는 함수
  // search 는 두가지 정보를 받는 함수수
  const search = ({departure,destination}) => {
    if (
      condition.departure !== departure ||
      condition.destination !== destination
    ) {
      console.log('condition 상태를 변경시킵니다');
      
    //   // TODO: search 함수가 전달 받아온 '항공편 검색 조건' 인자를 condition 상태에 적절하게 담아보세요.
      setCondition({departure,destination});

    }
    // if (condition.departure !== departure) {
    //   console.log('출발지를 변경시킵니다.');
    //   setCondition({departure});
    // }
  };

  const filterByCondition = (flight) => {
    let pass = true;
    if (condition.departure) {
      pass = pass && flight.departure === condition.departure;
    }
    if (condition.destination) {
      pass = pass && flight.destination === condition.destination;
    }
    return pass;
  };

  global.search = search;
  // global.search = search; // 실행에는 전혀 지장이 없지만, 테스트를 위해 필요한 코드입니다. 이 코드는 지우지 마세요!

  // TODO: Effeck Hook을 이용해 AJAX 요청을 보내보세요.
  // TODO: 더불어, 네트워크 요청이 진행됨을 보여주는 로딩 컴포넌트(<LoadingIndicator/>)를 제공해보세요.
  // useEffect(() => {
  //   const result = getFlight();
  //   setFlightList(result);
  // }, [flightList])
  // useEffect를 이용해 특정 조건일 때만 API 요청할 수 있다.
  // useEffect(()=> {
  //   setisLoding(true);
  //   getFlight(condition)
  //   .then((filtered) => {
  //     setFlightList(filtered)
  //   .finally (()=>setisLoding(false))
  //   });
  //   // 검색조건이 달라질때마다 http 요청을 할거임.
  // }, [condition]);

  useEffect(()=> {
    setisLoding(true);
    // fetch이기에 비동기 오래걸림.
    getFlight(condition)
    .then((res) => {
      setFlightList(res);
      setisLoding(false);
    });
  }, [condition]);
    // 검색조건이 달라질때마다 http 요청을 할거임.
 

  // TODO: 테스트 케이스의 지시에 따라 search 함수를 Search 컴포넌트로 내려주세요.
  // <Search onSearch={search}/>
  return (
    <div>
      <Head>
        <title>States Airline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>여행가고 싶을 땐, States Airline</h1>
        <Search onSearch={search}/>
        <div className="table">
          <div className="row-header">
            <div className="col">출발</div>
            <div className="col">도착</div>
            <div className="col">출발 시각</div>
            <div className="col">도착 시각</div>
            <div className="col"></div>
          </div>
          {/* <FlightList list={flightList.filter(filterByCondition)} /> */}
          {isLoading ? <LoadingIndicator/> : <FlightList list={flightList}/>}
        </div>

        <div className="debug-area">
          <Debug condition={condition} />
        </div>
        <img id="logo" alt="logo" src="codestates-logo.png" />
      </main>
    </div>
  );
}
