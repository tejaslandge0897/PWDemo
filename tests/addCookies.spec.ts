import {test, expect} from "@playwright/test"
import fs from "fs"
const cookiesFile="./cookiesStorage/cookies.data.json"
const pageUrl="https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
test.setTimeout(60000)
test.describe.configure({mode:"serial"})
test("Login to HRM and save Cookies",async({browser})=>{
    const context=await browser.newContext()
    const page=await context.newPage()
    await page.goto(pageUrl)
    await expect(page.locator('[placeholder="Username"]')).toBeVisible()
    await page.locator('[placeholder="Username"]').fill("Admin")
    await page.locator('[name="password"]').fill("admin123")
    await page.locator('[type="submit"]').click()
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    const cookies=await context.cookies()
    fs.writeFileSync(cookiesFile,JSON.stringify(cookies,null,2))
    //await page.waitForTimeout(3000)
})
test("Use existing cookies and login",async({browser})=>{
    const context=await browser.newContext()
    const savedCookies=JSON.parse(fs.readFileSync(cookiesFile,'utf-8'))
    await context.addCookies(savedCookies)
    const page=await context.newPage()
    await page.goto(pageUrl)
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
   // await page.waitForTimeout(3000)
})
