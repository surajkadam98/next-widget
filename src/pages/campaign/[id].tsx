import { APIdataState } from '@/@store/APIdataStore';
import Home from '@features/home';
import React from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
interface CampaignPageProps {
  id: string;
  campaignDetails: APIdataState;
}

const CampaignPage: React.FC<CampaignPageProps> = ({ id, campaignDetails }) => {
  return (
    <Home campaignId={id} cammpaignData={campaignDetails} />
  );
};

export default CampaignPage;

// Server-side rendering to fetch the `id` parameter
export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;

  // You can use `id` to fetch campaign details, e.g.:
  const response = await fetch(`${BASE_URL}/node/campaign/${id}`);
  const campaignDetails = await response.json();
  return {
    props: {
      id, // Pass `id` as a prop to the page component
      campaignDetails,
    },
  };
}