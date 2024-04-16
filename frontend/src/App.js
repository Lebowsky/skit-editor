import TopMenu from './components/TopMenu/TopMenu.jsx'
import Main from './components/Main/Main.jsx'
import { SimpleUIContextProvider } from './context/context.jsx';

export default function App() {
  return (
    <SimpleUIContextProvider>
      <TopMenu />
      <Main />
    </SimpleUIContextProvider>
  );
}
