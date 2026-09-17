import {test,expect} from "@playwright/test"
const pageURL="https://sdetqa.vercel.app/login_app"
test("Login Using Local Storage",async({browser})=>{
    test.setTimeout(20000)
    const context=await browser.newContext({storageState:"./LocalStorage/localData.json"})
    const page=await context.newPage()
    await page.goto(pageURL)
    await expect(page.getByText('Dashboard Welcome', { exact: true })).toBeVisible()
})