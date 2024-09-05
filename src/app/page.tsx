import {Header} from "@/components/Header/Header";
import {Stats} from "@/components/Homepage/Stats";
import {ImageHolder} from "@/components/ImageHolder/ImageHolder";
import {Container} from "@mantine/core";
import classes from "./index.module.css";

export default function Home() {
    return (
        <main>
            <Header />
            <Container>
                <h1 className={classes.bigtext}>B2D Ventures</h1>
                <h2>Become a part of world’s ventures</h2>
            <div>Work in process Index page</div>
            <ImageHolder imgSrc={"/logo.ico"} imgAlt={"test investor pic"} linkUrl={"/investor/1"} />
            </Container>
            <Stats />
        </main>

    );
}
