import { all } from 'redux-saga/effects'
import { watchUiSagas } from './ui/ui.sagas'

export default function * rootSaga () {
  yield all([
    watchUiSagas(),
  ])
}
