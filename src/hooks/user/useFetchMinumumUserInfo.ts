import api from "@/apis/axios"; 

export const fetchMinimumUserInfo = async () => {
    const res = await api.get("/users/me/minimum");

    return {
        nickname: res.data.data.nickname,
        profileImage: res.data.data.profileImage,
        userType: res.data.data.type,
        gender: res.data.data.gender,
        birthDate: res.data.data.birthDate,
        onboarded: res.data.data.onboarded,
    };
};
