


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
// import { useRef, useState } from "react";
// import { useRecoilState } from "recoil";
// import userAtom from "../atoms/userAtom";
// import usePreviewImg from "../hooks/usePreviewImg";
// import useShowToast from "../hooks/useShowToast";
// // import useShowToast from "../hooks/useShowToast";

// export default function UpdateProfilePage() {
//     const [user, setUser] = useRecoilState(userAtom);
//     // console.log(user)
// const [inputs, setInputs] = useState({
//     name: user.name || '',
//     username: user.username || '',
//     email: user.email || '',
//     password: user.password || '',
//     bio: user.bio || '',
// });
//     const fileRef = useRef(null);
//     const [updating, setUpdating] = useState(false);
//     const showToast = useShowToast()


//     const { handleImageChange, imgUrl } = usePreviewImg();
//     console.log(user.data.user._id);
//     const token = user.data.accessToken;
//     console.log(token);

//     const handleSubmit = async (e) => {
//         console.log(kmlkmlk);
//         e.preventDefault();
//         if (updating) return;
//         setUpdating(true);
//         const token = user.data.accessToken;
//         console.log(token);
//         console.log(user.data.user._id);

//         try {
//             const res = await fetch(`http://localhost:3000/api/users/update/${user.data.user._id}`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
// "Authorization": `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
//                 });

//             if (!res.ok) {
//                 const error = await res.text();
//                 throw new Error(error);
//             }

//             const data = await res.json();
//             if (data.error) {
//                 showToast("error", data.error, "error")
//                 return;
//             }
//             console.log(data);
//             showToast("Success", "Profile updated successfully", "success");
//             // setUser(data);
//             localStorage.setItem("user-threads", JSON.stringify(data));
//         } catch (error) {
//             showToast("Error", error.message, "error");
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
//                     bg={useColorModeValue("white", "gray.700")}
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
//                                 <Avatar size='xl' boxShadow={"md"} src={imgUrl || user.profilePic} />
//                             </Center>
//                             <Center w='full'>
//                                 <Button w='full' onClick={() => fileRef.current.click()}>
//                                     Change Avatar
//                                 </Button>
//                                 <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
//                             </Center>
//                         </Stack>
//                     </FormControl>
//                     <FormControl isRequired>
//                         <FormLabel>name</FormLabel>
//                         <Input
//                             placeholder='John Doe'
//                             value={inputs.name}
//                             onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
//                             _placeholder={{ color: "gray.500" }}
//                             type='text'
//                         />
//                     </FormControl>
//                     <FormControl isRequired>
//                         <FormLabel>username</FormLabel>
//                         <Input
//                             placeholder='johndoe'
//                             value={inputs.username}
//                             onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
//                             _placeholder={{ color: "gray.500" }}
//                             type='text'
//                         />
//                     </FormControl>
//                     <FormControl isRequired>
//                         <FormLabel>email</FormLabel>
//                         <Input
//                             placeholder='your-email@example.com'
//                             value={inputs.email}
//                             onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//                             _placeholder={{ color: "gray.500" }}
//                             type='email'
//                         />
//                     </FormControl>
//                     <FormControl >
//                         <FormLabel>Bio</FormLabel>
//                         <Input
//                             placeholder='Your bio.'
//                             value={inputs.bio}
//                             onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
//                             _placeholder={{ color: "gray.500" }}
//                             type='text'
//                         />
//                     </FormControl>
//                     <FormControl isRequired>
//                         <FormLabel>password</FormLabel>
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
//                             type='button'
//                             onClick={() => {
//                                 // Add cancel logic if needed
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

export default function UpdateProfilePage() {
    const [user, setUser] = useRecoilState(userAtom);
    console.log(user);

    const [inputs, setInputs] = useState({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        password: user.password || '',
        bio: user.bio || '',
    });
    const fileRef = useRef(null);
    const [updating, setUpdating] = useState(false);

    const showToast = useShowToast();

    const { handleImageChange, imgUrl } = usePreviewImg();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = user.data.accessToken;
        console.log(user.data.accessToken);


        if (updating) return;
        setUpdating(true);
        try {
            const res = await fetch(`http://localhost:3000/api/users/update/${user.data.user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
            });
            const data = await res.json(); // updated user object
            console.log(data);

            if (data.error) {
                console.log("Error", "error");
                return;
            }
            showToast("Success", "Profile updated successfully", "success");
            setUser(data);
            localStorage.setItem("user-threads", JSON.stringify(data));
        } catch (error) {
            showToast("Error", error.toString(), "error");
        } finally {
            setUpdating(false);
        }
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
                                <Avatar size='xl' boxShadow={"md"} src={imgUrl || user.profilePic} />
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

