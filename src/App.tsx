import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

import GlobalStyle from './styles/global';

import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <GlobalStyle />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Router>
      <Routes />
    </Router>
  </>
);

export default App;
