import { LeaderBoard } from '@/@components/LeaderBoard';
import React from 'react';

interface ILeaderBoardProps {
  id: string;
}

const CampaignPage: React.FC<ILeaderBoardProps> = ({ id }) => {
  return (
    <LeaderBoard campaignKey={id}  />
  );
};

export default CampaignPage;

export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;

  return {
    props: {
      id,
    },
  };
}
