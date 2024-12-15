'use client';

import React, { useState } from 'react';
import { Container, Group, TextInput, NumberInput, Textarea, Button, Text } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { Header } from '@/components/Header/Header';
import { notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import "@mantine/dates/styles.css";
import { UploadSingle } from "@/components/Upload/Upload";
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

const isValidText = (value: string) => /^[A-Za-z]+$/.test(value);
const isValidPassport = (value: string) => /^[A-Za-z0-9]+$/.test(value);
const isValidNumber = (value: string) => /^[0-9]+$/.test(value);
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const error: any = {};

    if (!form.firstName || !isValidText(form.firstName)) {
      error.firstName = 'First name is required and should contain only letters.';
    }
    if (!form.lastName || !isValidText(form.lastName)) {
      error.lastName = 'Last name is required and should contain only letters.';
    }
    if (!form.email || !isValidEmail(form.email)) {
      error.email = 'Email is required and should be a proper format ( example@example.com ).';
    }
    if (!form.nationality || !isValidText(form.nationality)) {
      error.nationality = 'Nationality is required should contain only letters.';
    }
    if (!form.passportNumber || !isValidPassport(form.passportNumber)) {
      error.passportNumber = 'Passport number is required and should contain only alphanumeric characters.';
    }
    if (!form.phoneNumber || !isValidNumber(form.phoneNumber)) {
      error.phoneNumber = 'Phone number is required and should contain only numbers.';
    }
    if (!form.birthDate) {
      error.birthDate = 'Birthday is required.';
    }
    if (!form.address) {
      error.address = 'Address is required.';
    }
    if (!form.occupation || !isValidText(form.occupation)) {
      error.occupation = 'Occupation is required and should contain only letters.';
    }
    if (typeof form.income !== 'number' || form.income <= 0) {
      error.income = 'Income is required and should contain only a positive number.';
    }
    if (!form.passport_img) {
      error.passport_img = 'Passport image is required.';
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async () => {

    if (!validateForm()) {
      notifications.show({
        title: "Incomplete Form",
        message: `Please fill out all required fields.`,
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
      window.location.href = '/error';
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
              error={errors.firstName}
          />
          <TextInput
              label="Lastname"
              placeholder="Enter your lastname"
              required
              mt="md"
              name="lastName"
              value={form.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
          />
          <TextInput
              label="Email"
              placeholder="Enter your email"
              required
              mt="md"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              error={errors.email}
          />
          <TextInput
              label="Nationality"
              placeholder="Enter your nationality"
              required
              mt="md"
              name="nationality"
              value={form.nationality}
              onChange={handleInputChange}
              error={errors.nationality}
          />
          <TextInput
              label="Passport number"
              placeholder="Enter your passport number"
              required
              mt="md"
              name="passportNumber"
              value={form.passportNumber}
              onChange={handleInputChange}
              error={errors.passportNumber}
          />
          <TextInput
              label="Phone number"
              placeholder="Enter your available phone number"
              required
              mt="md"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleInputChange}
              error={errors.phoneNumber}
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
              error={errors.birthDate}
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
              error={errors.address}
          />
          <TextInput
              label="Occupation"
              placeholder="Enter your current occupation"
              required
              mt="md"
              name="occupation"
              value={form.occupation}
              onChange={handleInputChange}
              error={errors.occupation}
          />
          <NumberInput
              label="Income"
              placeholder="Enter your annual income"
              required
              mt="md"
              name="income"
              value={form.income}
              onChange={(value) => setForm((prev) => ({ ...prev, income: value }))}
              error={errors.income}
          />

          {/* Upload Passport Image */}
          <Text>Passport Image (Recommended size: 1000x1400)</Text>
          {/* Passport Image Preview */}
          {passportImagePreview ? (
              <ImagePreview
                  title="License Image Preview"
                  imageSrc={passportImagePreview}
                  onRemove={() => { setPassportImagePreview(null); }} // Custom behavior for removing the license preview
              />
          ) : (
              <UploadSingle onUploadComplete={handlePassportImageUpload} />
          )}
          {errors.passport_img && <Text c="red">{errors.passport_img}</Text>}

          <Group align={"center"} mt="xl">
            <Button color="green" onClick={handleSubmit}>
              Submit
            </Button>
          </Group>
        </Container>
      </main>
  );
}
