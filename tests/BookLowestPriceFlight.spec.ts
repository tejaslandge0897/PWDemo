import {test,expect} from "@playwright/test"

test.afterEach(async({page})=>{
    await page.waitForTimeout(3000)
})
test("Book Lowest Price FLight",async({page})=>{
    await page.goto("https://blazedemo.com/")
    await expect(page.getByText("Welcome to the Simple Travel Agency!")).toBeVisible()

    //2.Select Boston as departure city
    //3.Select London as destination city
    const departureCity=page.locator('[name="fromPort"]')
    const destinationCity=page.locator('[name="toPort"]')
    await departureCity.selectOption({label:"Boston"})
    await destinationCity.selectOption({label:"London"})
    //4.Click on Find Flights button
    await page.locator('[type="submit"]').click()
    //5.Verify that flights result table is displayed
    const availableFlights=page.locator("table tbody>tr")
    await expect(availableFlights.first()).toBeVisible()
    //6.Count number of flight rows
    const TotalAvailableFlights=await availableFlights.count()
    console.log("Available Flights Count",TotalAvailableFlights)
    //8.Capture all flight prices from the table
    const allPrices=await availableFlights.locator("td:nth-child(7)").allInnerTexts()
    console.log("All Flight Prices",allPrices)
    //9.Identify the lowest price among all flights
    let allFares=[]
    for(const flightPrice of allPrices)
    {
        const singlePrice=flightPrice.replace("$","")
        allFares.push(Number(singlePrice))
    }
    const lowestPrice=Math.min(...allFares)
    const convertToString=lowestPrice.toString()
    //10.Click on Choose This Flight for the lowest price row
    const chooseButtonLine=availableFlights.filter({hasText:convertToString})
    await chooseButtonLine.locator('input[type="submit"]').click()

    //11.Enter passenger details:
    const name = page.locator("#inputName")
    const address = page.locator("#address")
    const city = page.locator("#city")
    const state = page.locator("#state")
    const zipCode = page.locator("#zipCode")
    const cardType = page.locator("#cardType")
    const cardNumber = page.locator("#creditCardNumber")
    const expiryMonth = page.locator("#creditCardMonth")
    const expiryYear = page.locator("#creditCardYear")
    const nameOnCard = page.locator("#nameOnCard")
 
    await name.fill("John");
    await address.fill("1403 American Beauty Ln");
    await city.fill("Columbus");
    await state.fill("OH");
    await zipCode.fill("43240");
    await cardType.selectOption({ label: "American Express" });
    await cardNumber.fill("17532432597");
    await expiryMonth.fill("10");
    await expiryYear.fill("2024");
    await nameOnCard.fill("John Canedy");

    //12.Click on Purchase Flight button
    const purchaseButton=page.locator('[type="submit"]')
    await purchaseButton.click()

    //13.Capture confirmation message
    await expect(page.getByText("Thank you for your purchase today!")).toBeVisible()
})