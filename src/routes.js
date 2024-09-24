import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Tasks from './pages/tasks';
import Play from './pages/play';
import MyBand from './pages/myBand';
import Login from './pages/login';

import Navigation from './pages/components/navigation';

const useRoutes = isAuthenticated => {
  const AuthenticatedRoutes = (
    <Router>
      {/* <Suspense fallback={<Loading/>}> */}
        <Routes>
          <Route path="/tasks" element={<><Tasks /><Navigation /></>} />
          <Route path="/*" element={<><Play /><Navigation /></>} />
          <Route path="/band" element={<><MyBand /><Navigation /></>} />
        </Routes>
      {/* </Suspense> */}
    </Router>
  );

  const UnauthenticatedRoutes = (
    // <Suspense fallback={<Loading/>}>
      <Router>
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      </Router>
    // </Suspense>
  );

  return isAuthenticated ? AuthenticatedRoutes : UnauthenticatedRoutes;
};

export default useRoutes;