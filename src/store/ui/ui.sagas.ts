import { changeScreen, resetZoom, setFlattenedBy, setZoom } from './ui.actions'
import { put, select, takeEvery } from '@redux-saga/core/effects'
import { getMaxValue } from '../data/data.selectors'

function * resetZoomSaga () {
  const maxValue = yield select(getMaxValue)
  yield put(setZoom([0, maxValue]))
}

export function * watchUiSagas () {
  yield takeEvery(changeScreen, resetZoomSaga)
  yield takeEvery(setFlattenedBy, resetZoomSaga)
}
