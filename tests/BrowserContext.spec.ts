import {test,chromium} from "@playwright/test"

test("Browser Context",async()=>{
    
    const browser=await chromium.launch()
    const adminContext=await browser.newContext()
    const adminPage=await adminContext.newPage()

    const normalContext=await browser.newContext()
    const normalPage=await normalContext.newPage()

    //Login to admin User
    await adminPage.goto("https://www.saucedemo.com/")
    await adminPage.locator("#user-name").fill("standard_user")
    await adminPage.locator("#password").fill("secret_sauce")
    await adminPage.locator('#login-button').click()

    //Login to normal user
    await normalPage.goto("https://www.saucedemo.com/")
    await normalPage.locator("#user-name").fill("standard_user")
    await normalPage.locator("#password").fill("secret_sauce")
    await normalPage.locator('#login-button').click()

})