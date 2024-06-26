

import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const Comment = ({ reply, lastReply }) => {
    const user = useRecoilValue(userAtom);
    console.log(reply);


    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={reply.profilePic} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize='sm' fontWeight='bold'>
                            {reply.username}
                        </Text>
                    </Flex>
                    <Text>{reply.text}</Text>
                </Flex>
                
            </Flex>
            {!lastReply ? <Divider /> : null}
        </>
    );
};

export default Comment;