import {Container, Text, Image, Anchor, Grid, Group, Button} from "@mantine/core";
import { notifications } from '@mantine/notifications';
import {useRouter} from "next/navigation";
import React from "react";
import {Router} from "next/router";

interface Details {
    info: { id:number, label: string; value: string }[];
    link: { id:number, label: string; value: string }[];
    picture: string;
}


const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <Container mb="sm">
        <Text>{label}:  {value}</Text>
    </Container>
);

const PictureFrame = ({picture}: {picture: string}) => (
    <Container>
        <Image
            src={picture}
            alt="Profile picture"
            width={350}
            height={350}
            styles={{
                root: {
                    width: '350px',  // Ensure fixed width for image
                    height: '350px', // Ensure fixed height for image
                },
            }
        }

        />
    </Container>
);

const VerificationLinks = ({ link }: { link: { id: number, label: string; value: string }[] }) => (
    <Container>
        {link.map((item) => (
            <Container key={item.id.toString()}>
            <Anchor href={item.value}>{item.label}</Anchor>
            </Container>
                )
            )
        }
    </Container>
);

const DetailsSection = ({ info }: { info: { id: number, label: string; value: string }[] }) => (
    <Container>
        {info.map((item) => (
            <DetailItem key={item.id.toString()} label={item.label} value={item.value} />
        ))}
    </Container>
)

const handleClickApprove = () => {
    notifications.show({
        title: 'Request Approved',
        autoClose: false,
        message: 'User request has been successfully approved.',
        position: 'top-right'
    });

    setTimeout(() => {
        window.location.href = '/admin'
    }, 2000); // Optional delay (1 second) before redirecting
}

const handleClickReject = () => {
    notifications.show({
        color:"red",
        autoClose: false,
        title: 'Request Rejected',
        message: 'User request has been rejected.',
        position: 'top-right'
    });

    setTimeout(() => {
        window.location.href = '/admin'
    }, 2000); // Optional delay (1 second) before redirecting
}


export const InvestorDetailsPage: React.FC<Details> = ({ info, link, picture }) => {
    return (
        <Container size={800}>
            <Grid>
                {/* Picture Frame Component */}
                <Grid.Col span={6}>
                    <PictureFrame picture={picture}/>
                    <div style={{marginBottom: '16px'}}/>
                    <VerificationLinks link={link}/>
                </Grid.Col>

                {/* Details Component */}
                <Grid.Col span={6} >
                    <DetailsSection info={info}/>
                </Grid.Col>
            </Grid>

            {/* Approval and Reject Buttons */}
            <Group align={"end"} mt="xl" justify={'center'}>
                <Button color="green" onClick={handleClickApprove}>
                    Approval
                </Button>
                <Button color="red" onClick={handleClickReject}>
                    Reject
                </Button>
            </Group>
        </Container>
    );
};

// BusinessDetailsPage
// export const BusinessDetailsPage:  React.FC<Details> = ({ info, link, picture }) => {
//     return(
//         <Container size={800}></Container>
//     );
// };
