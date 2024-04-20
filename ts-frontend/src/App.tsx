import { SimpleUIContextProvider } from './context/context';
import TopMenu from './components/TopMenu/TopMenu';
import Main from './components/Main';

function App() {
  return (
    <SimpleUIContextProvider>
      <TopMenu />
      <Main />
    </SimpleUIContextProvider>
  );
}

export default App;
