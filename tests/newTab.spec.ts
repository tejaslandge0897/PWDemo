import {test,expect} from "@playwright/test"

test("new Tab Handling",async({browser})=>{
    const contex=await browser.newContext()
    const newPage=await contex.newPage()
    await newPage.goto("https://sdetqa.vercel.app/autoplay")
   
    const newTabPromise=contex.waitForEvent("page")
    await newPage.getByRole('button', { name: 'New Tab' }).click()
    const newTab=await newTabPromise
    expect(newTab.url()).toBe("https://playwright.dev/")
})