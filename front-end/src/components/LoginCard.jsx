import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const setUser = useSetRecoilState(userAtom);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });


    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent form submission refresh
        setLoading(true);
        try {
            console.log("Starting login process...");
            const res = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log("Login successful:", data);
            // if (data.error) {
            //     showToast("Error", data.error, "error");
            //     setLoading(false);
            //     return;
            // }
            localStorage.setItem("user-threads", JSON.stringify(data));
            setUser(data);
            setInputs({
                username: "",
                password: "",
            });
            setLoading(false);
            setIsLoggedIn(true);
            navigate('/');

        } catch (error) {
            console.error("There was a problem with the login operation:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);
    return (
        <Flex align={"center"} justify={"center"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Login
                    </Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                    w={{
                        base: "full",
                        sm: "400px",
                    }}
                >
                    <Stack spacing={4}>
                        <form onSubmit={handleLogin}>
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    value={inputs.username}
                                    onChange={(e) =>
                                        setInputs((prev) => ({ ...prev, username: e.target.value }))
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={inputs.password}
                                        onChange={(e) =>
                                            setInputs((prev) => ({ ...prev, password: e.target.value }))
                                        }
                                    />
                                    <InputRightElement h={"full"}>
                                        <Button
                                            variant={"ghost"}
                                            onClick={() => setShowPassword((show) => !show)}
                                        >
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type="submit"
                                    loadingText="Logging in"
                                    size="lg"
                                    bg={useColorModeValue("gray.600", "gray.700")}
                                    color={"white"}
                                    _hover={{
                                        bg: useColorModeValue("gray.700", "gray.800"),
                                    }}
                                    isLoading={loading}
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Don&apos;t have an account?{" "}
                                <Link color={"blue.400"} onClick={() => setAuthScreen("signup")}>
                                    Sign up
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

