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
import Home from './app/screens/Home'
import { globalStyles } from './app/GlobalStyling'
import SortedByHousehold from './app/screens/SortedByHousehold'
import SortedByYear from './app/screens/SortedByYear'

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

        <Route exact path='/' component={Home} />
        <Route exact path='/household' component={SortedByHousehold} />
        <Route exact path='/year' component={SortedByYear} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, window.document.getElementById('root'))
