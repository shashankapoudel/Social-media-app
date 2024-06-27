import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postsAtom from "../atoms/postsAtom";
import { useNavigate, useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast.jsx";
import { useState } from "react";

const Comment = ({ reply, lastReply }) => {
    const user = useRecoilValue(userAtom);
    console.log(reply);
    const post = useRecoilValue(postsAtom)
    console.log(post);
    const pid = useParams();
    console.log(pid.pid);
    const showToast = useShowToast();
    const [replies, setReplies] = useState([])
    console.log(replies);
    const navigate = useNavigate()

    const handleDeleteReply = async () => {
        const token = user?.data.accessToken
        console.log(token);
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${pid.pid}/reply/${reply._id}`, {

                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json();
            console.log(data);
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            setReplies(prevReplies => prevReplies.filter(r => r._id !== reply._id))
            showToast("Success", "reply deleted", "success");
            navigate('/')
        } catch (error) {
            showToast("Error", error.message, "error");
        }


    }


    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={reply.profilePic} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize='sm' fontWeight='bold'>
                            {reply.username}
                        </Text>
                        {user?.data.user._id === reply?.userId && (


                            <DeleteIcon size={20} cursor={"pointer"} onClick={handleDeleteReply} />
                        )
                        }
                    </Flex>
                    <Text>{reply.text}</Text>
                </Flex>

            </Flex>
            {!lastReply ? <Divider /> : null}
        </>
    );
};

export default Comment;