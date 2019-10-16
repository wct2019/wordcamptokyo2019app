import { AsyncStorage } from 'react-native';
import RestUrls from '../constants/RestUrls';

export default function RestDataManager() {
  const returnData = loadRestAPI();
  // console.log('return', returnData);
  return returnData;
}

function get(url) {
  // eslint-disable-next-line
  return fetch(url);
}

async function loadRestAPI() {
  console.log('AsyncStorage get data');
  // removeData('sessionsData');
  // removeData('speakersList');
  // removeData('roomList');
  let returnREST = [];
  try {
    console.log('AsyncStorage get sessionsData');
    const sessionsData = await AsyncStorage.getItem('sessionsData');
    console.log('AsyncStorage get speakersList');
    const speakersList = await AsyncStorage.getItem('speakersList');
    console.log('AsyncStorage get roomList');
    const roomList = await AsyncStorage.getItem('roomList');
    if ((sessionsData !== null) && (speakersList !== null) && (roomList !== null)) {
      console.log('return from AsyncStorage');
      returnREST[0] = JSON.parse(roomList);
      returnREST[1] = JSON.parse(speakersList);
      returnREST[2] = JSON.parse(sessionsData);
      // return [JSON.parse(sessionsData), JSON.parse(roomList), JSON.parse(speakersList)];
    } else {
      const results = [];
      results.push(get(RestUrls.tracks).then(response => response.json()));
      results.push(get(RestUrls.speakers).then(response => response.json()));
      results.push(get(RestUrls.sessions).then(response => response.json()));
      returnREST = await Promise.all(results);
    }
  } catch (e) {
    console.log('Sync data error', e);
  // error reading value
  }
  // const urls = [RestUrls.tracks, RestUrls.sessions, RestUrls.speakers];
  // eslint-disable-next-line
  // console.log(returnREST);
  const rooms = MakeRoomData(returnREST[0]);
  const speakers = MakeSpeakerData(returnREST[1]);
  const sessions = MakeSessionData(returnREST[2], rooms, speakers);
  // console.log(sessions);
  return [sessions, rooms, speakers];
}

async function storeData(key, value) {
  console.log('start Async roomList save 1');
  try {
    await AsyncStorage.setItem(key, value);
    // eslint-disable-next-line
    console.log('Async ' + key + ' saved');
  } catch (e) {
    // saving error
    // eslint-disable-next-line
    console.log('Async ' + key + ' error', e);
  }
}
// eslint-disable-next-line
async function removeData(key) {
  // eslint-disable-next-line
  console.log('start Async roomList save 1');
  try {
    await AsyncStorage.removeItem(key);
    // eslint-disable-next-line
    console.log('Async ' + key + ' removed');
  } catch (e) {
    // saving error
    // eslint-disable-next-line
    console.log('Async ' + key + ' remove error', e);
  }
}
function MakeRoomData(data) {
  const roomList = [];
  data.forEach((item) => {
    roomList[item.id] = item.name;
  });
  // console.log(roomList);
  console.log('start Async roomList save 0');
  storeData('roomList', JSON.stringify(data));
  return roomList;
}


function MakeSpeakerData(data) {
  const speakersList = [];
  data.forEach((item) => {
    speakersList[item.id] = item;
  });
  // console.log(speakersList);
  storeData('speakersList', JSON.stringify(data));
  return speakersList;
}

function MakeSessionData(sessions, rooms, speakers) {
  const sessionsData = [];
  let sessionSpeakers = [];
  sessions.forEach((item) => {
    if (item._links.speakers !== undefined) {
      sessionSpeakers = [];
      item._links.speakers.forEach((speakerurl) => {
        // console.log(speakerurl.href);
        const speakerid = speakerurl.href.toString().match(/[^/]+$/i)[0];
        sessionSpeakers.push(speakers[speakerid].title);
      });
    }
    sessionsData[item.id] = {
      ...item,
      room_name: rooms[item.session_track],
      speaker_name: sessionSpeakers,
    };
  });
  storeData('sessionsData', JSON.stringify(sessions));
  // console.log(sessionsData);
  return sessionsData;
}
