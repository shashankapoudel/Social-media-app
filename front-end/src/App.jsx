// import { Container } from '@chakra-ui/react';

// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import UserPage from './pages/UserPage';
// import Header from './components/Header';
// import PostPage from './pages/PostPage';
// import { RecoilRoot, useRecoilValue } from 'recoil';
// import HomePage from './pages/HomePage';
// import AuthPage from './pages/AuthPage';
// import userAtom from './atoms/userAtom';
// import LogoutButton from './components/LogoutButton';
// import UpdateProfilePage from './pages/UpdateProfilePage'
// import CreatePost from './components/CreatePost';
// // import LoginCard from './components/LoginCard';



// function App() {

//   const user = useRecoilValue(userAtom);
//   console.log(user);
//   return (
//     <RecoilRoot>

//       <Container maxW="620px">

//         <BrowserRouter>
//           <Header />
//           <Routes>
//             <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
//             <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
//             <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />

//             <Route path='/:username' element={<UserPage />} />
//             <Route path='/:username/post/:pid' element={<PostPage />} />





//           </Routes>

//         </BrowserRouter>
//         {user && <LogoutButton />}
//         {user && <CreatePost />}
//       </Container>
//     </RecoilRoot>
//   )
// }

// export default App


import { Container } from '@chakra-ui/react';
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

import userAtom from './atoms/userAtom';

function App() {
  return (
    <RecoilRoot>
      <Container maxW="620px">
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </Container>
    </RecoilRoot>
  );
}

function AppLayout() {
  const user = useRecoilValue(userAtom);

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
      {user && <CreatePost />}
      {/* {user && <UpdateProfilePage />} */}
    </>
  );
}

export default App;

