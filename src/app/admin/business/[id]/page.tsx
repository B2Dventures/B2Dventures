'use client';

// import { BusinessDeatailsPage } from "@/components/RequestDetails/RequestDetails";
import {Container} from "@mantine/core";
import {Header} from "@/components/Header/Header";
import React from "react";

// simulate info for business part
// const info = [
//     { id:0 , label: "First Name", value: "John" },
//     { id:1 , label: "Last Name", value: "Doe" },
//     { id:2 , label: "Email", value: "john.doe@example.com" },
//     { id:3 , label: "Nationality", value: "American" },
//     { id:4 , label: "Passport No", value: "X12345678" },
//     { id:5 , label: "Phone Number", value: "+1 123 456 7890" },
//     { id:6 , label: "Birthday", value: "January 1, 1980" },
//     { id:7 , label: "Address", value: "1234 Main St, City, Country" },
//     { id:8 , label: "Occupation", value: "Investor" },
//     { id:9 , label: "Income", value: "$500,000/year" },
//     { id:10 , label: "Investment Preference", value: "Technology" }
// ];
//
// const link = [
//     { id:0, label: "Networth Proof", value: "/networth-proof-link" },
//     { id:1, label: "Passport Picture", value: "/passport-proof-link" }
// ];
//
// const picture = "/4.ico"; // Make sure the path is correct

export default function Home() {
    return (
        <main>
            <Header />
            &nbsp;
            <Container size={1440}>
                {/*<BusinessDetailsPage info={info} link={link} picture={picture}/>*/}
            </Container>
        </main>
    );
}
