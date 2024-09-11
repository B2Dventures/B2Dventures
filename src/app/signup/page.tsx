import {Header} from "@/components/Header/Header";
import React from 'react';
import { TextInput, Button, Container, Title } from '@mantine/core';

export default function Home() {
    return (
        <main>
        <Header />
        <Container style={{ maxWidth: 500, marginTop: 100 }}>
            <Title order={2} style={{ textAlign: 'center', color: '#6C5434' }}>Signup</Title>
            <form style={{ marginTop: 20 }}>
                <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    required
                    size="md"
                    style={{ marginBottom: 20 }}
                />
                <TextInput
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    size="md"
                    style={{ marginBottom: 20 }}
                />
                <TextInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    required
                    size="md"
                    style={{ marginBottom: 20 }}
                />
                <Button type="submit" style={{ backgroundColor: '#F7C04A', width: '100%' }}>Signup</Button>
            </form>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <a href="/login" style={{ color: '#6C5434', textDecoration: 'none' }}>Already have an account? Login</a>
            </div>
        </Container>
        </main>
    );
}
