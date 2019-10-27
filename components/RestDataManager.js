import { AsyncStorage } from 'react-native';
import RestUrls from '../constants/RestUrls';

export default function RestDataManager() {
  const returnData = loadRestAPI();
  // // console.log('return', returnData);
  return returnData;
}

function get(url) {
  // eslint-disable-next-line
  return fetch(url);
}

async function loadRestAPI() {
  // console.log('AsyncStorage get data');
  // removeData('sessionsData');
  // removeData('speakersList');
  // removeData('roomList');
  let returnREST = [];
  try {
    // console.log('AsyncStorage get sessionsData');
    const sessionsData = await AsyncStorage.getItem('sessionsData');
    // console.log('AsyncStorage get speakersList');
    const speakersList = await AsyncStorage.getItem('speakersList');
    // console.log('AsyncStorage get roomList');
    const roomList = await AsyncStorage.getItem('roomList');
    // eslint-disable-next-line
    if ((sessionsData !== null) && (speakersList !== null) && (roomList !== null)) {
      // console.log('return from AsyncStorage');
      returnREST[0] = JSON.parse(roomList);
      returnREST[1] = JSON.parse(speakersList);
      returnREST[2] = JSON.parse(sessionsData);
      // return [JSON.parse(sessionsData), JSON.parse(roomList), JSON.parse(speakersList)];
    } else {
      // console.log('return from REST API');
      const results = [];
      results.push(get(RestUrls.tracks).then(response => response.json()));
      results.push(get(RestUrls.speakers).then(response => response.json()));
      results.push(get(RestUrls.sessions).then(response => response.json()));
      returnREST = await Promise.all(results);
    }
  } catch (e) {
    // console.log('Sync data error', e);
  // error reading value
  }
  // const urls = [RestUrls.tracks, RestUrls.sessions, RestUrls.speakers];
  // eslint-disable-next-line
  // // console.log(returnREST);
  const rooms = MakeRoomData(returnREST[0]);
  const speakers = MakeSpeakerData(returnREST[1]);
  const sessions = MakeSessionData(returnREST[2], rooms, speakers);
  // // console.log(sessions);
  return [sessions, rooms, speakers];
}

async function storeData(key, value) {
  // console.log('start Async roomList save 1');
  try {
    await AsyncStorage.setItem(key, value);
    // eslint-disable-next-line
    // console.log('Async ' + key + ' saved');
  } catch (e) {
    // saving error
    // eslint-disable-next-line
    // console.log('Async ' + key + ' error', e);
  }
}
// eslint-disable-next-line
async function removeData(key) {
  // eslint-disable-next-line
  // console.log('start Async roomList save 1');
  try {
    await AsyncStorage.removeItem(key);
    // eslint-disable-next-line
    // console.log('Async ' + key + ' removed');
  } catch (e) {
    // saving error
    // eslint-disable-next-line
    // console.log('Async ' + key + ' remove error', e);
  }
}
function MakeRoomData(data) {
  const roomList = [];
  if (data !== undefined) {
    data.forEach((item) => {
      roomList[item.id] = item.name;
    });
  }
  // // console.log(roomList);
  // console.log('start Async roomList save 0');
  storeData('roomList', JSON.stringify(data));
  return roomList;
}


function MakeSpeakerData(data) {
  const speakersList = [];
  if (data !== undefined) {
    data.forEach((item) => {
      // console.log('speaker item');
      // console.log(item.id);
      // console.log(item);
      speakersList[item.id] = item;
    });
  }
  // // console.log(speakersList);
  storeData('speakersList', JSON.stringify(data));
  return speakersList;
}

function MakeSessionData(sessions, rooms, speakers) {
  const sessionsData = [];
  let sessionSpeakers = [];
  if (sessions !== undefined) {
    sessions.forEach((item) => {
      sessionSpeakers = [];
      if (item._links.speakers !== undefined) {
        item._links.speakers.forEach((speakerurl) => {
          // console.log('speakerurl.href');
          // console.log(speakerurl.href);
          // console.log('speakerurl.items');
          // console.log(item);
          let speakerid = '';
          if (speakerurl.href !== undefined) {
            // eslint-disable-next-line
            speakerid = speakerurl.href.toString().match(/[^/]+$/i)[0];
          }
          sessionSpeakers.push({ speakername: speakers[speakerid].title, speakerid });
        });
      }
      let titleText = '';
      if (item.title.rendered !== undefined) {
        titleText = item.title.rendered.toString().trim();
      }
      // console.log(titleText);
      if ((titleText.indexOf('休憩') < 0)
       && (titleText.indexOf('一般開場・受付') < 0)
       && (titleText.indexOf('閉場') < 0)
       && (titleText.indexOf('スポンサー') < 0)) {
        // console.log('unmatch');
        sessionsData[item.id] = {
          ...item,
          room_name: rooms[item.session_track],
          speaker_name: sessionSpeakers,
        };
      } else {
        // console.log('match');
      }
    });
    sessionsData.sort(compareTime);
  }
  storeData('sessionsData', JSON.stringify(sessions));
  // // console.log(sessionsData);
  return sessionsData;
}

function compareTime(a, b) {
  let r = 0;
  if (a.session_date_time.time < b.session_date_time.time) {
    r = -1;
  } else if (a.session_date_time.time > b.session_date_time.time) {
    r = 1;
  }

  return r;
}
