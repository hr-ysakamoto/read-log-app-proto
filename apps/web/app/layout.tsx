'use client';

import './globals.css';
import { Providers } from './providers';
import { Box } from '@chakra-ui/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Box m={25}>
          <Providers>{children}</Providers>
        </Box>
      </body>
    </html>
  );
}
