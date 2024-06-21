// import { Avatar } from "@chakra-ui/avatar";
// import { Image } from "@chakra-ui/image";
// import { Box, Flex, Text } from "@chakra-ui/layout";
// import { Link, useNavigate } from "react-router-dom";
// import Actions from "./Actions";
// import { useEffect, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import { formatDistanceToNow } from "date-fns";
// import { DeleteIcon } from "@chakra-ui/icons";
// import { useRecoilState, useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import postsAtom from "../atoms/postsAtom";

// const Post = ({ post, postedBy }) => {
// const [user, setUser] = useState(null);
//     const showToast = useShowToast();
//     const currentUser = useRecoilValue(userAtom);
//     const [posts, setPosts] = useRecoilState(postsAtom);
// const navigate = useNavigate();

// useEffect(() => {
//     const getUser = async () => {
//         try {
//             const res = await fetch("/api/users/profile/" + postedBy);
//             const data = await res.json();
//             if (data.error) {
//                 showToast("Error", data.error, "error");
//                 return;
//             }
//             setUser(data);
//         } catch (error) {
//             showToast("Error", error.message, "error");
//             setUser(null);
//         }
//     };

//     getUser();
// }, [postedBy, showToast]);

//     const handleDeletePost = async (e) => {
//         try {
//             e.preventDefault();
//             if (!window.confirm("Are you sure you want to delete this post?")) return;

//             const res = await fetch(`/api/posts/${post._id}`, {
//                 method: "DELETE",
//             });
//             const data = await res.json();
//             if (data.error) {
//                 showToast("Error", data.error, "error");
//                 return;
//             }
//             showToast("Success", "Post deleted", "success");
//             setPosts(posts.filter((p) => p._id !== post._id));
//         } catch (error) {
//             showToast("Error", error.message, "error");
//         }
//     };

//     if (!user) return null;
//     return (
//         <Link to={`/${user.username}/post/${post._id}`}>
//             <Flex gap={3} mb={4} py={5}>
//                 <Flex flexDirection={"column"} alignItems={"center"}>
//                     <Avatar
//                         size='md'
//                         name={user.name}
//                         src={user?.profilePic}
//                         onClick={(e) => {
//                             e.preventDefault();
//                             navigate(`/${user.username}`);
//                         }}
//                     />
//                     <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
//                     <Box position={"relative"} w={"full"}>
//                         {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
//                         {post.replies[0] && (
//                             <Avatar
//                                 size='xs'
//                                 name='John doe'
//                                 src={post.replies[0].userProfilePic}
//                                 position={"absolute"}
//                                 top={"0px"}
//                                 left='15px'
//                                 padding={"2px"}
//                             />
//                         )}

//                         {post.replies[1] && (
//                             <Avatar
//                                 size='xs'
//                                 name='John doe'
//                                 src={post.replies[1].userProfilePic}
//                                 position={"absolute"}
//                                 bottom={"0px"}
//                                 right='-5px'
//                                 padding={"2px"}
//                             />
//                         )}

//                         {post.replies[2] && (
//                             <Avatar
//                                 size='xs'
//                                 name='John doe'
//                                 src={post.replies[2].userProfilePic}
//                                 position={"absolute"}
//                                 bottom={"0px"}
//                                 left='4px'
//                                 padding={"2px"}
//                             />
//                         )}
//                     </Box>
//                 </Flex>
//                 <Flex flex={1} flexDirection={"column"} gap={2}>
//                     <Flex justifyContent={"space-between"} w={"full"}>
//                         <Flex w={"full"} alignItems={"center"}>
// <Text
//     fontSize={"sm"}
//     fontWeight={"bold"}
//     onClick={(e) => {
//         e.preventDefault();
//         navigate(`/${user.username}`);
//     }}
// >
//     {user?.username}
// </Text>
//                             <Image src='/verified.png' w={4} h={4} ml={1} />
//                         </Flex>
//                         <Flex gap={4} alignItems={"center"}>
//                             <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
//                                 {formatDistanceToNow(new Date(post.createdAt))} ago
//                             </Text>

