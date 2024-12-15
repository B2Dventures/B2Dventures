import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from '@clerk/nextjs/server';
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    ImageMultiple: f({ image: { maxFileSize: "4MB" , maxFileCount: 5, minFileCount: 1} })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            const user = auth();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: auth().sessionClaims?.metadata?.id };
        })
        .onUploadComplete((data) => { console.log("file", data); }),
    ImageSingle: f({ image: { maxFileSize: "4MB" , maxFileCount: 1, minFileCount: 1} })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            const user = auth();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: auth().sessionClaims?.metadata?.id };
        })
        .onUploadComplete((data) => { console.log("file", data); }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
