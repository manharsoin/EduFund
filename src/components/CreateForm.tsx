'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 720px;
  margin: 3rem auto;
  padding: 0 1rem;
`;

const Heading = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  min-height: 120px;
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #1e40af;
  }
`;

export default function CreateForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [target, setTarget] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, desc, target });
  };

  return (
    <Container>
      <Heading>Create a New Campaign</Heading>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Campaign Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Target Amount (ETH)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
        />
        <Button type="submit">Publish Campaign</Button>
      </Form>
    </Container>
  );
}
