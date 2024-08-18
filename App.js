import Routes from './src/routes/index'
import { UserProvider } from './src/contexts/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}
