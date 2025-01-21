import axios from "axios"

export const generateInvitation = async (travelId: number): Promise<string> => {
    const response = await axios.post(`http://localhost:8080/invite/${travelId}/invitation`);
    console.log(response.data.result);
    return response.data.result;
};

// export const respondToInvite = async (
//     travelId: number | undefined,
//     inviteeId: number | undefined,
//     status: string | undefined,
//     accessToken: string | undefined,
// ): Promise<string> => {
    
//     const response = await axios.post(
//         `http://localhost:8080/invite/${travelId}/${inviteeId}/response?status=${status}`, {}, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         }
//     );
//     return response.data.result;
// }