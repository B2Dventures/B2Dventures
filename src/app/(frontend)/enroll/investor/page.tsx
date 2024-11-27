'use client';

import React, { useState } from 'react';
import { Container, Group, TextInput, NumberInput, Textarea, Button, Text, Box } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { Header } from '@/components/Header/Header';
import { notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import "@mantine/dates/styles.css";
import { useRouter } from 'next/navigation';
import { UploadSingle } from "@/components/Upload/Upload";
import classes from "@/app/(frontend)/enroll/enroll.module.css";
import ImagePreview from "@/components/Upload/ImageDisplay";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  nationality: string;
  passportNumber: string;
  phoneNumber: string;
  birthDate: Date | null;
  address: string;
  occupation: string;
  income: string | number;
  passport_img: string | null;
}

export default function Home() {
  const [form, setForm] = useState<FormState>({
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
    passport_img: null,
  });

  const [passportImagePreview, setPassportImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const missingFields = Object.entries(form).filter(([key, value]) => {
      if (Array.isArray(value)) return value.length === 0;
      if (value instanceof Date) return value === null;
      return !value;
    });

    if (missingFields.length > 0) {
      notifications.show({
        title: "Incomplete Form",
        message: `Please fill out all required fields: ${missingFields
            .map(([field]) => field)
            .join(", ")}`,
        color: "red",
      });
      return;
    }

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
        console.error('Error:', result);
        notifications.show({
          title: 'Registration Failed',
          message: result?.error || 'An error occurred during registration. Please try again.',
          color: 'red',
        });
      }
    } catch (error) {
      console.error('Caught error:', error);
      notifications.show({
        title: 'Registration Failed',
        message: 'An unexpected error occurred. Please try again.',
        color: 'red',
      });
    }
  };


  // Handling upload completion for passport image
  const handlePassportImageUpload = (url: string) => {
    setForm((prev) => ({ ...prev, passport_img: url }));
    setPassportImagePreview(url);
  };

  return (
      <main>
        <Header />
        <Container size="md" my="xl">
          <Text size="xl" mb="md">Fill your information</Text>
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

          {/* Use DateTimePicker instead of DateInput */}
          <DateTimePicker
              clearable
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

          {/* Upload Passport Image */}
          <Text>Passport Image (Recommended size: 1000x1400)</Text>
          {/* Passport Image Preview */}
          {passportImagePreview ? (
              <ImagePreview
                  title="License Image Preview"
                  imageSrc={passportImagePreview}
                  onRemove={() => setPassportImagePreview(null)} // Custom behavior for removing the license preview
              />
            ) : (
              <UploadSingle onUploadComplete={handlePassportImageUpload} />
            )
          }

          <Group align={"center"} mt="xl">
            <Button color="green" onClick={handleSubmit}>
              Submit
            </Button>
          </Group>
        </Container>
      </main>
  );
}
