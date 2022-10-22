import { StatusBar } from 'expo-status-bar';
import { Routes } from "./src/routes"

import { AuthProvider } from './src/hooks/auth';
import { StorageProvider } from './src/contexts/storageContext';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthProvider>
        <StorageProvider>
          <Routes />
        </StorageProvider>
      </AuthProvider>

    </>
  );
}
