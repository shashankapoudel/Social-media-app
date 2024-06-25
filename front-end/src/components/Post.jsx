import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Actions from './Actions'
import useShowToast from '../hooks/useShowToast'
import { formatDistanceToNow } from 'date-fns';


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
                    <Avatar size='md' name={user?.data.name} src={user?.data.profilePic}
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
                        <Flex w={"full"} justifyContent={"center"} marginRight={298}>
                            {/* <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text> */}
                            <Text
                                // marginRight={8}
                                fontSize={15}
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
                    {/* 
                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>{post?.replies?.length} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} flexDirection={"row"}>
                        </Box>
                        <Text color={"gray.light"} fontSize={"sm"} >{post?.likes?.length} likes</Text>
                    </Flex> */}

                </Flex>
            </Flex>
        </Link>
    )
}

export default Post