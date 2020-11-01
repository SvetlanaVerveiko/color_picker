
import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

const routes = [
  {
    path: '/',
    Component: lazy(() => import('./App')),
    exact: true,
  },
]

const Router = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
        <Route
          render={state => {
            const { location } = state
            return (
                  <Switch location={location}>
                    {routes.map(({ path, Component, exact, props }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div>
                              <Suspense fallback={null}>
                                <Component {...props} />
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                  </Switch>
            )
          }}
        />
    </ConnectedRouter>
  )
}

export default Router
