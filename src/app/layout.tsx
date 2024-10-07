// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dropzone/styles.css';

import { Notifications } from '@mantine/notifications';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import Head from 'next/head';


// const theme = createTheme({
//     headings: {
//         sizes: {
//          h1:{
//              fontSize: rem(60)     // Custom size for h1
//          }
//         }
//     }
// });


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <ColorSchemeScript />
      </Head>
      <body>
        <MantineProvider>
            <Notifications />
            {children}
        </MantineProvider>
      </body>
    </html>
  );
}
