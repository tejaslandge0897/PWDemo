import {test,expect} from "@playwright/test"

test.afterEach(async({page})=>{
    await page.waitForTimeout(5000)
})
test("Login Validation",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/")
    const loginPage=page.getByPlaceholder("Username")
    await loginPage.waitFor({state:"visible"}) 
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.locator('[type="submit"]').click()
    const pimMenu=page.getByText("PIM")
    await expect(pimMenu).toBeVisible()
    await pimMenu.click()
    await expect(page.locator(".oxd-topbar-header-breadcrumb").last()).toHaveText("PIM")
    await page.locator("form i").nth(2).click()
    await page.waitForTimeout(3000)
    const jobTitleDrp=page.locator('[role="listbox"]>div span')
    const noOfOptions=await jobTitleDrp.count()
    console.log("Total Options",noOfOptions)
    const drpValues=await jobTitleDrp.allInnerTexts()
    for(let value of drpValues)
    {
        console.log(value)
    }
    for(let i=0;i<drpValues.length;i++)
    {
        if(drpValues[i]=="Customer Success Manager")
        {
            await jobTitleDrp.nth(i).click()
        }
    }
})