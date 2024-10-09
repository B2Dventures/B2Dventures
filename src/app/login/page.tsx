import {Button, Container, TextInput, Title} from "@mantine/core";
import {Header} from "@/components/Header/Header";
import React from "react";

export default function Home() {
    return (
        <main>
            <Header />
                <Container style={{ maxWidth: 500, marginTop: 100 }}>
                    <Title order={2} style={{ textAlign: 'center', color: '#6C5434' }}>Login</Title>
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
                        <Button type="submit" style={{ backgroundColor: '#F7C04A', width: '100%' }}>Login</Button>
                    </form>
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <a href="/signup" style={{ color: '#6C5434', textDecoration: 'none' }}>Don't have an account? Signup</a>
                    </div>
                </Container>
        </main>
    );
}
