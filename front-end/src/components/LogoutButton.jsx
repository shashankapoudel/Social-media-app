import { Button } from '@chakra-ui/react'

import { FiLogOut } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';


const LogoutButton = () => {
    const user = useRecoilValue(userAtom)
    const setUser = useSetRecoilState(userAtom)
    console.log(user);

    const handleLogout = async () => {
        const token = user.data.accessToken;
        console.log(token);
        try {

            const res = await fetch('http://localhost:3000/api/users/logout', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                // body: JSON.stringify(inputs),

            })
       
            const data = await res.json();
            console.log(data);
            localStorage.removeItem('user-threads')
            setUser(null)
            // Navigate('/login')

        } catch (error) {
            console.log('error');


        }

    }
    return (
        <Button

            position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
            <FiLogOut size={20}
                onClick={handleLogout} />
        </Button>
    )
}

export default LogoutButton

