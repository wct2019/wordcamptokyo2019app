import { AsyncStorage } from 'react-native';

// eslint-disable-next-line
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
// eslint-disable-next-line
async function getData(key) {
  const _data = await AsyncStorage.getItem(key);
  return _data;
}
