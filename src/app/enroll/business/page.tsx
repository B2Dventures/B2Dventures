'use client';

import React, { useState } from 'react';
import { Container, TextInput, Textarea, NumberInput, Select, Button, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { DateInput } from '@mantine/dates';
import { Header } from '@/components/Header/Header';
import { ImageDrop } from '@/components/ImageDrop/ImageDrop';

export default function Home() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDrop = (files: File[]) => {
    console.log('Files dropped:', files);
  };

  return (
    <main>
      <Header />
      <Container size="md" my="xl">
        <Text align="center" size="xl" weight={700} mb="md">Fill your information</Text>
        <TextInput
          label="Business name"
          placeholder="Enter your name of business"
          required
          mt="md"
        />
        <TextInput
          label="Firstname"
          placeholder="Enter your firstname"
          required
          mt="md"
        />
        <TextInput
          label="Lastname"
          placeholder="Enter your lastname"
          required
          mt="md"
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          required
          mt="md"
        />
        <NumberInput
          label="Phone number"
          placeholder="Enter your phone number"
          required
          mt="md"
        />
        <TextInput
          label="Market capitalization"
          placeholder="Enter the market capitalization of your business "
          required
          mt="md"
        />
        <TextInput
          label="Company address"
          placeholder="Enter the address of your company"
          required
          mt="md"
        />
        <Textarea
          label="Business detail"
          placeholder="Describe your business in brief"
          required
          mt="md"
          minRows={4}
        />
        <Select
          label="Industry"
          placeholder="Select the industry which is relate to your business"
          data={['Technology', 'Health', 'Education', 'Entertainment', 'Sport', 'Game']}
          required
          mt="md"
        />
        <ImageDrop
          onDrop={handleDrop}
          dropText="Drop your business certification here"
          descriptionText="Your certification must contain number and the started date"
        />
        <Group position="center" mt="xl">
          <Button  onClick={() =>
              notifications.show({
                  title: 'Registration Sent!',
                  message: "Your registration has been submitted. Please wait for approval.",
              })
          } color="green">Submit</Button>
        </Group>
      </Container>
    </main>
  );
}
