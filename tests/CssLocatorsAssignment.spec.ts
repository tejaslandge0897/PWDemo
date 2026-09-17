import {test,expect} from "@playwright/test"

test.beforeEach("Launch Browser",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
})
test.afterEach("Close Browser",async({page})=>{
    await page.close()
})
test("Use CSS Selector",async({page})=>{
    await page.locator("input#small-searchterms").fill("14.1-inch Laptop")
    await page.locator('[class="button-1 search-box-button"]').click()
    const verifyStock= page.locator('[class="product-title"]>a')
    await expect(verifyStock).toHaveText("14.1-inch Laptop")
})
test("Get All Links",async({page})=>{
    const links=await page.locator("a").allInnerTexts()
    console.log(links)
})