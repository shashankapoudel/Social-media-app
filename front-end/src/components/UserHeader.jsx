



import { Avatar, Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
// import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link as RouterLink } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'


const UserHeader = ({ user }) => {
    console.log(user)
    const currentUser = useRecoilValue(userAtom)
    const [following, setFollowing] = useState(user.followers.includes(currentUser?.data.user._id))
    const [updating, setUpdating] = useState(false)
    const showToast = useShowToast();
    const toast = useToast()
    const copyURL = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            console.log('URL copied to clipboard');
            toast({
                title: "Success.",
                status: "success",
                description: "Profile link copied.",
                duration: 3000,
                isClosable: true,
            });

        })
    };
    const handleFollowUnfollow = async () => {
        const token = currentUser.data.accessToken;
        console.log(token);
        setUpdating(true)

        try {
            const res = await fetch(`http://localhost:3000/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            })
            const data = await res.json();
            console.log(res);
            console.log(data);
            if (following) {
                user.followers.pop()
            } else {
                user.followers.push(currentUser?.data.user._id)
            }
            setFollowing(!following)
        } catch (error) {
            showToast("error", error, "Error")

        } finally {
            setUpdating(false)
        }

    }
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {user.name}

                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>
                            {user.username}
                        </Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                            {/* threads.net */}
                        </Text>
                    </Flex>

                </Box>
                <Box>
                    {user.profilePic && (


                        <Avatar
                            name={user.name}
                            src={user.profilePic}
                            size={{
                                base: "md",
                                md: "lg",
                            }}
                        />
                    )
                    }
                    {!user.profilePic && (


                        <Avatar
                            name={user.name}
                            src="https://bit.ly/broken-Link"
                            size={{
                                base: "md",
                                md: "lg",
                            }}
                        />
                    )
                    }
                </Box>

            </Flex>
            <Text>{user.bio}</Text>
            {currentUser?.data.user._id === user._id && (
                <Link href='/update'>
                    <Button size={"sm"}>
                        Update Profile
                    </Button>
                </Link>
            )
            }
            {currentUser?.data.user._id !== user._id && (
                <Link as={RouterLink} href='/update'>
                    <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
                        {following ? "Unfollow" : "Follow"}
                    </Button>

                </Link>
            )

            }
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user.followers.length} followers</Text>
                    <Box w='1' h='1' bg={"gray.light"} borderRadius={"full"}></Box>
                    {/* <Link color={"gray.light"}>instagram.com</Link> */}
                </Flex>
                <Flex >
                </Flex>
                <Box className='icon-container' ml={228}>

                    {/* <BsInstagram size={24} cursor={"pointer"} /> */}
                </Box>
                <Box className='icon-container' >
                    <Menu>

                        <MenuButton>

                            <CgMoreO size={24} cursor={"pointer"} />
                        </MenuButton>
                        <Portal>
                            <MenuList bg={"gray.dark"}>
                                <MenuItem bg={"gray.dark"} onClick={copyURL}>
                                    Copy link
                                </MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Box>

            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid grey"}
                    color={"grey.light"}
                    justifyContent={"center"} pb="3" cursor={"pointer"}>
                    {/* <Text fontWeight={"bold"}>Replies</Text> */}
                </Flex>

            </Flex>

        </VStack>
    )
}

export default UserHeader