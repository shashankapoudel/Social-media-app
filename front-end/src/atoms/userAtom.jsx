import { atom } from "recoil";

const userAtom = atom({
    key: "userAtom",
    default: JSON.parse(localStorage.getItem("user-threads")),
});

export default userAtom;


// import { atom } from 'recoil';

// const userAtom = atom({
//     key: 'userAtom',
//     default: {
//         data: {
//             accessToken: '',
//             JSON.parse(localStorage.getItem("user-threads")),
//             // other user details
//         },
//     },
// });

// export default userAtom;



