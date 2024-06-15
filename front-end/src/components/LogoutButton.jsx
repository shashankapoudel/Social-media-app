import { Button } from '@chakra-ui/react'
// import React from 'react'
import { FiLogOut } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
// import { Navigate, useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const user = useRecoilValue(userAtom)
    const setUser = useSetRecoilState(userAtom)
    // const navigate = useNavigate()
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
            // if (!res.ok) {
            //     throw new Error(`HTTP error! status: ${res.status}`);
            // }
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


// import { Button } from "@chakra-ui/button";
// import { useSetRecoilState } from "recoil";
// import userAtom from "../atoms/userAtom";
// import { FiLogOut } from "react-icons/fi";

// const LogoutButton = () => {
//     const setUser = useSetRecoilState(userAtom);

//     const handleLogout = async () => {
//         try {
//             const token = localStorage.getItem("auth-token"); // Retrieve the auth token from local storage
//             const res = await fetch(" http://localhost:3000/api/users/logout", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     ...(token && { Authorization: `Bearer ${token}` }), // Include the token in the headers if it exists
//                 },
//             });

//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }

//             try {
//                 const data = await res.json();
//                 console.log("Logout successful", data);
//             } catch (error) {
//                 console.warn("Logout response was not JSON:", error);
//             }

//             localStorage.removeItem("user-threads");
//             setUser(null);
//         } catch (error) {
//             console.error("There was a problem with the logout operation:", error);
//         }
//     };

//     return (
//         <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
//             <FiLogOut size={20} />
//         </Button>
//     );
// };

// export default LogoutButton;


