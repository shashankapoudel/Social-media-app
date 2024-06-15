

import { useState } from 'react';

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
        console.log(file);
    };

    return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
