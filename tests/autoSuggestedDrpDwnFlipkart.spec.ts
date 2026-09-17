import {test,expect} from "@playwright/test"
test.afterEach(async({page})=>{
    await page.waitForTimeout(5000)
})

test("Handling Auto Suggested Dropdownds",async({page})=>{
    await page.goto("https://www.flipkart.com/")
    await expect(page).toHaveURL("https://www.flipkart.com/")
    const closeButton=page.locator('span[role="button"]')
  
    await closeButton.waitFor({state:'visible'})
    await closeButton.click()
    const searchBox=page.locator('.Afujtw input[name="q"]').first()
    await expect(searchBox).toBeVisible()
    await searchBox.fill("smart")
    const suggestedDrpDwn=page.locator('[class="VCplLH lTpUwR bRjjIF _1psv1ze5l _1psv1ze9l _1psv1ze7c _1cisqlf2"] li')
    await expect(suggestedDrpDwn.first()).toBeVisible()
    console.log("Total Suggestions",await suggestedDrpDwn.count())
    const sgnDrpDwn=await suggestedDrpDwn.allInnerTexts()
    for(let i=0;i<sgnDrpDwn.length;i++)
    {   
       if(i==4)
       {
        console.log(sgnDrpDwn[i])
        break
       }
    }
    for(let i=0;i<sgnDrpDwn.length;i++)
    {
        if(sgnDrpDwn[i]=="smartphone")
        {
            suggestedDrpDwn.nth(i).click()
        }
    }
    await expect(page).toHaveURL(/smartphone/);
    await expect(page.locator('[name="q"]')).toHaveValue("smartphone")
})
