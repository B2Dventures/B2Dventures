import { Webhook } from 'svix'
import { headers } from 'next/headers'
import {WebhookEvent, createClerkClient} from '@clerk/nextjs/server'
import prisma from "@/utils/db";

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occured', {
            status: 400,
        })
    }

    const { id } = evt.data
    const eventType = evt.type

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    // console.log('Webhook body:', body)

    if (evt.type == 'user.created') {
        console.log('userId:', evt.data.id)
        console.log('Email:', evt.data.email_addresses[0].email_address)
        // create data in our database
        const user = await prisma.user.create({
            data: {
                clerkId: evt.data.id,
                role: undefined,
                email: evt.data.email_addresses[0].email_address,
            }
        });
        // set default role of all user to be guest level
        await clerkClient.users.updateUser(evt.data.id, {
            publicMetadata: {
                id: user.id,
                role: 'guest',
            },
        });

    }
    return new Response('Success create', { status: 200 })
}
