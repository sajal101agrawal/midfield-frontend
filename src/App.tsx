import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

// import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AuthReceiver from './pages/Authentication/AuthReceiver';
import CreateApp from './pages/API Key Generate/Apps';
import Validation from './pages/API Key Generate/Validation';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // <Navigate to={'/auth/signin'} />

  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/auth/signin'} />} />
      <Route path="/auth-receiver" element={<AuthReceiver />} />
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
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        {/* <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        /> */}
      </Route>
      <Route path="/dashboard" element={<DefaultLayout />}>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="apps"
          element={
            <>
              <PageTitle title="Apps" />
              <CreateApp />
            </>
          }
        />
        <Route
          path="apps/create_new_app"
          element={
            <>
              <PageTitle title="Create New App" />
              <Validation />
            </>
          }
        />
        {/* <Route
          path="calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        <Route
          path="profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements" />
              <FormElements />
            </>
          }
        />
        <Route
          path="forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="tables"
          element={
            <>
              <PageTitle title="Tables" />
              <Tables />
            </>
          }
        />
        <Route
          path="settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="chart"
          element={
            <>
              <PageTitle title="Basic Chart" />
              <Chart />
            </>
          }
        />
        <Route
          path="ui/alerts"
          element={
            <>
              <PageTitle title="Alerts" />
              <Alerts />
            </>
          }
        />
        <Route
          path="ui/buttons"
          element={
            <>
              <PageTitle title="Buttons" />
              <Buttons />
            </>
          }
        /> */}
      </Route>
    </Routes>
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
