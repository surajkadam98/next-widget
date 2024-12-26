/* eslint-disable @next/next/no-img-element */
import { ViewFiIcon } from "@/@assets/icons/ViewFiIcon";
import ModalHeader from "@/@components/modals/ModalHeader";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="bg-[url('/img/campaign_container.png')] bg-repeat-round w-full h-screen flex items-center flex-col-reverse">
      <div className=" w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur-sm z-20">
        <div className="flex items-center justify-center h-screen sm:py-6">
          <div className="w-full sm:w-[400px] h-full sm:h-[600px] bg-white rounded-none sm:rounded-3xl p-6 pb-0 flex flex-col justify-between">
            <div className="p-4 flex flex-col h-[250px] py-2 -m-6 bg-widgetBg rounded-t-none sm:rounded-t-3xl rounded-b-3xl mb-14">
              <ModalHeader
                classnames="bg-modalBackColor"
                text="Not Found"
                logo="/img/notfound.png"
              />
              <div className="z-20 w-[264px] ms-auto me-auto">
                <img
                  className="w-full h-full"
                  src="/img/notfound.png"
                  alt="notfound"
                />
              </div>
            </div>

            <div className="z-50 flex items-center justify-between py-2 px-5 border-t border-clightdark -mx-6">
              <div className="flex justify-center text-h5 gap-1 items-center">
                Powered by
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
