// import React, { useEffect, useState } from 'react'
// import UserHeader from '../components/UserHeader'
// import UserPost from '../components/UserPost'
// import { useParams } from 'react-router-dom'
// import useShowToast from '../hooks/useShowToast'
// import { useRecoilState } from 'recoil'
// import userAtom from '../atoms/userAtom'
// import { Flex, Spinner } from '@chakra-ui/react'
// import Post from '../components/Post'
// // import { useRecoilState } from "recoil";
// // import postsAtom from "../atoms/postsAtom";

// const UserPage = () => {
//   const [user, setUser] = useState(null)
//   // const [user, setUser] = useRecoilState(userAtom);
//   console.log(user);

//   const { username } = useParams()
//   const showToast = useShowToast()
//   console.log(username);
//   const [loading, setLoading] = useState(true)
//   const [posts, setPosts] = useState([])
//   // const [posts, setPosts] = useRecoilState(postsAtom);
//   const [fetchingPosts, setFetchingPosts] = useState(true)


//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         console.log(' UserPage Loading......');
//         const res = await fetch(`http://localhost:3000/api/users/profile/${username}`,
//           {
//             method: "GET",
//             headers: {
//               "Accept": 'application/json',
//               "Content-Type": "application/json",
//             },

//           });
//         console.log(res);
//         if (!res.ok) {
//           const error = await res.text();
//           throw new Error(error);
//         }
//         const data = await res.json()
//         console.log(data);
//         if (data.error) {
//           showToast("error", data.error, "Error");
//           return;
//         }
//         setUser(data);
//       } catch (error) {
//         showToast('error', 'Error while creating userpage');
//       } finally {
//         setLoading(false)
//       }
//     }
//     const getPosts = async () => {
//       if (!user) return;
//       setFetchingPosts(true);
//       try {
//         const res = await fetch(`http://localhost:3000/api/posts/user/${username}`, {
//           "method": "GET",
//         })
//         const data = await res.json()
//         console.log(data);
//         setPosts(data)

//       } catch (error) {
//         showToast('error', error.message, "Error")
//         setPosts([])

//       } finally {
//         setFetchingPosts(false)
//       }
//     }
//     getUser()
//     getPosts()

//   }, [username, showToast, setPosts])
//   if (!user) return null

//   if (!user && loading) {
//     return (
//       <Flex justifyContent={"center"}>
//         <Spinner size={"xl"} />
//       </Flex>
//     );
//   }
//   console.log(posts);
//   if (!user && !loading) return <h1>User not found</h1>;

//   // posts.data.map((v) => {
//   //   console.log('THIS IS FROM TOP LEVEL MAP');
//   // })



//   return (
//     <div>
//       <UserHeader user={user} />
//       {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
//       {fetchingPosts && (
//         <Flex justifyContent={"center"} my={12}>
//           <Spinner size={"xl"} />
//         </Flex>
//       )}
//       {/* {posts.data.map((post) => (
//         <Post key={post._id} post={post} postedBy={post.postedBy} />
//       ))} */}


//     </div>
//   )
// }


// export default UserPage





import React, { useEffect, useState } from 'react';
import UserHeader from '../components/UserHeader';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom'
// import useGetUserProfile from "../hooks/useGetUserProfile";

const UserPage = () => {
  const [user, setUser] = useState(null);
  // const { user } = useGetUserProfile()
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/profile/${username}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          const error = await res.text();
          throw new Error(error);
        }
        const data = await res.json();
        if (data.error) {
          showToast('error', data.error, 'Error');
          return;
        }
        setUser(data.data);
      } catch (error) {
        showToast('error', 'Error while loading user profile');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, showToast]);
  console.log(user)

  useEffect(() => {
    if (!user) return;

    const getPosts = async () => {
      // console.log();
      setFetchingPosts(true);
      try {
        const res = await fetch(`http://localhost:3000/api/posts/user/${username}`, {
          method: 'GET',
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        showToast('error', error.message, 'Error');
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [user, username, showToast]);
  console.log(posts)

  if (loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    );
  }

  if (!user && !loading) {
    return <h1>User not found</h1>;
  }
  console.log(user);

  return (
    <div>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <h1>User has no posts.</h1>}
      {fetchingPosts && (
        <Flex justifyContent={'center'} my={12}>
          <Spinner size={'xl'} />
        </Flex>
      )}
      {/* {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))} */}

      {!fetchingPosts && posts.data.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </div>
  );
};

export default UserPage;







