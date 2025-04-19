'use client';

import styled from 'styled-components';
import Link from 'next/link';

interface Campaign {
  id: string;
  title: string;
  description: string;
  target: string;
}

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  color: #2b6cb0;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1rem;
`;

const Target = styled.span`
  font-weight: bold;
  color: #2b6cb0;
`;

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Link href={`/campaigns/${campaign.id}`} passHref>
      <Card>
        <Title>{campaign.title}</Title>
        <Description>{campaign.description}</Description>
        <Target>Target: {campaign.target}</Target>
      </Card>
    </Link>
  );
}
