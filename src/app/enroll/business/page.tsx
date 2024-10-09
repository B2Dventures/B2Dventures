'use client';

import React, { useState } from 'react';
import { Container, TextInput, Textarea, NumberInput, Select, Button, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { useRouter } from 'next/navigation';
import { DateInput } from '@mantine/dates';
import { Header } from '@/components/Header/Header';
import { ImageDrop } from '@/components/ImageDrop/ImageDrop';

export default function Home() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const router = useRouter();
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
          label="Founder Firstname"
          placeholder="Enter firstname of business founder"
          required
          mt="md"
        />
        <TextInput
          label="Founder Lastname"
          placeholder="Enter lastname of business founder"
          required
          mt="md"
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          required
          mt="md"
        />
        <TextInput
          label="Phone number"
          placeholder="Enter your phone number"
          required
          mt="md"
        />
        <NumberInput
          label="Market capitalization"
          placeholder="Enter the market capitalization of your business "
          required
          mt="md"
        />
        <Textarea
          label="Company address"
          placeholder="Enter the address of your company"
          required
          mt="md"
          minRows={4}
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
          dropText="Drop your certification of business registration here"
          descriptionText="Your certification must contain number and the started date.
          Each file should not exceed 5mb"
        />
        <Group position="center" mt="xl">
            <Button  color="green" onClick={() => {
                notifications.show({
                    title: 'Registration Sent!',
                    message: "Your registration has been submitted. Please wait for approval.",
                });

                setTimeout(() => {
                    window.location.href = '/';
                }, 2000); // Optional delay (2 seconds) before redirecting
            }}>
                Submit
            </Button>
        </Group>
      </Container>
    </main>
  );
}
