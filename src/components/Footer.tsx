// Footer component for branding and credits

'use client';

import styled from 'styled-components';

const Wrapper = styled.footer`
  padding: 2rem;
  background: #f1f1f1;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
`;

export default function Footer() {
  return <Wrapper>© 2025 EduFund. Built with 💙 for students, by students.</Wrapper>;
}
