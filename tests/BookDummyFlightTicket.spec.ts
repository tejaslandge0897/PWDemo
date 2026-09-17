import {test,expect,Page} from "@playwright/test"

async function selectDateOfBirth(page:Page,day:string,birthMonth:string,birthYear:string){
    await page.locator(".ui-datepicker-year").selectOption({label:`${birthYear}`})
    await page.locator(".ui-datepicker-month").selectOption({label:`${birthMonth}`})
    await page.locator(`[data-date="${day}"]`).click()
}
async function selectTravelDate(page:Page,day:string,travelMonth:string,travelYear:string){
    await page.locator(".ui-datepicker-year").selectOption({label:`${travelYear}`})
    await page.locator(".ui-datepicker-month").selectOption({label:`${travelMonth}`})
    await page.locator(`[data-date="${day}"]`).click()
}

test.beforeEach("Launch Browser",async({page})=>{
await page.goto("https://www.dummyticket.com/dummy-ticket-for-visa-application/")
})
test("Book Dummy Flight Ticket",async({page})=>{
    const dateOfBirth="8-Jun-1997"
    const brthDateArray=dateOfBirth.split("-")
    const day=brthDateArray[0]
    const birthMonth=(brthDateArray[1])
    const birthYear=brthDateArray[2]
    console.log(`${day} ${birthMonth} ${birthYear}`)

    //Select Dummy Ticket product
    await page.locator("#checkout-products li",{hasText:"Dummy ticket and hotel"}).click()
    await page.locator("#travname").fill("Tejas")
    await page.locator("#travlastname").fill("Landge")
    await page.locator("#dob").click()

    //Select Birth Date Via Function Calling

    await selectDateOfBirth(page,day,birthMonth,birthYear)
    await expect(page.locator("#dob")).toHaveValue("08/06/1997")
    await page.locator('[name="sex"]').first().click()

    //Choose a round-trip journey
    await page.locator('[name="traveltype"]').last().click()
    await page.locator("#fromcity").fill("Boston")
    await page.locator("#tocity").fill("Boston")
    //Select Departure Date
    const departureDate="18-Oct-2026"
    const deptDate=departureDate.split("-")
    const depDay=deptDate[0]
    const departureMonth=deptDate[1]
    const departureYear=deptDate[2]
    console.log(`${depDay} ${departureMonth} ${departureYear}`)
    await page.locator("#departon").click()
    await selectTravelDate(page,depDay,departureMonth,departureYear)
    await expect(page.locator("#departon")).toHaveValue("18/10/2026")
    //Select Destination Date
    const returnDate="25-Oct-2026"
    const retnDate=returnDate.split("-")
    const returnDay=retnDate[0]
    const returnMonth=retnDate[1]
    const returnYear=retnDate[2]
    console.log(`${day} ${birthMonth} ${birthYear}`)
    await page.locator("#returndate").click()
    await selectTravelDate(page,returnDay,returnMonth,returnYear)
    await expect(page.locator("#returndate")).toHaveValue("25/10/2026")

    //Enter Other Details
    await page.locator("#billing_email").fill("tejas@gmail.com")
    await page.locator("#billing_address_1").fill("ABC road")
    await page.locator("#billing_city").fill("Pune")
    await page.locator("#select2-billing_state-container").click()
    const selctStates=page.locator("#select2-billing_state-results>li",{hasText:"Maharashtra"})
    await selctStates.scrollIntoViewIfNeeded()
    await selctStates.click()
    await page.locator("#billing_postcode").fill("411057")
    await page.locator("#billing_phone").fill("7885821234")
    await page.locator("#place_order").click()
    await page.locator(".listHeading.secondary-heading ").waitFor({state:"visible"})
    await expect(page.locator(".listHeading.secondary-heading ")).toBeVisible()

})