//                             {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
//                         </Flex>
//                     </Flex>

//                     <Text fontSize={"sm"}>{post.text}</Text>
//                     {post.img && (
//                         <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
//                             <Image src={post.img} w={"full"} />
//                         </Box>
//                     )}

//                     <Flex gap={3} my={1}>
//                         <Actions post={post} />
//                     </Flex>
//                 </Flex>
//             </Flex>
//         </Link>
//     );
// };

// export default Post;


import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Actions from './Actions'
import useShowToast from '../hooks/useShowToast'
// import { formatDistanceFromNow } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';
// import formatDistanceFromNow from 'date-fns/formatDistanceFromNow';


const Post = ({ post, postedBy }) => {
    console.log(post);
    const username = postedBy.username
    console.log(username);
    console.log(post.replies);
    const [liked, setLiked] = useState(false);
    const showToast = useShowToast();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const getUser = async () => {
            const username = postedBy.username
            // console.log(username);
            try {
                const res = await fetch(`http://localhost:3000/api/users/profile/${username}`);
                const data = await res.json();
                console.log(data);

                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setUser(data);
                // console.log(setUser);
            } catch (error) {
                showToast("Error", error.message, "error");
                setUser(null);

            }
        };

        getUser();
    }, [username, showToast]);
    console.log(user);
    // console.log(user.data.username);


    return (
        <Link to={`/${username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5} >
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size={8} name={user?.data.name} src={user?.data.profilePic}
                        onClick={(e) => {
                            e.preventDefault()
                            navigate(`${username}`)

                        }}
                    />
                    <Box w="1px" h={"full"} bg={"gray.light"} my={2} ></Box>
                    <Box position={"relative"} w={"full"}>
                        {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}

                        {post.replies[0] && (


                            <Avatar
                                size="xs"
                                name='Shashanka Poudel'
                                src={post.replies[0].userprofilePic}
                                position={"absolute"}
                                top={"0px"}
                                left="15px"
                                padding={"2px"}
                            />
                        )}
                        {post.replies[1] && (


                            <Avatar
                                size="xs"
                                name='Shashanka Poudel'
                                src={post.replies[1].userprofilePic}
                                position={"absolute"}
                                top={"0px"}
                                left="15px"
                                padding={"2px"}
                            />
                        )}
                        {post.replies[2] && (


                            <Avatar
                                size="xs"
                                name='Shashanka Poudel'
                                src={post.replies[2].profilePic}
                                position={"absolute"}
                                top={"0px"}
                                left="15px"
                                padding={"2px"}
                            />
                        )}


                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} justifyContent={"center"} marginRight={258}>
                            {/* <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text> */}
                            <Text
                                // marginRight={8}
                                fontSize={14}
                                fontWeight={"bold"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/${username}`);
                                }}
                            >
                                {username}
                            </Text>
                            <Image src='/verified.png' w={3} h={3} marginTop={1.5} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"} marginTop={-1}>
                                {formatDistanceToNow(new Date(post.createdAt))}
                            </Text>
                            <BsThreeDots />
                        </Flex>

                    </Flex>
                    <Text fontSize={"sm"}>{post.text}</Text>
                    {post.img && (

                        <Box
                            borderRadius={6}
                            overflow={"hidden"}
                            border={"1px solid"}
                            borderColor={"gray.light"}
                        >
                            <Image src={post.img} w={"full"} />
                        </Box>
                    )
                    }
                    <Flex gap={3} my={1}>
                        <Actions post={post} />

                    </Flex>

                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>{post?.replies?.length} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} flexDirection={"row"}>
                        </Box>
                        <Text color={"gray.light"} fontSize={"sm"} >{post?.likes?.length} likes</Text>
                    </Flex>

                </Flex>
            </Flex>
        </Link>
    )
}

export default Post