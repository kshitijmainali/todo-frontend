import './App.css';
import Provider from './Provider';
import AppRoutes from './routes';

function App() {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}

export default App;
