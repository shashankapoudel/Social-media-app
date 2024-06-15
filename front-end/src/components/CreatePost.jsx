import { AddIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, FormControl, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg'
import { BsFillImageFill } from 'react-icons/bs'
import { useRecoilValue } from 'recoil'
import userAtom from "../atoms/userAtom"
import Cookies from 'js-cookie';

const MAX_CHAR = 500;

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
    const imageRef = useRef(null)
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR)
    const user = useRecoilValue(userAtom)
    const [loading, setLoading] = useState(false)
    const [postText, setPostText] = useState('')

    // console.log(imgUrl);



    const handleTextChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length > MAX_CHAR) {
            const truncatedText = inputText.slice(0, MAX_CHAR);
            setPostText(truncatedText);
            setRemainingChar(0);

        } else {
            setPostText(inputText)
            setRemainingChar(MAX_CHAR - inputText.length)
        }


    }
    const handleCreatePost = async () => {
        setLoading(true)
        console.log("Bearer " + user.data.accessToken, 'This is users')

        const token = user.data.accessToken


        // const token = Cookies.get('token');
        console.log(token);
        // let imageBase64 = '';
        // if (imageRef.current && imageRef.current.files[0]) {
        //     try {
        //         imageBase64 = await convertToBase64(imageRef.current.files[0]);
        //     } catch (error) {
        //         console.error("Error converting image to Base64:", error);
        //         setLoading(false);
        //         return;
        //     }
        // }


        try {

            console.log("wewwewe");
            const res = await fetch('http://localhost:3000/api/posts/createpost',
                {
                    method: "POST",
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,

                    },
                    body: JSON.stringify({ postedBy: user.data.user._id, text: postText, img: imgUrl })
                });
            console.log(res);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json()
            if (data.error) {
                console.log("Error", data.error, "error");
                return
            }
            console.log("Success", "Post created successfully");
            onClose()
            setPostText("");
            setImgUrl("");
        } catch (error) {
            console.log("3333");

            console.log("There was a problem while creating post:", error);
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            <Button
                position={"fixed"}
                bottom={10}
                right={10}
                leftIcon={<AddIcon />}
                bg={useColorModeValue("gray.300", "gray.dark")}
                onClick={onOpen}



            >
                Post
            </Button >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea
                                placeholder='Your Content'
                                onChange={handleTextChange}
                                value={postText}
                            />
                            <Text fontSize={"xs"} fontWeight={"bold"} textAlign={"right"} m={"1"} color={"gray.800"}
                            >{remainingChar} / {MAX_CHAR}</Text>
                            <input
                                type='file'
                                hidden
                                ref={imageRef}
                                onChange={handleImageChange}
                            />
                            <BsFillImageFill
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                size={16}
                                onClick={() => imageRef.current.click()}
                            />
                        </FormControl>

                        {imgUrl && (
                            <Flex mt={5} w={"full"} position={"relative"} >
                                <Image
                                    src={imgUrl} />
                                <CloseButton
                                    onClick={() => { setImgUrl(""); }}
                                    bg={"gray.800"}
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                />


                            </Flex>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreatePost}
                            isLoading={loading}
                        >
                            Post
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost



// import { AddIcon } from '@chakra-ui/icons';
// import { Button, CloseButton, Flex, FormControl, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react';
// import React, { useRef, useState } from 'react';
// import usePreviewImg from '../hooks/usePreviewImg';
// import { BsFillImageFill } from 'react-icons/bs';
// import { useRecoilValue } from 'recoil';
// import userAtom from "../atoms/userAtom";
// import axios from 'axios';

// const MAX_CHAR = 500;

// const CreatePost = () => {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
//     const imageRef = useRef(null);
//     const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
//     const user = useRecoilValue(userAtom);
//     const [loading, setLoading] = useState(false);
//     const [postText, setPostText] = useState('');

//     const handleTextChange = (e) => {
//         const inputText = e.target.value;
//         if (inputText.length > MAX_CHAR) {
//             const truncatedText = inputText.slice(0, MAX_CHAR);
//             setPostText(truncatedText);
//             setRemainingChar(0);
//         } else {
//             setPostText(inputText);
//             setRemainingChar(MAX_CHAR - inputText.length);
//         }
//     };

//     const handleCreatePost = async () => {
//         setLoading(true);
//         const token = localStorage.getItem('token');

//         try {
//             console.log("Creating post...");
//             const res = await axios.post(
//                 'http://localhost:3000/api/posts/createpost',
//                 { postedBy: user.data.user._id, text: postText },
//                 { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } }
//             );
//             console.log(res);

//             if (res.data.error) {
//                 console.log("Error", res.data.error, "error");
//                 return;
//             }

//             console.log("Success", "Post created successfully");
//             onClose();
//             setPostText("");
//             setImgUrl("");
//         } catch (error) {
//             console.log("There was a problem while creating post:", error);
//             if (error.response) {
//                 console.error('Error response:', error.response.data);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <Button
//                 position={"fixed"}
//                 bottom={10}
//                 right={10}
//                 leftIcon={<AddIcon />}
//                 bg={useColorModeValue("gray.300", "gray.dark")}
//                 onClick={onOpen}
//             >
//                 Post
//             </Button>
//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Create Post</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody pb={6}>
//                         <FormControl>
//                             <Textarea
//                                 placeholder='Your Content'
//                                 onChange={handleTextChange}
//                                 value={postText}
//                             />
//                             <Text fontSize={"xs"} fontWeight={"bold"} textAlign={"right"} m={"1"} color={"gray.800"}>
//                                 {remainingChar} / {MAX_CHAR}
//                             </Text>
//                             <input
//                                 type='file'
//                                 hidden
//                                 ref={imageRef}
//                                 onChange={handleImageChange}
//                             />
//                             <BsFillImageFill
//                                 style={{ marginLeft: "5px", cursor: "pointer" }}
//                                 size={16}
//                                 onClick={() => imageRef.current.click()}
//                             />
//                         </FormControl>

//                         {imgUrl && (
//                             <Flex mt={5} w={"full"} position={"relative"}>
//                                 <Image src={imgUrl} />
//                                 <CloseButton
//                                     onClick={() => { setImgUrl(""); }}
//                                     bg={"gray.800"}
//                                     position={"absolute"}
//                                     top={2}
//                                     right={2}
//                                 />
//                             </Flex>
//                         )}
//                     </ModalBody>

//                     <ModalFooter>
//                         <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
//                             Post
//                         </Button>
//                         <Button variant='ghost' onClick={onClose}>Cancel</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// };

// export default CreatePost;
