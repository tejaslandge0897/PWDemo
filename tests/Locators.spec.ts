import {test,expect} from "@playwright/test"

test("Get By Role",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html")

    await expect(page.getByRole("heading",{name:"Welcome to the Dashboard"})).toBeVisible()
    await page.getByRole("button",{name:"Sign In"}).click()
    await page.getByRole("button",{name:"Delete"}).click()
    await page.getByRole("button",{name:"Save Changes"}).click()
    await page.getByRole("checkbox",{name:"Subscribe to newsletter"}).check()
    await page.getByRole("radio",{name:"Free Plan"}).check()
   
})

test("Get By Text",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html")
    const text= page.getByText("Welcome, John! 👋",{ exact: false })
    await expect(text).toBeVisible()
})

test("Get By Label",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html")
    const fitstName= page.getByLabel("First Name")
    await fitstName.fill("Tejas")
    const lastName= page.getByLabel("Last Name")
    await lastName.fill("Landge")
})

test("Get By PlaceHolder",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html")
    await page.getByPlaceholder("Search tests...").fill("Google")
    await page.getByPlaceholder("Enter your username").fill("Tejas6701")
    await page.getByPlaceholder("name@company.com").fill("Tejas@gmail.com")
})

test("Get By Alt Text",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html")
    const logo=page.getByAltText("Playwright logo")
    await expect(logo).toBeVisible()
})

test("Get By Title",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html")
    await expect(page.getByTitle("Total test runs")).toContainText("4,821")
    await expect(page.getByTitle("Total test runs")).toHaveText("4,821Total Runs")
})

test("Get By TestID",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app.html")
    const testCount=await page.getByTestId("test-count").textContent()
    console.log(testCount)
})




