import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PlanList from "../components/plan/PlanList";
import PlaceList from "../components/place/PlaceList";
import TabButton from "../components/TabButton";
import PlanTabs from "../components/PlanTabs";

const MyPlanListPage: React.FC = () => {
  const [isMyPlan, setIsMyPlan] = useState(true);
  const [isMyPlace, setIsMyPlace] = useState(false);
  const [isAllPlan, setIsAllPlan] = useState(true);
  const [isSharePlan, setIsSharePlan] = useState(false);

  const clickMyPlan = () => {
    setIsMyPlan(true);
    setIsMyPlace(false);
  };

  const clickMyPlace = () => {
    setIsMyPlace(true);
    setIsMyPlan(false);
  };

  const clickAllPlan = () => {
    setIsAllPlan(true);
    setIsSharePlan(false);
  };

  const clickSharePlan = () => {
    setIsSharePlan(true);
    setIsAllPlan(false);
  };

  return (
    <div className="w-full h-screen relative">
      <Navbar />

      <div className="w-full h-auto flex justify-center items-center bg-white sticky top-24 z-10">
        <div className="w-1/2 mx-auto flex items-center">
          <TabButton
            label="나의 여행"
            isActive={isMyPlan}
            onClick={clickMyPlan}
          />
          <TabButton
            label="나의 장소"
            isActive={isMyPlace}
            onClick={clickMyPlace}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="w-full h-5/6 flex flex-col items-center my-4 overflow-y-auto scrollbar-hide">
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto h-full flex flex-col items-center">
          {isMyPlan ? (
            <div className="w-full flex flex-col">
              <div className="text-[1.6rem] font-bold mt-8">나의 여행</div>

              <PlanTabs
                isAllPlan={isAllPlan}
                isSharePlan={isSharePlan}
                clickAllPlan={clickAllPlan}
                clickSharePlan={clickSharePlan}
              />

              <div className="">
                {isAllPlan && <PlanList />}
                {isAllPlan && <PlanList />}
                {isAllPlan && <PlanList />}
                {isAllPlan && <PlanList />}
                {isAllPlan && <PlanList />}
                {isAllPlan && <PlanList />}
                {isAllPlan && <PlanList />}
                {isAllPlan && <PlanList />}
                {isAllPlan && <PlanList />}
                {isSharePlan && <PlanList />}
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col">
              <div className="text-[1.6rem] font-bold mt-8">나의 장소</div>
              {/* Responsive grid layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
                <PlaceList />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPlanListPage;
