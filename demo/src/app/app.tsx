import '@/styles/main.css'
import '@/styles/default.scss'
//
import { Route, Routes } from "react-router-dom";

//routes
import { routes } from '@/shared/constants/routes/routes';


const App = ({  }) => { 
  const renderRoutes = () => {

    return routes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component type="common"/>} />
    ))
  }

  return (
    <Routes>
      {renderRoutes()}
    </Routes>
  );
}

export default App;
