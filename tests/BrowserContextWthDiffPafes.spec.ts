import {test} from "@playwright/test"

test("Browser Context with multiple pages",async({browser})=>{
    
    //Context1
    const context1=await browser.newContext()
    const context1_page1=await context1.newPage()
    const context1_page2=await context1.newPage()

    await context1_page1.goto("https://sdetqa.vercel.app/autoplay")
    await context1_page2.goto("https://www.saucedemo.com/")

    //Context2
    const context2=await browser.newContext()
    const context2_page1=await context2.newPage()
    const context2_page2=await context2.newPage()

    await context2_page1.goto("https://sdetqa.vercel.app/autoplay")
    await context2_page2.goto("https://www.saucedemo.com/")

})