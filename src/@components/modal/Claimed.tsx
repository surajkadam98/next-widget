import AnimationButton from "@/@components/buttons/AnimationButton";
import SocialLeaderBoard from "@/@components/common/SocialLeaderBoard";
import ModalHeader from "@/@components/modals/ModalHeader";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useAuthStore } from "@/@store/authstore";
import { handleClickCTA } from "@/@utils";

const Claimed = () => {
  const { campaign, logo } = useAPIdataStore();
  const { email: loggedInEmail } = useAuthStore();

  return (
    <div>
      <div className="z-10 p-4 flex flex-col h-[280px] py-2 -m-6 bg-widgetBg rounded-b-[30px] sm:mb-12 md:mb-16 mb-16">
        <ModalHeader
          classnames="bg-modalBackColor"
          text={"Already Claimed"}
          logo={logo}
        />
        <div className="z-20 sm:w-[200px] md:w-[220px] w-[220px] ms-auto me-auto mt-12">
          <img className="w-full h-full" src="/img/claimed.png" alt="claimed" />
        </div>
      </div>
      <div className="flex flex-col gap-6 px-2">
        <div className="text-sm font-normal text-slate-900 z-20">
          The email address <b>{loggedInEmail}</b> has already claimed this
          campaign.{" "}
        </div>

        {campaign?.unlockActionText && campaign?.unlockActionLink && (
          <AnimationButton
            text={campaign?.unlockActionText || ""}
            width="w-4/5"
            handleClick={() => handleClickCTA(campaign)}
          />
        )}
        <SocialLeaderBoard />
      </div>
    </div>
  );
};
export default Claimed;
