import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import userAtom from "../atoms/userAtom"
import { useRecoilState, useRecoilValue } from "recoil";
import Post from '../components/Post'

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const showToast = useShowToast()
    const user = useRecoilValue(userAtom);
    useEffect(() => {
        const getFeedPosts = async () => {
            const token = user.data.accessToken;
            console.log(token);
            setLoading(true)
            // setLoading(true);
            setPosts([]);
            try {
                const res = await fetch(' http://localhost:3000/api/posts/feed', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await res.json()
                console.log(data);
                setPosts(data.data)
                console.log(posts);
            } catch (error) {
                showToast("error", error.message, "Error")
            } finally {
                setLoading(false)
            }
        }
        getFeedPosts()
    }, [showToast, setPosts])


    return (
        // <Flex gap='10' alignItems={"flex-start"}>
        //     <Box flex={70}>
        //         {/* {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>} */}

        //         {loading && (
        //             <Flex justify='center'>
        //                 <Spinner size='xl' />
        //             </Flex>
        //         )}

        //         {posts.map((post) => (
        //             <Post key={post.data._id} post={post.data.post} postedBy={post.postedBy} />
        //         ))}
        //     </Box>
        <Flex gap='10' alignItems={"flex-start"}>
            <Box flex={70}>
                {/* {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>} */}

                {loading && (
                    <Flex justify='center'>
                        <Spinner size='xl' />
                    </Flex>
                )}

                {posts.map((post) => (
                    <Post key={post._id} post={post} postedBy={post.postedBy} />
                ))}
            </Box>

        </Flex>
    )
}

export default HomePage