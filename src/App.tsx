import router from './router';
import { RouterProvider } from 'react-router-dom';
import { QueryContextProvider } from './context/query';

function App() {
  return (
    <QueryContextProvider>
      <RouterProvider router={router} />
    </QueryContextProvider>
  );
}

export default App;
