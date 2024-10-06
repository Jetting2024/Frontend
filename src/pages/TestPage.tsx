import React from "react";
import Schedule from "../components/Schedule";

const MainPage: React.FC = () => {
  const scheduleData = [
    {
      id: 1,
      title: "이치란 본점",
      time: "AM 10:00~ AM 11:00",
      location: "5 Chome-3-2 Nakasu, Hakata Ward, Fukuoka",
      photo: "",
    },
    {
      id: 2,
      title: "이치란 본점",
      time: "AM 10:00~ AM 11:00",
      location: "5 Chome-3-2 Nakasu, Hakata Ward, Fukuoka",
      photo: "",
    },
    {
      id: 3,
      title: "이치란 본점",
      time: "AM 10:00~ AM 11:00",
      location: "5 Chome-3-2 Nakasu, Hakata Ward, Fukuoka",
      photo: "",
    },
  ];
  return (
    <div>
      <Schedule isOwner={true} scheduleData={scheduleData} />
    </div>
  );
};

export default MainPage;
