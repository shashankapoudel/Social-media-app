
// import {
//     Flex,
//     Box,
//     FormControl,
//     FormLabel,
//     Input,
//     InputGroup,
//     HStack,
//     InputRightElement,
//     Stack,
//     Button,
//     Heading,
//     Text,
//     useColorModeValue,
//     Link,
// } from '@chakra-ui/react';
// // import useShowToast from "../hooks/useShowToast";
// import { useState } from 'react';
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
// import { useSetRecoilState } from 'recoil';
// import authScreenAtom from '../atoms/authAtom';
// import userAtom from '../atoms/userAtom';
// // import axios from 'axios';

// export default function SignupCard() {
//     const [showPassword, setShowPassword] = useState(false);
//     const setAuthScreen = useSetRecoilState(authScreenAtom);
//     // const showToast = useShowToast();
//     const [inputs, setInputs] = useState({
//         name: "",
//         username: "",
//         email: "",
//         password: "",
//     });
//     const setUser = useSetRecoilState(userAtom)

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setInputs({
//             ...inputs,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:3000/api/users/signup', {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': "application/json",
//                 },
//                 body: JSON.stringify(inputs),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log(data);
//             console.log('Signup successful', data);
//             localStorage.setItem('user-threads', JSON.stringify(data));
//             setUser(data)
//             setInputs({ name: "", username: "", email: "", password: "" })
//         } catch (error) {
//             console.log("There was a problem with the signup operation:", error);
//         }
//     };

//     return (
//         <Flex minH={'100vh'} align={'center'} justify={'center'}>
//             <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
//                 <Stack align={'center'}>
//                     <Heading fontSize={'4xl'} textAlign={'center'}>
//                         Sign up
//                     </Heading>
//                     <Text fontSize={'lg'} color={'gray.600'}>
//                         to enjoy all of our cool features ✌️
//                     </Text>
//                 </Stack>
//                 <Box rounded={'lg'} boxShadow={'lg'} p={8}>
//                     <Stack spacing={4}>
//                         <HStack>
//                             <Box>
//                                 <FormControl id="name" isRequired>
//                                     <FormLabel>Name</FormLabel>
//                                     <Input
//                                         type="text"
//                                         name="name"
//                                         value={inputs.name}
//                                         onChange={handleChange}
//                                     />
//                                 </FormControl>
//                             </Box>
//                             <Box>
//                                 <FormControl id="username" isRequired>
//                                     <FormLabel>Username</FormLabel>
//                                     <Input
//                                         type="text"
//                                         name="username"
//                                         value={inputs.username}
//                                         onChange={handleChange}
//                                     />
//                                 </FormControl>
//                             </Box>
//                         </HStack>
//                         <FormControl id="email" isRequired>
//                             <FormLabel>Email address</FormLabel>
//                             <Input
//                                 type="email"
//                                 name="email"
//                                 value={inputs.email}
//                                 onChange={handleChange}
//                             />
//                         </FormControl>
//                         <FormControl id="password" isRequired>
//                             <FormLabel>Password</FormLabel>
//                             <InputGroup>
//                                 <Input
//                                     type={showPassword ? 'text' : 'password'}
//                                     name="password"
//                                     value={inputs.password}
//                                     onChange={handleChange}
//                                 />
//                                 <InputRightElement h={'full'}>
//                                     <Button
//                                         variant={'ghost'}
//                                         onClick={() =>
//                                             setShowPassword((showPassword) => !showPassword)
//                                         }>
//                                         {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//                                     </Button>
//                                 </InputRightElement>
//                             </InputGroup>
//                         </FormControl>
//                         <Stack spacing={10} pt={2}>
//                             <Button
//                                 onClick={handleSubmit}
//                                 loadingText="Submitting"
//                                 size="lg"
//                                 bg={'blue.400'}
//                                 color={'white'}
//                                 _hover={{
//                                     bg: 'blue.500',
//                                 }}>
//                                 Sign up
//                             </Button>
//                         </Stack>
//                         <Stack pt={6}>
//                             <Text align={'center'}>
//                                 Already a user? <Link onClick={() => setAuthScreen('login')} color={'blue.400'}>Login</Link>
//                             </Text>
//                         </Stack>
//                     </Stack>
//                 </Box>
//             </Stack>
//         </Flex>
//     );
// }




import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const showToast = useShowToast();
    const setUser = useSetRecoilState(userAtom);

    const handleSignup = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();

            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            localStorage.setItem("user-threads", JSON.stringify(data));
            setUser(data);
            setInputs({ name: "", username: "", email: "", password: "" })
        } catch (error) {
            showToast("Error", error, "error");
        }
    };

    return (
        <Flex align={"center"} justify={"center"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                    </Heading>
                </Stack>
                <Box rounded={"lg"}
                    bg={useColorModeValue("white", "gray.dark")}
                    boxShadow={"lg"} p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Full name</FormLabel>
                                    <Input
                                        type='text'
                                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                        value={inputs.name}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        type='text'
                                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                        value={inputs.username}
                                    />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type='email'
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                value={inputs.email}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    value={inputs.password}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                                    >
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText='Submitting'
                                size='lg'
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={"white"}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}
                                onClick={handleSignup}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already a user?{" "}
                                <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
                                    Login
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
