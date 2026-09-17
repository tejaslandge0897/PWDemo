import {test,expect} from "@playwright/test"
import { table } from "node:console"

test.beforeEach("Launch Browser",async({page})=>{
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html")
    await expect(page).toHaveURL("https://datatables.net/examples/core/basic_init/zero_configuration.html")
})
test.afterEach("Wait to close browser",async({page})=>{
    await page.waitForTimeout(3000)
})
test("Handling Pagination Table",async({page})=>{
   const tabelRowLaoctor= page.locator("#example tbody tr")
   const nextButton=page.getByRole('link',{name:"Next"})
   await expect(nextButton).toBeVisible()
   let pageNum=1;
   let hasNext=true
  
   while(hasNext)
   {
    console.log(`Page ${pageNum}`)
    await tabelRowLaoctor.first().waitFor({state:"visible"})
    const rows=await tabelRowLaoctor.all()
        for(const row of rows)
        {   
            
            const cells =await row.locator("td").allInnerTexts()
            if(cells.length>0)
            {
                console.log(cells)
            }
        }
        if(await nextButton.isVisible() && await nextButton.isEnabled())
        {
            await nextButton.click()
            pageNum++
        }
        else
        {
            console.log("Reached to the last page")
            hasNext=false
        }

   }
})