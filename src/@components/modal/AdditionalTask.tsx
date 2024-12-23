import { DiscordPlatformIcon } from "@/@assets/icons/DiscordPlatformIcon";
import { MediumPlatformIcon } from "@/@assets/icons/MediumPlatformIcon";
import { XPlatformIcon } from "@/@assets/icons/XPlatformIcon";
import { YoutubePlatformIcon } from "@/@assets/icons/YoutubePlatformIcon";
import SubmitButton from "@/@components/buttons/SubmitButton";
import ModalHeader from "@/@components/modals/ModalHeader";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import {
  getCSSVarByName,
  openInNewWindow,
  renderCampaignRoute,
} from "@/@utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const AdditionalTasks = () => {
  const router = useRouter()
  const { campaign, logo, widgetProp } = useAPIdataStore();
  const { isAnswered, setIsTasksComplete } = useWidgetAppStore();

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [completedTasks, setCompletedTasks] = useState(
    new Array(campaign?.additionalTasks?.length).fill(false)
  );

  useEffect(() => {
    if (completedTasks.every((task) => task)) {
      setIsAllChecked(true);
    }
  }, [completedTasks]);

  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  return (
    <div>
      <ModalHeader
        classnames="bg-widgetBg"
        text={widgetProp?.label?.completeTask || "Complete Task"}
        logo={logo}
      />
      <div className="flex flex-col gap-6 px-1 py-6 sm:py-3 lg:py-6">
        <div className="text-[#344860]">
          {widgetProp?.text?.completeAction ||
            "Complete these actions by clicking on the links and completing each task"}
        </div>
        <div className="flex flex-col gap-4 text-h3 text-[#344860]">
          {campaign?.additionalTasks?.map((item, index) => (
            <div
              className={`p-1 px-2 border rounded-full cursor-pointer ${
                completedTasks[index]
                  ? "border-2 border-widgetBg"
                  : "border-[#344860]"
              } flex items-center`}
              key={index}
              onClick={(e) => {
                e.preventDefault();
                const newCompletedTasks = [...completedTasks];
                newCompletedTasks[index] = true;
                setCompletedTasks(newCompletedTasks);
                openInNewWindow(item.urlToComplete);
              }}
            >
              {item.platform === "OTHER" && (
                <div className="h-10 w-8 flex items-center">
                  <img src={item.icon} alt={item.callOut} className="w-7 h-7" />
                </div>
              )}
              {item.platform === "X" && (
                <div className="h-10 flex items-center justify-center">
                  <XPlatformIcon className="w-7 h-7" />
                </div>
              )}
              {item.platform === "DISCORD" && (
                <div className="h-10 flex items-center justify-center">
                  <DiscordPlatformIcon className="w-7 h-7" />
                </div>
              )}
              {item.platform === "MEDIUM" && (
                <div className="h-10 flex items-center justify-center">
                  <MediumPlatformIcon className="w-7 h-7" />
                </div>
              )}
              {item.platform === "YOUTUBE" && (
                <div className="h-10 flex items-center justify-center">
                  <YoutubePlatformIcon className="w-7 h-7" />
                </div>
              )}
              <div className="w-full flex justify-between items-center">
                <div
                  className={`ps-2.5 ${
                    completedTasks[index]
                      ? "text-[#02172E] font-medium truncate"
                      : "underline truncate"
                  }`}
                >
                  {item.callOut}
                </div>
                {completedTasks[index] && (
                  <div className="pe-2">
                    <svg
                      width="16"
                      height="13"
                      viewBox="0 0 13 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.2227 1.99408L10.709 0.480469L4.24181 6.94525L1.54877 4.25466L0.0351562 5.76827L4.24181 9.97493L12.2227 1.99408Z"
                        fill={widgetCurrentColor}
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <SubmitButton
          onClick={() => {
            setIsTasksComplete(true);
            if (campaign?.optionalDataId && !isAnswered) {
              router.push("/data-fields");
            } else
              router.push(
                renderCampaignRoute(
                 campaign
                )
              );
          }}
          active={isAllChecked}
          title={widgetProp?.button.continueWatching || "Continue"}
          width="w-1/2"
        />
      </div>
    </div>
  );
};

export default AdditionalTasks;
