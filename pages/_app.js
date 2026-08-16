import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- Google Font Cairo -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-p1CmO1m6lZbK2Yt3e1Y1q0V2k3wKq3q8zGz3i5Yv4v6Y1e9K7Q3Y1G7Y1e9K7Q3Y1G7Y1e9K7Q==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
