import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Actions from './Actions'

const UserPost = ({ postImg, postTitle, replies, likes }) => {
    const [liked, setLiked] = useState(false);
    return (
        <Link to={'/mark/post/1'}>
            <Flex gap={3} mb={4} py={5} >
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size="md" name='Mark Zuckerberg' src='/zuck-avatar.png'
                    />
                    <Box w="1px" h={"full"} bg={"gray.light"} my={2} ></Box>
                    <Box position={"relative"} w={"full"}>
                        <Avatar
                            size="xs"
                            name='Shashanka Poudel'
                            src='https://bit.ly/dan-abramov'
                            position={"absolute"}
                            top={"0px"}
                            left="15px"
                            padding={"2px"}
                        />
                        <Avatar
                            size="xs"
                            name='Shashanka Poudel'
                            src='https://bit.ly/kent-c-dodds'
                            position={"absolute"}
                            bottom={"0px"}
                            right="-5px"
                            padding={"2px"}
                        />
                        <Avatar
                            size="xs"
                            name='Shashanka Poudel'
                            src='https://bit.ly/code-beast'
                            position={"absolute"}
                            bottom={"1px"}
                            left="4px"
                            padding={"2px"}
                        />

                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} justifyContent={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>Mark Zuckerberg</Text>
                            <Image src='/verified.png' w={3} h={3} marginTop={1.5} />
                        </Flex>
                        <Flex>
                            <Text fontStyle={"sm"} color={"gray.light"} marginTop={-1}>1d</Text>
                            <BsThreeDots />
                        </Flex>

                    </Flex>
                    <Text fontSize={"sm"}>{postTitle}</Text>
                    {postImg && (

                        <Box
                            borderRadius={6}
                            overflow={"hidden"}
                            border={"1px solid"}
                            borderColor={"gray.light"}
                        >
                            <Image src={postImg} w={"full"} />
                        </Box>
                    )
                    }
                    <Flex gap={3} my={1}>
                        <Actions liked={liked} setLiked={setLiked} />

                    </Flex>
                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>{replies}</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} flexDirection={"row"}>
                        </Box>
                        <Text color={"gray.light"} fontSize={"sm"} >{likes}</Text>
                    </Flex>

                </Flex>
            </Flex>
        </Link>
    )
}

export default UserPost