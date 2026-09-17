import { test,chromium } from "@playwright/test"
const pageURL="https://sdetqa.vercel.app/login_app"
async function adminLocalStorage() {
    const browser=await chromium.launch()
    const context=await browser.newContext()
    const page=await context.newPage()
    await page.goto(pageURL)
    await page.locator("#username").fill("admin")
    await page.locator("#password").fill("admin123")
    await page.getByLabel('💾 Local').click()
    await page.getByRole('button', { name: 'Login' }).click()
    await page.waitForSelector('text=Dashboard Welcome',{state:"visible"})

    await context.storageState({path:"./LocalStorage/localData.json"})

}
adminLocalStorage()

test("Call A Function",async()=>{
    test.setTimeout(30000)
    await adminLocalStorage()
})