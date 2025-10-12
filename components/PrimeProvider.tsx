"use client";
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';

export default function PrimeProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider >
      {children}
    </PrimeReactProvider>
  );
}
