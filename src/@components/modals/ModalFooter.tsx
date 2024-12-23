import { openInNewTab } from "@/@utils";
import { ViewFiIcon } from "@/@assets/icons/ViewFiIcon";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useRouter } from "next/router";
import Link from "next/link";

const ModalFooter = () => {
  const router = useRouter()
  const { campaign, widgetProp } = useAPIdataStore();

  const handleClickTC = () => {
    router.push("/terms");
  };

  return (
    <div
      className="z-50 flex items-center justify-between bg-white py-2 px-5 border-t border-clightdark ml-[-24px]"
      style={{ width: "calc(100% + 48px)" }}
    >
      <div className="flex justify-center text-h5 gap-1 items-center">
        {widgetProp?.text.poweredBy || "Powered by"}
        {!widgetProp?.hideViewfiLogo && (
          <div className="flex gap-1 items-center">
            <ViewFiIcon width={14} />
            <Link
              className="underline text-[#00277A]"
              href={"https://www.viewfi.io/privacy-policy/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              ViewFi
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center text-[10px] text-gray-500 space-x-3">
        <p
          className="font-normal underline leading-snug flex flex-row-reverse cursor-pointer"
          onClick={handleClickTC}
        >
          {widgetProp?.label?.campaignTerms || "Campaign terms"}
        </p>
        <p
          className="underline cursor-pointer"
          onClick={() => openInNewTab(campaign?.privacyLink || "")}
        >
          {widgetProp?.label?.privacyPolicy || "Privacy Policy"}
        </p>
      </div>
    </div>
  );
};

export default ModalFooter;
