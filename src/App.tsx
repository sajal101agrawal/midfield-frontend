import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import Loader from './common/Loader';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateApp from './pages/API Key Generate/Apps';
import Validation from './pages/API Key Generate/Validation';

const Home = lazy(() => import('./pages/Home/Home'));
const SignIn = lazy(() => import('./pages/Authentication/SignIn'));
const AuthReceiver = lazy(() => import('./pages/Authentication/AuthReceiver'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="WelCome to MidField" />
              <Home />
            </>
          }
        />
        <Route path="/auth" element={<Outlet />}>
          <Route
            index
            element={
              <>
                <PageTitle title="Signin" />
                <SignIn />
              </>
            }
          />
          <Route
            path="signin"
            element={
              <>
                <PageTitle title="MidField | Sign-in" />
                <SignIn />
              </>
            }
          />
        </Route>
        <Route path="/auth-receiver" element={<AuthReceiver />} />
        <Route path="/dashboard" element={<DefaultLayout />}>
          <Route
            index
            element={
              <>
                <PageTitle title="MidField | Dashboard" />
                <Dashboard />
              </>
            }
          />
          <Route
            path="apps"
            element={
              <>
                <PageTitle title="Dashboard | Apps" />
                <CreateApp />
              </>
            }
          />
          <Route
            path="apps/create_new_app"
            element={
              <>
                <PageTitle title="Dashboard | Create New App" />
                <Validation />
              </>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

// <Routes>
//   <Route
//     index
//     element={<Navigate to={user ? '/dashboard' : '/auth/signin'} />}
//   >
//     <Route
//       path="/auth/signin"
//       element={
//         <>
//           <PageTitle title="Signin" />
//           <SignIn />
//         </>
//       }
//     />
//     <Route
//       path="/auth/signup"
//       element={
//         <>
//           <PageTitle title="Signup" />
//           <SignUp />
//         </>
//       }
//     />
//   </Route>
//   <DefaultLayout>
// <Route
//   element={
//     <>
//       <PageTitle title="eCommerce Dashboard" />
//       <ECommerce />
//     </>
//   }
// />
// <Route
//   path="/calendar"
//   element={
//     <>
//       <PageTitle title="Calendar" />
//       <Calendar />
//     </>
//   }
// />
// <Route
//   path="/profile"
//   element={
//     <>
//       <PageTitle title="Profile" />
//       <Profile />
//     </>
//   }
// />
// <Route
//   path="/forms/form-elements"
//   element={
//     <>
//       <PageTitle title="Form Elements" />
//       <FormElements />
//     </>
//   }
// />
// <Route
//   path="/forms/form-layout"
//   element={
//     <>
//       <PageTitle title="Form Layout" />
//       <FormLayout />
//     </>
//   }
// />
// <Route
//   path="/tables"
//   element={
//     <>
//       <PageTitle title="Tables" />
//       <Tables />
//     </>
//   }
// />
// <Route
//   path="/settings"
//   element={
//     <>
//       <PageTitle title="Settings" />
//       <Settings />
//     </>
//   }
// />
// <Route
//   path="/chart"
//   element={
//     <>
//       <PageTitle title="Basic Chart" />
//       <Chart />
//     </>
//   }
// />
// <Route
//   path="/ui/alerts"
//   element={
//     <>
//       <PageTitle title="Alerts" />
//       <Alerts />
//     </>
//   }
// />
// <Route
//   path="/ui/buttons"
//   element={
//     <>
//       <PageTitle title="Buttons" />
//       <Buttons />
//     </>
//   }
// />
//   </DefaultLayout>
// </Routes>
