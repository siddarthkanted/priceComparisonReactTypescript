import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from "react-redux";
import { Route, Router } from "react-router";
import { applyMiddleware, combineReducers, compose, createStore, GenericStoreEnhancer, Reducer, Store } from "redux";
import { enableBatching } from "redux-batched-actions";
import { GroceryReducer } from 'src/components/Product/Reducer';
import { HistorySingleton } from 'src/History';
import { IRootReducer } from 'src/model/Model';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore(buildRootReducer())

ReactDOM.render(
  <ReactRedux.Provider store={store}>
  <Router history={HistorySingleton.getHistory()}>
    <Route path="/" component={App} />
  </Router></ReactRedux.Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

export function buildRootReducer(): Reducer<IRootReducer> {
  const rootReducer: IRootReducer = {
    groceryReducer: new GroceryReducer().handleAction.bind(GroceryReducer)
  };
  return combineReducers<IRootReducer>(rootReducer as {});
}

export function configureStore(rootReducer: Reducer<IRootReducer>): Store<IRootReducer> {
  const reducer = enableBatching(rootReducer);
  const middleware = applyMiddleware();

  if ((window as IWindowType).__REDUX_DEVTOOLS_EXTENSION__) {
    // If we have redux dev tools, create with it
    return createStore<IRootReducer>(reducer, compose(
      middleware,
      (window as IWindowType).__REDUX_DEVTOOLS_EXTENSION__({
        predicate: () => {
          // Only use redux dev tools in dev
          // return AppContext.isDevEnvironment();
        },
        trace: true,
      })
    ) as GenericStoreEnhancer);
  }
  return createStore(reducer, middleware);
}

interface IWindowType extends Window {
  // tslint:disable-next-line:ban-types
  __REDUX_DEVTOOLS_EXTENSION__: Function;
}

