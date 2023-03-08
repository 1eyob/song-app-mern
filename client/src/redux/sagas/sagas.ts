import { put, call, takeEvery } from "redux-saga/effects";
import {
  addSongSuccess,
  removeSongSuccess,
  updateSongSuccess,
  fetchSongsStart,
  addSongFailure,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  removeSongFailure,
  removeSongStart,
  updateSongFailure,
  updateSongStart,
  getStatisticsStart,
  getStatisticsSuccess,
  getStatisticsFailure,
} from "../reducers/songReducer";

import {
  GET_SONGS,
  CREATE_SONG,
  UPDATE_SONG_BY_ID,
  DELETE_SONG_BY_ID,
  GET_STATISTICS,
  LOGIN,
} from "../types";
import {
  setLoggedIn,
  setUserData,
  setError,
  clearError,
} from "../reducers/authReducer";
import { GetAll, Create, Update, Delete, login, getCounts } from "../services";

function* viewSongSaga() {
  try {
    yield put(fetchSongsStart());
    const songs = yield call(GetAll);
    yield put(fetchSongsSuccess(songs.data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* addSongSaga(action) {
  try {
    yield put(addSongStart());
    yield Create(action.song);
    yield put(addSongSuccess(action.song));
  } catch (error) {
    yield put(addSongFailure);
  }
}

function* removeSongSaga(action) {
  try {
    console.log("action", action);
    yield put(removeSongStart(action));
    yield Delete(action.id);
    yield put(removeSongSuccess(action.id));
  } catch (error) {
    yield put(removeSongFailure(action));
  }
}

function* updateSongSaga(action) {
  try {
    yield put(updateSongStart(action));
    yield Update(action.song, action.id);
    yield put(updateSongSuccess(action.song));
  } catch (error) {
    yield put(updateSongFailure(action));
  }
}

function* getStatisticsSaga(action) {
  try {
    yield put(getStatisticsStart());
    const counts = yield call(getCounts);
    yield put(getStatisticsSuccess(counts.data));
  } catch (error: any) {
    yield put(getStatisticsFailure(error.message));
  }
}

function* loginSaga(action) {
  try {
    const response = yield call(login, action.payload);
    yield put(setLoggedIn(true));
    yield put(setUserData(response.data));
    yield put(clearError());
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

function* rootSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(GET_SONGS, viewSongSaga);
  yield takeEvery(CREATE_SONG, addSongSaga);
  yield takeEvery(DELETE_SONG_BY_ID, removeSongSaga);
  yield takeEvery(UPDATE_SONG_BY_ID, updateSongSaga);
  yield takeEvery(GET_STATISTICS, getStatisticsSaga);
}

export default rootSaga;
