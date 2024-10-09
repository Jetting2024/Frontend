import React from 'react';

interface PlanTabsProps {
    isAllPlan: boolean;
    isSharePlan: boolean;
    clickAllPlan: () => void;
    clickSharePlan: () => void;
}

const PlanTabs: React.FC<PlanTabsProps> = ({
    isAllPlan,
    isSharePlan,
    clickAllPlan,
    clickSharePlan,
    }) => {
    return (
        <div className="w-full flex flex-row gap-4 my-2">
        <button
            className={`${isAllPlan ? 'text-[#3d3d3d]' : 'text-[#d9d9d9]'}`}
            onClick={clickAllPlan}
        >
            전체 일정
        </button>
        <button
            className={`${isSharePlan ? 'text-[#3d3d3d]' : 'text-[#d9d9d9]'}`}
            onClick={clickSharePlan}
        >
            공유된 일정
        </button>
        </div>
    );
};

export default PlanTabs;
