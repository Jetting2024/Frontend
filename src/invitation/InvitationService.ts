import axios from "axios"

export const generateInvitation = async (travelId: number): Promise<string> => {
    const response = await axios.post(`http://localhost:8080/invite/${travelId}/invitation`);
    console.log(response.data.result);
    return response.data.result;
};

export const respondToInvite = async (
    travelId: number,
    invitation: string,
    accept: boolean,
    accessToken: string,
): Promise<string> => {
    
    const response = await axios.post(
        `http://localhost:8080/invite/${travelId}/${invitation}/response?status=${accept}`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    return response.data.result;
}