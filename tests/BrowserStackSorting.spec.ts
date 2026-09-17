import {test,expect} from "@playwright/test"

test.describe("Automate BrowserStack",()=>{
    test.beforeEach("Page Loading Validation",async({page})=>{
        await page.goto("https://www.bstackdemo.com/")
        await expect(page).toHaveURL("https://www.bstackdemo.com/")
    })
    test("Interact With Order By Dropdown",async({page})=>{
        const orderByDrpDWn=page.locator(".sort select")
        await expect(orderByDrpDWn).toBeVisible()
        await expect(orderByDrpDWn).toBeEnabled()
        await orderByDrpDWn.selectOption({label:"Lowest to highest"})
        await page.waitForTimeout(2000)
        const allitemPrices=page.locator('.shelf-item__price div[class="val"]')
        const itemPrice=await allitemPrices.allTextContents()
        const numOfPrices=await allitemPrices.count()
        const allproductTitles=page.locator(".shelf-item__title")
        const productName=await allproductTitles.allTextContents()
        const numOfProduct=await allproductTitles.count()
        console.log("Total Products",numOfProduct)
        console.log("Total Prices",numOfPrices)
        expect(numOfPrices).toEqual(numOfProduct) 
        for(let i=0;i<productName.length;i++)
        {
            console.log(productName[i],"==",itemPrice[i])
        }
        let prices:number[]=itemPrice.map(price=>Number(price.replace("$","")))
        const lowesrPrice=Math.min(...prices)
        console.log("Lowest Price ==>",lowesrPrice)
    })
})