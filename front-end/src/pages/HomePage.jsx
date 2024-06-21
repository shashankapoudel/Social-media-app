// import React, { useEffect, useState } from 'react'
// import { Box, Button, Flex, Spinner } from '@chakra-ui/react'
// import { Link } from 'react-router-dom'
// import useShowToast from '../hooks/useShowToast'
// import userAtom from "../atoms/userAtom"
// import { useRecoilState, useRecoilValue } from "recoil";
// import Post from '../components/Post'
// import postsAtom from '../atoms/postsAtom'

// const HomePage = () => {
//     const [posts, setPosts] = useState([]);
//     // const [posts, setPosts] = useRecoilState(postsAtom);
//     console.log(posts);
//     const [loading, setLoading] = useState(false)
//     const showToast = useShowToast()
//     const user = useRecoilValue(userAtom);
//     // console.log(user.data.user._id);
//     console.log(user);
//     useEffect(() => {
//         const getFeedPosts = async () => {
//             // if (!user || !user.data || !user.data.accessToken) {
//             //     console.log("error", "User token is missing", "Error");
//             //     return;
//             // }
//             const token = user.data.accessToken;
//             console.log(token);
//             setLoading(true)
//             // setLoading(true);
//             // setPosts([]);
//             try {
//                 const res = await fetch(' http://localhost:3000/api/posts/feed', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                 });
//                 const data = await res.json()
//                 console.log(data);
//                 setPosts(data.data)
//                 console.log(posts);
//             } catch (error) {
//                 showToast("error", error.message, "Error")
//             } finally {
//                 setLoading(false)
//             }
//         }
//         getFeedPosts()
//     }, [showToast, setPosts])


//     return (
//         // <Flex gap='10' alignItems={"flex-start"}>
//         //     <Box flex={70}>
//         //         {/* {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>} */}

//         //         {loading && (
//         //             <Flex justify='center'>
//         //                 <Spinner size='xl' />
//         //             </Flex>
//         //         )}

//         //         {posts.map((post) => (
//         //             <Post key={post.data._id} post={post.data.post} postedBy={post.postedBy} />
//         //         ))}
//         //     </Box>
//         <Flex gap='10' alignItems={"flex-start"}>
//             <Box flex={70}>
//                 {/* {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>} */}

//                 {loading && (
//                     <Flex justify='center'>
//                         <Spinner size='xl' />
//                     </Flex>
//                 )}

//                 {posts.map((post) => (
//                     <Post key={post._id} post={post} postedBy={post.postedBy} />
//                 ))}
//             </Box>

//         </Flex>
//     )
// }

// export default HomePage



import React, { useEffect, useState } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
import Post from '../components/Post';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        const getFeedPosts = async () => {
            if (!user?.data?.accessToken) {
                showToast("error", "User token is missing", "Error");
                return;
            }
            const token = user.data.accessToken;
            setLoading(true);
            try {
                const res = await fetch('http://localhost:3000/api/posts/feed', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await res.json();
                setPosts(data.data);
            } catch (error) {
                showToast("error", error.message, "Error");
            } finally {
                setLoading(false);
            }
        };
        getFeedPosts();
    }, [showToast, user]);

    return (
        <Flex gap='10' alignItems={"flex-start"}>
            <Box flex={70}>
                {loading && (
                    <Flex justify='center'>
                        <Spinner size='xl' />
                    </Flex>
                )}
                {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}
                {posts.map((post) => (
                    <Post key={post._id} post={post} postedBy={post.postedBy} />
                ))}
            </Box>
        </Flex>
    );
};

export default HomePage;


