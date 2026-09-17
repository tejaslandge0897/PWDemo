import { test, expect } from "@playwright/test"

const base_url = "https://restful-booker.herokuapp.com"

test("Get All booking ID's", async ({ request }) => {
    const getResponse = await request.get(`${base_url}/booking`)
    const getResponseBody = await getResponse.json()
    console.log(getResponseBody)
})
