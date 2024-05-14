import { SimpleUIContextProvider } from './context/context';
import TopMenu from './components/TopMenu/TopMenu';
import Main from './components/Main';

export const eel = window.eel
eel.set_host( 'ws://localhost:8080' )

function App() {
  return (
    <SimpleUIContextProvider>
      <TopMenu />
      <Main />
    </SimpleUIContextProvider>
  );
}

export default App;
