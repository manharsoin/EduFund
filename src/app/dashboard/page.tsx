'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 960px;
  margin: 4rem auto;
  padding: 0 1rem;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2563eb;
  text-align: center;
  position: relative;
  margin-bottom: 2rem;
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #9333ea);
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
`;

const Box = styled(motion.div)`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  font-size: 1.1rem;
  color: #374151;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 35px rgba(37, 99, 235, 0.2);
  }
`;

const Skeleton = styled.div`
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
  border-radius: 8px;
  height: 120px;

  @keyframes shimmer {
    0% {
      background-position: -400% 0;
    }
    100% {
      background-position: 400% 0;
    }
  }
`;

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Container>
      <Heading>🎯 Your Dashboard</Heading>

      {loading ? (
        <Skeleton />
      ) : (
        <Box
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          No campaigns yet. Once you create one, they’ll appear here.
        </Box>
      )}
    </Container>
  );
}
