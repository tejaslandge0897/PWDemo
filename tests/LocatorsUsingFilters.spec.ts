import {test,expect} from '@playwright/test'

test.beforeEach("Launch Browser",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/filters_practice.html")
})
test.afterEach("Close Browser",async({page})=>{
    await page.close()
})

test("Verify Add to cart for product 2",async({page})=>{
    const addToCartBtn=page.getByRole("listitem")
        .filter({hasText:"Product 2"})
        .getByRole("button",{name:"Add to cart"})
    
    await expect(addToCartBtn).toHaveText("Add to cart")
    await addToCartBtn.click()

})