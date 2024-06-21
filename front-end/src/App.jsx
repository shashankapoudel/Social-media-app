


import { Container, ChakraProvider, } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';

import Header from './components/Header';
import LogoutButton from './components/LogoutButton';
import CreatePost from './components/CreatePost';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
// import { theme } from '@chakra-ui/react';
// import authScreenAtom from './atoms/authAtom';

import userAtom from './atoms/userAtom';


function App() {

  return (
    // <ChakraProvider theme={theme}>

    <RecoilRoot>

      <Container maxW="620px">
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </Container>

    </RecoilRoot>
    // </ChakraProvider>
  );
}

function AppLayout() {
  const user = useRecoilValue(userAtom);
  // const authScreen = useRecoilValue(authScreenAtom);
  // const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
        <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />
        <Route path='/:username' element={<UserPage />} />
        <Route path='/:username/post/:pid' element={<PostPage />} />
      </Routes>
      {user && <LogoutButton />}
      {/* {user && location.pathname === '/' && <LogoutButton />} */}
      {user && <CreatePost />}
      {/* {user && <UpdateProfilePage />} */}
    </>
  );
}

export default App


// import React from 'react';
// import { ChakraProvider, Container } from '@chakra-ui/react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { RecoilRoot, useRecoilValue } from 'recoil';
// import Header from './components/Header';
// import LogoutButton from './components/LogoutButton';
// import CreatePost from './components/CreatePost';
// import HomePage from './pages/HomePage';
// import AuthPage from './pages/AuthPage';
// import UpdateProfilePage from './pages/UpdateProfilePage';
// import UserPage from './pages/UserPage';
// import PostPage from './pages/PostPage';
// import userAtom from './atoms/userAtom';

// function App() {
//   const user = useRecoilValue(userAtom);

//   return (
//     <ChakraProvider>
//       <RecoilRoot>
//         <Container maxW="620px">
//           <BrowserRouter>
//             <AppLayout />
//           </BrowserRouter>
//         </Container>
//       </RecoilRoot>
//     </ChakraProvider>
//   );
// }

// function AppLayout() {
//   const user = useRecoilValue(userAtom);

//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
//         <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
//         <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />
//         <Route path='/:username' element={<UserPage />} />
//         <Route path='/:username/post/:pid' element={<PostPage />} />
//       </Routes>
//       {user && <LogoutButton />}
//       {user && <CreatePost />}
//     </>
//   );
// }

// export default App;

