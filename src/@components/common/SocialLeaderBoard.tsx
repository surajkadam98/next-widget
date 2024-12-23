import { useAPIdataStore } from "@/@store/APIdataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { openInNewTab } from "@/@utils";
import Button from "../buttons/Button";
import SocialSharing from "./SocialSharing";

const SocialLeaderBoard = () => {
  const { campaign } = useAPIdataStore();
  const { leaderboardUrl } = useWidgetAppStore();

  return (
    <>
      {campaign?.allowReferrals ? (
        <div className="flex justify-between pe-4 relative pt-2">
          <SocialSharing />
          <div
            className="bg-[#EFF1F7] p-[10px] h-fit min-w-10 rounded-full duration-300 cursor-pointer peer"
            onClick={() => openInNewTab(leaderboardUrl)}
          >
            <img
              src="/img/star-trophy.png"
              className="max-w-5 h-5"
              alt="start-trophy"
            />
          </div>
          <div className="bg-black/40 px-2 rounded text-white absolute right-0 bottom-full z-50 text-sm mb-1 opacity-0 peer-hover:opacity-100 duration-300">
            Open LeaderBoard
          </div>
        </div>
      ) : (
        <Button
          text="Browse Leaderboard"
          classnames={`w-[90%] mb-2 ${campaign?.allowReferrals && ""}`}
          handleClick={() => openInNewTab(leaderboardUrl)}
        />
      )}
    </>
  );
};

export default SocialLeaderBoard;
