import { test, expect } from "@playwright/test"
const base_url = "https://restful-booker.herokuapp.com"
const payload = {
    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    },
    "additionalneeds": "Breakfast"
}
test("Create the Booking Request", async ({ request }) => {
    const postRequest = await request.post(`${base_url}/booking`, { data: payload })
    const postRequestBody = await postRequest.json()
    const bookings = await postRequestBody.booking
    console.log("Post Request Created Successfully", postRequestBody)

    expect(bookings).toMatchObject({
        firstname: payload.firstname,
        lastname: payload.lastname
    })
    const id=await postRequestBody.bookingid
    console.log("BookingID is",id)
    expect(postRequest.statusText()).toBe("OK")
    expect(postRequest.status()).toBe(200)

    const createTokenResponse=await request.post(`${base_url}/auth`,{
        data:
        {
             "username" : "admin",
             "password" : "password123"
        }
})
    const tokenBody=await createTokenResponse.json()
    const token=await tokenBody.token

    const deletResponse=await request.delete(`${base_url}/booking/${id}`,
        { headers:
        {
            Cookie:`token=${token}`
        }
        })
   // const deleteResponseBody=await deletResponse.json()
    expect(deletResponse.status()).toBe(201)
    expect(deletResponse.statusText()).toBe("Created")
})