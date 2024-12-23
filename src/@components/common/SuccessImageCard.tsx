import { useAPIdataStore } from "@/@store/APIdataStore";
import ModalHeader from "../modals/ModalHeader";
import { getCSSVarByName } from "@/@utils";

interface SuccessImageCardProps {
  text: string;
  displaySuccessImage?: boolean;
}

const SuccessImageCard: React.FC<SuccessImageCardProps> = ({
  text,
  displaySuccessImage = true,
}) => {
  const { campaign, logo } = useAPIdataStore();

  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  let bg: { backgroundImage?: string; background?: string } = {};
  if (displaySuccessImage) {
    bg.backgroundImage = `url(${campaign?.successImage})`;
  } else {
    bg.background = widgetCurrentColor;
  }

  return (
    <>
      {campaign?.successImage || !displaySuccessImage ? (
        <div
          className="z-10 p-4 flex flex-col justify-between min-h-[280px] py-2 -m-6 bg-repeat-round rounded-b-[30px] mb-2"
          style={{
            ...bg,
          }}
        >
          <ModalHeader classnames="bg-modalBackColor" text={text} logo={logo} />
        </div>
      ) : (
        <div className="z-10 flex flex-col justify-between min-h-[280px]">
          <div className="bg-widgetBg h-[220px] bg-repeat-round rounded-b-[30px] p-4  py-2 -m-6  mb-2">
            <ModalHeader
              classnames="bg-modalBackColor"
              text={text}
              logo={logo}
            />
            <div className="z-20 w-[220px] ms-auto me-auto">
              <img
                className="w-full h-full"
                src="/img/success.png"
                alt="success"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessImageCard;
