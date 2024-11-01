"use client";

import React, { useState } from 'react';
import { Container, Group, TextInput, NumberInput, Textarea, Button, Text, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Header } from '@/components/Header/Header';
import { ImageDrop } from '@/components/ImageDrop/ImageDrop';
import { notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    nationality: '',
    passportNumber: '',
    phoneNumber: '',
    birthDate: null,
    address: '',
    occupation: '',
    income: '',
    investmentPreference: '',
    passportImageURL: null,
  });

  const router = useRouter();

  const handleDrop = (files) => {
    console.log('Files dropped:', files);
    setForm((prev) => ({ ...prev, passportImageURL: "mockImageUrlPlaceholder" }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/enroll/investor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        notifications.show({
          title: 'Registration Sent!',
          message: 'Your registration has been submitted. Please wait for approval.',
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        console.error(result.error);
        notifications.show({
          title: 'Registration Failed',
          message: 'An error occurred during registration. Please try again.',
          color: 'red',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <Header />
      <Container size="md" my="xl">
        <Text size="xl" weight={700} mb="md">Fill your information</Text>
        <TextInput
          label="Firstname"
          placeholder="Enter your firstname"
          required
          name="firstName"
          value={form.firstName}
          onChange={handleInputChange}
        />
        <TextInput
          label="Lastname"
          placeholder="Enter your lastname"
          required
          mt="md"
          name="lastName"
          value={form.lastName}
          onChange={handleInputChange}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          required
          mt="md"
          name="email"
          value={form.email}
          onChange={handleInputChange}
        />
        <TextInput
          label="Nationality"
          placeholder="Enter your nationality"
          required
          mt="md"
          name="nationality"
          value={form.nationality}
          onChange={handleInputChange}
        />
        <TextInput
          label="Passport number"
          placeholder="Enter your passport number"
          required
          mt="md"
          name="passportNumber"
          value={form.passportNumber}
          onChange={handleInputChange}
        />
        <TextInput
          label="Phone number"
          placeholder="Enter your available phone number"
          required
          mt="md"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleInputChange}
        />
        <DateInput
          label="Birthday"
          placeholder="Enter your birthday"
          required
          mt="md"
          value={form.birthDate}
          onChange={(value) => setForm((prev) => ({ ...prev, birthDate: value }))}
        />
        <Textarea
          label="Address"
          placeholder="Enter your address"
          required
          minRows={3}
          mt="md"
          name="address"
          value={form.address}
          onChange={handleInputChange}
        />
        <TextInput
          label="Occupation"
          placeholder="Enter your current occupation"
          required
          mt="md"
          name="occupation"
          value={form.occupation}
          onChange={handleInputChange}
        />
        <NumberInput
          label="Income"
          placeholder="Enter your annual income"
          required
          mt="md"
          name="income"
          value={form.income}
          onChange={(value) => setForm((prev) => ({ ...prev, income: value }))}
        />
        <Select
          label="Investment Preference"
          placeholder="Select the industry which you are interested in for investment"
          data={['Technology', 'Health', 'Education', 'Entertainment', 'Sport', 'Game']}
          required
          mt="md"
          name="investmentPreference"
          value={form.investmentPreference}
          onChange={(value) => setForm((prev) => ({ ...prev, investmentPreference: value }))}
        />
        <ImageDrop
          onDrop={handleDrop}
          dropText='Drop your proof of net worth and passport picture here'
          descriptionText='Each file should not exceed 5MB'
        />
        <Group align={"center"} mt="xl">
          <Button color="green" onClick={handleSubmit}>
            Submit
          </Button>
        </Group>
      </Container>
    </main>
  );
}
