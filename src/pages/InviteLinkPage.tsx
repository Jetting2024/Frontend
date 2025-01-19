import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PendingAccessModal from "../components/modals/PendingAccessModal";
import { Client } from "@stomp/stompjs";

const InviteLinkPage: React.FC = () => {
  return (
    <div className=" w-full h-[calc(100vh-56px)] flex items-center justify-center">
      <PendingAccessModal />
    </div>
  );
};

export default InviteLinkPage;
