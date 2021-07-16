import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import rootSaga from './store/root.sagas'
import { Global } from '@emotion/react'
import { rootReducer } from './store/root.reducer'
import { globalStyles } from './app/GlobalStyling'
import Data from './app/Data/Data'
import Remote from './app/Remote/Remote'

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
        <Global styles={globalStyles} />

        <Route exact path='/' component={Data} />
        <Route exact path='/remote' component={Remote} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, window.document.getElementById('root'))
