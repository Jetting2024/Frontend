import axios from "axios";

export const fetchMessages = async (roomId: number, token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/chat/${roomId}/getMessages`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.result || [];
  } catch (err) {
    console.error("Error fetching messages:", err);
    return [];
  }
};

export const fetchChatInfo = async (roomId: number, token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/chat/info/${roomId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const updatedMembers = response.data.result.members.map((member: any) => ({
      ...member,
      name: member.name ?? "익명 유저",
    }));

    return {
      roomName: response.data.result.roomName,
      members: updatedMembers.map((m: any) => m.name).join(", "),
    };
  } catch (err) {
    console.error("Error fetching chat info:", err);
    return { roomName: "", members: "" };
  }
};
