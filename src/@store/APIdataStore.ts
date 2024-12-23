import {create} from 'zustand';

export interface CampaignState {
    id: number;
    campaignKey: string;
    name: string;
    createdDate: string;
    modifiedDate: string;
    deleted: boolean;
    state: string;
    paused: boolean;
    archived: boolean;
    starts: string;
    ends: string;
    url: string;
    overlayText: string;
    headline: string;
    displayName: string;
    type: string;
    numberOfRewards: number;
    explanation: string;
    email: null | string;
    optionalDataId: null | string;
    optionalData1: null | string;
    optionalData2: null | string;
    optionalData3: null | string;
    unlockActionLink: string;
    unlockActionText: string;
    termsAndConditions: string;
    countries: string[];
    countriesIncluded: boolean;
    completionPercentage: number;
    trackingPixel: null | string;
    crmCampaignName: null | string;
    campaignReporting: {
        id: number;
        createdDate: null | string;
        modifiedDate: string;
        analyticsEmails: null | string;
        analyticsEmailFrequency: string;
        dataEmails: null | string;
        dataEmailFrequency: string;
    };
    campaignReportingId: number;
    analyticsEmails: string[];
    analyticsEmailFrequency: string;
    dataEmailFrequency: string;
    dataEmails: string[];
    competitionDrawDate: string;
    couponCode: null | string;
    couponGroupId: null | string;
    freeformPerkExplanation: null | string;
    linkRewardLink: null | string;
    rewardGroupId: null | string;
    blockChain: null | string;
    chainId: null | number;
    smartContactAddress: null | string;
    tokenTicker: null | string;
    walletCompatability: null | string;
    gasless: boolean;
    interactiveQuestionId: null | string;
    interactiveQuestion: InteractiveQuestion | null;
    videoSource: string;
    allowReferrals: boolean;
    autoPlay: boolean;
    privacyLink: null | string;
    widgetId: number;
    senderEmail: null | string;
    emailPropId: null | string;
    nftId: null | string;
    nftTitle: null | string;
    nftDescription: null | string;
    nftUrl: null | string;
    nftAddress: null | `0x${string}`;
    nftExtension: null | string;
    transactionUrl: null | string;
    marketplaceUrl: null | string;
    metakeepEnabled: boolean;
    showFacebookLogin: boolean;
    showGoogleLogin: boolean;
    showEmailLogin: boolean;
    additionalTasks: null | AdditionalTask[];
    automatedEmailSending: boolean;
    accountId: number;
    organizationId: number;
    opengraph: {
        id: number;
        imageUrl: string;
        imageWidth: number;
        imageHeight: number;
        createdDate: string;
        modifiedDate: string;
    };
    successImage: string;
    sendedMailForEndedCampaign: boolean;
    playerControls: boolean;
    robloxImageTitle?: string;
    robloxImageUrl?: string;
    widgetColor?: string;
}

export interface WidgetPropState {
    id: number;
    widgetPropKey: string;
    name: string;
    organizationId: string;
    userId: string;
    text: Record<string, string>;
    warning: Record<string, string>;
    title: Record<string, string>;
    button: Record<string, string>;
    label: Record<string, string>;
    link: Record<string, string>;
    createdDate: string;
    modifiedDate: string;
    hideViewfiLogo: boolean;
}

export interface InteractiveQuestion {
    id: number;
    question: string;
    cAnswer: string;
    wAnswerOne: string;
    wAnswerTwo: string;
    createdDate: null | string;
    modifiedDate: string;
}

export interface AdditionalTask {
    id: number;
    callOut: string;
    urlToComplete: string;
    platform: string;
    icon: string;
    createdDate: null | string;
    modifiedDate: string;
    clicked: boolean;
}

export interface APIdataState {
    campaign: CampaignState | null;
    viewerId: string;
    permission: string;
    sharingUrl: string;
    brandDomain: string;
    logo: string;
    brand: string;
    trackerUrl: null | string;
    widgetProp: WidgetPropState | null;
    extraDomain: null | string;
    extraDomainStatus: string;
}

interface APIdataStore extends APIdataState {
    updateData: (data: Partial<APIdataState>) => void;
}

export const useAPIdataStore = create<APIdataStore>((set) => ({
    campaign: null,
    viewerId: "",
    permission: "",
    sharingUrl: "",
    brandDomain: "",
    logo: "",
    brand: "",
    trackerUrl: null,
    widgetProp: null,
    extraDomain: null,
    extraDomainStatus: "",

    updateData: (data) =>
        set((state) => ({
            ...state,
            ...data,
        })),
}));

