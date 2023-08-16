import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from '@src/theme';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CoreLogic Code Test</title>
        <meta
          name="description"
          content="CoreLogic code test created by Jamie Brearley"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
