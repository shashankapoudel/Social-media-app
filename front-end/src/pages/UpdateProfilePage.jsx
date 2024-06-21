


import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";

export default function UpdateProfilePage() {
    const [user, setUser] = useRecoilState(userAtom);
    const [inputs, setInputs] = useState({
        name: user?.data?.user?.name || '',
        username: user?.data?.user?.username || '',
        email: user?.data?.user?.email || '',
        password: '',
        bio: user?.data?.user?.bio || '',
    });
    const fileRef = useRef(null);
    const [updating, setUpdating] = useState(false);
    const showToast = useShowToast();
    const { handleImageChange, imgUrl } = usePreviewImg();
    const navigate = useNavigate();
    const username = user.data.user.username
    // console.log(imgUrl);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = user?.data?.accessToken;
        if (updating) return;
        setUpdating(true);
        try {
            const res = await fetch(`http://localhost:3000/api/users/update/${user?.data?.user?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
            });
            const data = await res.json();
            console.log(data);
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Profile updated successfully", "success");

            // const updatedUser = {
            //     ...user,
            //     data: {
            //         ...user.data,
            //         user: { ...user.data.user, ...data.user }
            //     }
            // };
            const updatedUser = {
                ...user,
                data: {
                    ...user.data,
                    user: {
                        ...user.data.user,
                        name: data.data.user.name || user.data.user.name,
                        username: data.data.user.username || user.data.user.username,
                        email: data.data.user.email || user.data.user.email,
                        bio: data.data.user.bio || user.data.user.bio,
                        profilePic: data.data.user.profilePic || user.data.user.profilePic
                    }
                }
            };

            console.log(updatedUser);
            setUser(updatedUser);
            localStorage.setItem("user-threads", JSON.stringify(updatedUser));
        } catch (error) {
            showToast("Error", error.toString(), "error");
        } finally {
            setUpdating(false);
        }
        console.log(user);
    };
    const handleCancel = () => {
        navigate(`/${username}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex align={"center"} justify={"center"} my={6}>
                <Stack
                    spacing={4}
                    w={"full"}
                    maxW={"md"}
                    bg={useColorModeValue("white", "gray.dark")}
                    rounded={"xl"}
                    boxShadow={"lg"}
                    p={6}
                >
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id='userName'>
                        <Stack direction={["column", "row"]} spacing={6}>
                            <Center>
                                <Avatar size='xl' boxShadow={"md"} src={imgUrl || user?.data?.user?.profilePic} />
                            </Center>
                            <Center w='full'>
                                <Button w='full' onClick={() => fileRef.current.click()}>
                                    Change Avatar
                                </Button>
                                <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Full name</FormLabel>
                        <Input
                            placeholder='John Doe'
                            value={inputs.name}
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>User name</FormLabel>
                        <Input
                            placeholder='johndoe'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder='your-email@example.com'
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            _placeholder={{ color: "gray.500" }}
                            type='email'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Input
                            placeholder='Your bio.'
                            value={inputs.bio}
                            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder='password'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            _placeholder={{ color: "gray.500" }}
                            type='password'
                        />
                    </FormControl>
                    <Stack spacing={6} direction={["column", "row"]}>
                        <Button
                            bg={"red.400"}
                            color={"white"}
                            w='full'
                            _hover={{
                                bg: "red.500",
                            }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={"green.400"}
                            color={"white"}
                            w='full'
                            _hover={{
                                bg: "green.500",
                            }}
                            type='submit'
                            isLoading={updating}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    );
}



// import {
//     Button,
//     Flex,
//     FormControl,
//     FormLabel,
//     Heading,
//     Input,
//     Stack,
//     useColorModeValue,
//     Avatar,
//     Center,
// } from "@chakra-ui/react";
// import { useRef, useState, useEffect } from "react";
// import { useRecoilState } from "recoil";
// import userAtom from "../atoms/userAtom";
// import usePreviewImg from "../hooks/usePreviewImg";
// import useShowToast from "../hooks/useShowToast";

// export default function UpdateProfilePage() {
//     const [user, setUser] = useRecoilState(userAtom);
//     const [inputs, setInputs] = useState({
//         name: user?.data?.user?.name || '',
//         username: user?.data?.user?.username || '',
//         email: user?.data?.user?.email || '',
//         password: '',
//         bio: user?.data?.user?.bio || '',
//     });
//     const fileRef = useRef(null);
//     const [updating, setUpdating] = useState(false);
//     const showToast = useShowToast();
//     const { handleImageChange, imgUrl } = usePreviewImg();

//     useEffect(() => {
//         // Sync state with the updated user data
//         const storedUser = JSON.parse(localStorage.getItem("user-threads"));
//         if (storedUser) {
//             setUser(storedUser);
//         }
//     }, [setUser]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const token = user?.data?.accessToken;
//         if (updating) return;
//         setUpdating(true);
//         try {
//             const res = await fetch(`http://localhost:3000/api/users/update/${user?.data?.user?._id}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
//             });
//             const data = await res.json();
//             console.log("Response Data:", data);
//             if (data.error) {
//                 showToast("Error", data.error, "error");
//                 setUpdating(false);
//                 return;
//             }
//             showToast("Success", "Profile updated successfully", "success");

//             const updatedUser = {
//                 ...user,
//                 data: {
//                     ...user.data,
//                     user: {
//                         ...user.data.user,
//                         name: data.user.name || user.data.user.name,
//                         username: data.user.username || user.data.user.username,
//                         email: data.user.email || user.data.user.email,
//                         bio: data.user.bio || user.data.user.bio,
//                         profilePic: data.user.profilePic || user.data.user.profilePic
//                     }
//                 }
//             };

//             console.log("Updated User:", updatedUser);
//             setUser(updatedUser);
//             localStorage.setItem("user-threads", JSON.stringify(updatedUser));
//         } catch (error) {
//             showToast("Error", error.toString(), "error");
//         } finally {
//             setUpdating(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <Flex align={"center"} justify={"center"} my={6}>
//                 <Stack
//                     spacing={4}
//                     w={"full"}
//                     maxW={"md"}
//                     bg={useColorModeValue("white", "gray.dark")}
//                     rounded={"xl"}
//                     boxShadow={"lg"}
//                     p={6}
//                 >
//                     <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
//                         User Profile Edit
//                     </Heading>
//                     <FormControl id='userName'>
//                         <Stack direction={["column", "row"]} spacing={6}>
//                             <Center>
//                                 <Avatar size='xl' boxShadow={"md"} src={imgUrl || user?.data?.user?.profilePic} />
//                             </Center>
//                             <Center w='full'>
//                                 <Button w='full' onClick={() => fileRef.current.click()}>
//                                     Change Avatar
//                                 </Button>
//                                 <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
//                             </Center>
//                         </Stack>
//                     </FormControl>
//                     <FormControl>
//                         <FormLabel>Full name</FormLabel>
//                         <Input
//                             placeholder='John Doe'
//                             value={inputs.name}
//                             onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
//                             _placeholder={{ color: "gray.500" }}
//                             type='text'
//                         />
//                     </FormControl>
//                     <FormControl>
//                         <FormLabel>User name</FormLabel>
//                         <Input
//                             placeholder='johndoe'
//                             value={inputs.username}
//                             onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
//                             _placeholder={{ color: "gray.500" }}
//                             type='text'
//                         />
//                     </FormControl>
//                     <FormControl>
//                         <FormLabel>Email address</FormLabel>
//                         <Input
//                             placeholder='your-email@example.com'
//                             value={inputs.email}
//                             onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//                             _placeholder={{ color: "gray.500" }}
//                             type='email'
//                         />
//                     </FormControl>
//                     <FormControl>
//                         <FormLabel>Bio</FormLabel>
//                         <Input
//                             placeholder='Your bio.'
//                             value={inputs.bio}
//                             onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
//                             _placeholder={{ color: "gray.500" }}
//                             type='text'
//                         />
//                     </FormControl>
//                     <FormControl>
//                         <FormLabel>Password</FormLabel>
//                         <Input
//                             placeholder='password'
//                             value={inputs.password}
//                             onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
//                             _placeholder={{ color: "gray.500" }}
//                             type='password'
//                         />
//                     </FormControl>
//                     <Stack spacing={6} direction={["column", "row"]}>
//                         <Button
//                             bg={"red.400"}
//                             color={"white"}
//                             w='full'
//                             _hover={{
//                                 bg: "red.500",
//                             }}
//                             onClick={() => {
//                                 setInputs({
//                                     name: user?.data?.user?.name || '',
//                                     username: user?.data?.user?.username || '',
//                                     email: user?.data?.user?.email || '',
//                                     password: '',
//                                     bio: user?.data?.user?.bio || '',
//                                 });
//                                 showToast("Info", "Changes canceled", "info");
//                             }}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             bg={"green.400"}
//                             color={"white"}
//                             w='full'
//                             _hover={{
//                                 bg: "green.500",
//                             }}
//                             type='submit'
//                             isLoading={updating}
//                         >
//                             Submit
//                         </Button>
//                     </Stack>
//                 </Stack>
//             </Flex>
//         </form>
//     );
// }
