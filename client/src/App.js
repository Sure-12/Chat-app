import { Outlet } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster /> {/* Correct usage */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
