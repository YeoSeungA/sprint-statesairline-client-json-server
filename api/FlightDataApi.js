import { useEffect } from 'react';
import flightList from '../resource/flightList';
import fetch from 'node-fetch';

if (typeof window !== 'undefined') {
  localStorage.setItem('flight', JSON.stringify(flightList));
}

// filterBy = {} 빈 배열로 설정한 것. 초기값임. JS 문법
// condition이 들어옴
export function getFlight(filterBy = {}) {
  const queryStringArr = [];
//   // HINT: 가장 마지막 테스트를 통과하기 위해, fetch를 이용합니다. 아래 구현은 완전히 삭제되어도 상관없습니다.
//   // TODO: 아래 구현을 REST API 호출로 대체하세요.
//   useEffect(() => {
//     fetch("http://localhost:5000/flight ")
//     .then((res) => res.json())
//     .then((data) => setFlightList(data));
//   },[]);  
  if(filterBy.departure) {
    queryStringArr.push(`departure=${filterBy.departure}`);
  }

  if(filterBy.destination) {
    queryStringArr.push(`destination=${filterBy.destination}`);
  }

  // ['depature=ICN', 'destination='BKK']
  // 주소쓸땐 소문자로 사용한다.
  // HTTP//localhost.3000/flight?

  // join 은 둘을 합쳐줌...?
const queryString = queryStringArr.join("&");
console.log('[Query]' +queryString)

//요청 보내야 될 주소소
const endpoint = `http://localhost:5000/flight${
  // 문자열이 하나라도 있으면 tuthly 한 값. 템플릿 내에서 삼항연산자 사용 가능 
  queryString ? `?${queryString}` : ""
}`;
console.log('[Endpoint]' +endpoint)
// 요청을 보냄.
// 비동기처리 .then 사용
// 객체로 반환해서 보내줌
// http fetch 을 사용. 현재는 get을 요청함함.
return fetch(endpoint)
        .then(res => res.json());
}


  // let json = [];
  // if (typeof window !== 'undefined') {
  //   json = localStorage.getItem('flight');
  // }
  // const flight = JSON.parse(json) || [];

  // return new Promise((resolve) => {
  //   const filtered = flight.filter((flight) => {
  //     let condition = true;
      // if (filterBy.departure) {
      //   condition = condition && flight.departure === filterBy.departure;
      // }
      // if (filterBy.destination) {
      //   condition = condition && flight.destination === filterBy.destination;
      // }
  //     return condition;
  //   });

  //   setTimeout(() => {
  //     resolve(filtered);
  //   }, 500);
  // });

