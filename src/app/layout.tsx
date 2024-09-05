// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import {ColorSchemeScript, createTheme, MantineProvider, rem} from '@mantine/core';

// const theme = createTheme({
//     headings: {
//         sizes: {
//          h1:{
//              fontSize: rem(60)     // Custom size for h1
//          }
//         }
//     }
// });

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
      <MantineProvider>
          {children}
      </MantineProvider>
      </body>
      </html>
  );
}