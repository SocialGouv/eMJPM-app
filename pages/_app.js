//

import * as Sentry from "@sentry/browser";
import App, { Container } from "next/app";
import getConfig from "next/config";
import React from "react";
import piwik, { trackUser } from "../src/piwik";

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN }
} = getConfig();

// all global css
import "bootstrap/dist/css/bootstrap.css";
import "react-tabs/style/react-tabs.css";
import "../static/css/hero.css";
import "../static/css/footer.css";
import "../static/css/custom.css";
import "../static/css/panel.css";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
  componentDidMount() {
    piwikSetup();
    Sentry.init({ dsn: SENTRY_PUBLIC_DSN });
  }

  componentDidCatch(error, errorInfo) {
    // From https://github.com/zeit/next.js/blob/52767345359bb4c8a329fe3e79a9186b75358b22/examples/with-sentry/pages/_app.js#L9
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);

    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }
}

//

function piwikSetup() {
  const isBrowser = typeof document !== undefined;
  if (!isBrowser) {
    return;
  }

  piwik.push(["trackContentImpressionsWithinNode", document.getElementById("__next")]);

  piwik.push(["setCustomUrl", document.location.href]);
  piwik.push(["setDocumentTitle", document.title]);

  trackUser();

  piwik.push(["trackPageView"]);
  piwik.push(["enableLinkTracking"]);
}
