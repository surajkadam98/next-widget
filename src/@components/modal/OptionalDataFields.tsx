import SubmitButton from "@/@components/buttons/SubmitButton";
import ModalHeader from "@/@components/modals/ModalHeader";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useOptionalDataStore } from "@/@store/optionalDataStore";
import { useWidgetAppStore } from "@/@store/widgetStore";
import { getCSSVarByName, renderCampaignRoute } from "@/@utils";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const defaultData = {
  optionalData1: "",
  optionalData2: "",
  optionalData3: "",
};

const OptionalDataFields = () => {
  const router = useRouter()
  const { campaign, logo, widgetProp } = useAPIdataStore();
  const { setIsAnswered } = useWidgetAppStore();
  const { setOptionalData } = useOptionalDataStore();

  // Local state for inputs
  const [formData, setFormData] = useState({ ...defaultData });
  const [isAllAnswered, setIsAllAnswered] = useState<boolean>(false);

  // check if all fields are answered. remember that the fields are optional.
  useEffect(() => {
    if (
      (!campaign?.optionalData1 || formData.optionalData1) &&
      (!campaign?.optionalData2 || formData.optionalData2) &&
      (!campaign?.optionalData3 || formData.optionalData3)
    ) {
      setIsAllAnswered(true);
    } else {
      setIsAllAnswered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Function to handle changes in the input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update state in an immutable way
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setOptionalData(formData);
    setIsAnswered(true);
    router.push(renderCampaignRoute(campaign));
  };

  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  const inputClass =
    "py-3 pl-6 pr-8 border w-full border-[#9CA1A6] rounded-full text-[#344860] focus:border-2 focus:border-widgetBg focus:outline-none";
  const iconClass = "absolute right-[12px] top-[18px]";

  return (
    <div>
      <ModalHeader
        classnames="bg-widgetBg"
        text={widgetProp?.title.answerThisQuestion || "Answer Questions"}
        logo={logo}
      />
      <div className="flex flex-col gap-6 px-1 py-6 sm:py-3 lg:py-6">
        <div className="text-[#344860]">
          {widgetProp?.title.optionalQuestions ||
            "First, please answer the following:"}
        </div>
        <div className="flex flex-col gap-4">
          {campaign?.optionalData1 && (
            <div className="relative">
              <input
                type="text"
                className={inputClass}
                placeholder={campaign?.optionalData1}
                name="optionalData1"
                value={formData.optionalData1}
                onChange={handleInputChange}
              />
              {formData.optionalData1 && (
                <div className={iconClass}>
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
          )}
          {campaign?.optionalData2 && (
            <div className="relative">
              <input
                type="text"
                className={inputClass}
                placeholder={campaign?.optionalData2}
                name="optionalData2"
                value={formData.optionalData2}
                onChange={handleInputChange}
              />
              {formData.optionalData2 && (
                <div className={iconClass}>
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
          )}
          {campaign?.optionalData3 && (
            <div className="relative">
              <input
                type="text"
                className={inputClass}
                placeholder={campaign?.optionalData3}
                name="optionalData3"
                value={formData.optionalData3}
                onChange={handleInputChange}
              />
              {formData.optionalData3 && (
                <div className={iconClass}>
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
          )}
        </div>
        <SubmitButton
          onClick={handleSubmit}
          active={isAllAnswered}
          title={widgetProp?.button.continueWatching || "Continue"}
          width="w-1/2"
        />
      </div>
    </div>
  );
};

export default OptionalDataFields;
