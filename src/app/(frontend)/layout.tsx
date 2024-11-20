// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dropzone/styles.css';

import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <ClerkProvider>
        <MantineProvider>
            <Notifications />
                {children}
        </MantineProvider>
      </ClerkProvider>
      </body>
    </html>
  );
}
