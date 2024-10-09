import prisma from "@/lib/db";

export default async function Home() {
    const allData = await prisma.testDB.findMany()
    console.log("here")
    console.log(allData)

    return(
        <main>
            <h1>Testing</h1>
        </main>

    )
}