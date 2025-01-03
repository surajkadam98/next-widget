import SubmitButton from "@/@components/buttons/SubmitButton";
import ModalHeader from "@/@components/modals/ModalHeader";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { renderCampaignRoute, shuffle } from "@/@utils";
import { useEffect, useState } from "react";
import { useModalContext } from "../context/ModalContext";

interface IAnswer {
  id: number;
  answer: string;
}

const Quiz = () => {
  const { campaign, logo, widgetProp } = useAPIdataStore();
  const { isTasksComplete, isAnswered, setIsQuizCorrect } = useWidgetAppStore();
  const { navigateModal } = useModalContext();

  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    const array = [
      { id: 1, answer: campaign?.interactiveQuestion?.cAnswer ?? "" },
      { id: 2, answer: campaign?.interactiveQuestion?.wAnswerOne ?? "" },
      { id: 3, answer: campaign?.interactiveQuestion?.wAnswerTwo ?? "" },
    ];
    setAnswers(shuffle(array));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAnswer = () => {
    setIsChecked(true);
    if (selectedAnswer === campaign?.interactiveQuestion?.cAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>
      <ModalHeader
        classnames="bg-widgetBg"
        text={widgetProp?.label?.completeQuiz || "Complete Quiz"}
        logo={logo}
      />
      <div className="flex flex-col gap-6 px-1 py-6 sm:py-3 lg:py-6">
        <div className="text-[#344860]">
          {campaign?.interactiveQuestion?.question}
        </div>
        <div className="flex flex-col gap-4">
          {answers.map((item) => (
            <>
              {item.answer && (
                <div
                  className={`py-3 px-6 border rounded-full text-[#99A3AF] cursor-pointer${
                    selectedAnswer === item.answer
                      ? "border-2 border-widgetBg"
                      : "border-[#9CA1A6]"
                  }`}
                  key={item.id}
                  onClick={() => {
                    setSelectedAnswer(item.answer);
                  }}
                >
                  <p className="truncate">{item.answer}</p>
                </div>
              )}
            </>
          ))}
        </div>
        {isChecked && (
          <div className="text-[#344860] font-semibold text-h3 ps-3">
            {isCorrect
              ? widgetProp?.label?.correctAnswer || "Correct Answer. Well Done!"
              : widgetProp?.title.unlockedWrongAnswer || "Incorrect"}
          </div>
        )}
        {!isChecked && (
          <SubmitButton
            onClick={() => {
              checkAnswer();
            }}
            active={selectedAnswer !== ""}
            title={widgetProp?.button.submit || "Submit"}
            width="w-1/2"
          />
        )}
        {isChecked && isCorrect && (
          <SubmitButton
            onClick={() => {
              setIsQuizCorrect(true);
              if (
                campaign?.additionalTasks &&
                campaign?.additionalTasks.length > 0 &&
                !isTasksComplete
              ) {
                navigateModal("/additional-tasks");
              } else if (campaign?.optionalDataId && !isAnswered) {
                navigateModal("/data-fields");
              } else navigateModal(renderCampaignRoute(campaign));
            }}
            active={true}
            title={widgetProp?.button.continueWatching || "Continue"}
            width="w-1/2"
          />
        )}
        {isChecked && !isCorrect && (
          <SubmitButton
            onClick={() => {
              setIsChecked(false);
              setSelectedAnswer("");
            }}
            active={true}
            title="Try Again"
            width="w-1/2"
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
