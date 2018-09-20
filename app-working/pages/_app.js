import App, { Container } from 'next/app';
import Page from '../components/Page';
import NoteProvider from '../components/NoteProvider';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <NoteProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </NoteProvider>
      </Container>
    );
  }
}

export default MyApp;
