import { useState } from "react";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import copy from "copy-text-to-clipboard";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import { XIcon } from "@/@assets/icons/XIcon";
import { FacebookIcon } from "@/@assets/icons/FacebookIcon";
import { LinkIcon } from "@/@assets/icons/LinkIcon";
import { MailIcon } from "@/@assets/icons/MailIcon";

const SocialSharing = () => {
  const { campaign, widgetProp } = useAPIdataStore();
  const { sharingUrl } = useWidgetAppStore();
  const [isXHovered, setIsXHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isMailHovered, setIsMailHovered] = useState(false);
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);

  return (
    <div className="hover-container me-4 mb-2 w-full">
      <div className="bg-[#EFF1F7] rounded-full p-2 text-center text-sm hover-hide">
        {widgetProp?.link.referralVideo || "Referral video link"}
      </div>
      <div className="flex gap-1 hover-show">
        <div className="rounded-l-full p-3 text-xs bg-[#EFF1F7]">Share</div>
        <TwitterShareButton url={sharingUrl} title={campaign?.overlayText}>
          <div
            className="p-2 bg-[#EFF1F7] hover:bg-widgetBg rounded-md"
            onMouseEnter={() => setIsXHovered(true)}
            onMouseLeave={() => setIsXHovered(false)}
          >
            <XIcon
              className={`${isXHovered ? "fill-white" : "fill-[#344860]"}`}
            />
          </div>
        </TwitterShareButton>

        <FacebookShareButton url={sharingUrl}>
          <div
            className="p-2 bg-[#EFF1F7] hover:bg-widgetBg rounded-md"
            onMouseEnter={() => setIsFacebookHovered(true)}
            onMouseLeave={() => setIsFacebookHovered(false)}
          >
            <FacebookIcon
              className={`${
                isFacebookHovered ? "fill-white" : "fill-[#344860]"
              }`}
            />
          </div>
        </FacebookShareButton>

        <div
          className="p-2 bg-[#EFF1F7] hover:bg-widgetBg rounded-md"
          onMouseEnter={() => setIsLinkHovered(true)}
          onMouseLeave={() => setIsLinkHovered(false)}
          onClick={() => copy(sharingUrl ?? "")}
        >
          <LinkIcon
            className={`${isLinkHovered ? "fill-white" : "fill-[#344860]"}`}
          />
        </div>

        <EmailShareButton
          url={sharingUrl}
          subject={campaign?.overlayText}
          openShareDialogOnClick
        >
          <div
            className="p-2 bg-[#EFF1F7] hover:bg-widgetBg rounded-r-full"
            onMouseEnter={() => setIsMailHovered(true)}
            onMouseLeave={() => setIsMailHovered(false)}
          >
            <MailIcon
              className={`${isMailHovered ? "fill-white" : "fill-[#344860]"}`}
            />
          </div>
        </EmailShareButton>
      </div>
    </div>
  );
};

export default SocialSharing;
