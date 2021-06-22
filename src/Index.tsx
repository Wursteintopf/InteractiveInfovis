import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from '~store/root.reducer'
import { applyMiddleware, createStore } from 'redux'
import rootSaga from './store/root.sagas'
import Home from '~app/screens/Home'

const App = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  )
  sagaMiddleware.run(rootSaga)

  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Home} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, window.document.getElementById('root'))
