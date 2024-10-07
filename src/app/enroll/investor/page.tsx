"use client";

import React, { useState } from 'react';
import { Container, Group, TextInput, Textarea, Button, Text, Select } from '@mantine/core';
import { Header } from '@/components/Header/Header';
import { ImageDrop } from '@/components/ImageDrop/ImageDrop';
import { notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';

export default function Home() {
  const handleDrop = (files: File[]) => {
    console.log('Files dropped:', files);
  };

  return (
    <main>
      <Header />
      <Container size="md" my="xl">
        <Text align="center" size="xl" weight={700} mb="md">Fill your information</Text>
        <TextInput
          label="Firstname"
          placeholder="Enter your firstname"
          required
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
        <TextInput
          label="Nationality"
          placeholder="Enter your nationality"
          required
          mt="md"
        />
        <TextInput
          label="Passport number"
          placeholder="Enter your passport number"
          required
          mt="md"
        />
        <TextInput
          label="Phone number"
          placeholder="Enter your available phone number"
          required
          mt="md"
        />
        <TextInput
          label="Birthdate"
          placeholder="DD/MM/YYYY"
          required
          mt="md"
        />
        <Textarea
          label="Address"
          placeholder="Enter your address"
          required
          minRows={3}
          mt="md"
        />
        <TextInput
          label="Occupation"
          placeholder="Enter your current occupation"
          required
          mt="md"
        />
        <TextInput
          label="Income"
          placeholder="Enter your monthly income"
        />
       <Select
          label="Category"
          placeholder="Select a category"
          data={['Technology', 'Health', 'Education', 'Entertainment', 'Sport', 'Game']}
          required
          mt="md"
        />
        <ImageDrop
          onDrop={handleDrop}
          dropText='Drop your proof of networth and passport picture here'
          descriptionText='Each file should not exceed 5mb'
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
