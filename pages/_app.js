/**
 * Created by Deegha on 19/03/2019
 */

import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/redux-store'
import { Provider } from 'react-redux'
import Router from 'next/router'
import { trackPageView } from '../services/helper'

import styles from '../sharedStyles/styles.scss'


class MyApp extends App {

  // componentDidMount() {
  //   Router.onRouteChangeComplete = url => {
  //     trackPageView(url)
  //   }
  // }

  render () {
    const {Component, pageProps, reduxStore} = this.props
    return (
      <Container >
        <Provider store={reduxStore}>
        <div className={styles.body}>
          <Component {...pageProps} />
        </div>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)    