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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [income, setIncome] = useState('');
  const [investmentPreference, setInvestmentPreference] = useState('');
  const [passportImageURL, setPassportImageURL] = useState(null);

  const router = useRouter();

  const handleDrop = (files) => {
    console.log('Files dropped:', files);
    setPassportImageURL("mockImageUrlPlaceholder");
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/investorEnroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          nationality,
          passportNumber,
          phoneNumber,
          birthDate,
          address,
          occupation,
          income,
          investmentPreference,
          passportImageURL,
        }),
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
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <TextInput
          label="Lastname"
          placeholder="Enter your lastname"
          required
          mt="md"
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          required
          mt="md"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <TextInput
          label="Nationality"
          placeholder="Enter your nationality"
          required
          mt="md"
          value={nationality}
          onChange={(event) => setNationality(event.currentTarget.value)}
        />
        <TextInput
          label="Passport number"
          placeholder="Enter your passport number"
          required
          mt="md"
          value={passportNumber}
          onChange={(event) => setPassportNumber(event.currentTarget.value)}
        />
        <TextInput
          label="Phone number"
          placeholder="Enter your available phone number"
          required
          mt="md"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.currentTarget.value)}
        />
        <DateInput
          label="Birthday"
          placeholder="Enter your birthday"
          required
          mt="md"
          value={birthDate}
          onChange={setBirthDate}
        />
        <Textarea
          label="Address"
          placeholder="Enter your address"
          required
          minRows={3}
          mt="md"
          value={address}
          onChange={(event) => setAddress(event.currentTarget.value)}
        />
        <TextInput
          label="Occupation"
          placeholder="Enter your current occupation"
          required
          mt="md"
          value={occupation}
          onChange={(event) => setOccupation(event.currentTarget.value)}
        />
        <NumberInput
          label="Income"
          placeholder="Enter your annual income"
          required
          mt="md"
          value={income}
          onChange={setIncome}
        />
        <Select
          label="Investment Preference"
          placeholder="Select the industry which you are interested in for investment"
          data={['Technology', 'Health', 'Education', 'Entertainment', 'Sport', 'Game']}
          required
          mt="md"
          value={investmentPreference}
          onChange={setInvestmentPreference}
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
