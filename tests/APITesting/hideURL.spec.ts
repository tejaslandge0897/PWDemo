import {test,expect} from "@playwright/test"

test.describe.configure({timeout:35000})

test("Hide Images",async({page})=>{
    await page.route("**/*.{png,jpg,jpeg,gif,svg,webp}",async(route)=>{
        console.log(route)
        route.abort()
    })

    await page.goto("https://www.demoblaze.com/")
    await page.waitForTimeout(2000)
})