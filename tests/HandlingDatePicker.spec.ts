import {test,expect,Page} from "@playwright/test"
function selectDate(page:Page,targetMonth:string,targetYear:string,isFuture:boolean)
{

}

test("Handling DatePickers",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")
    await expect(page.getByText("AutoPlay")).toBeVisible()
    
    const datePicker=page.locator("input#datepicker1")
    await expect(datePicker).toBeVisible()
    await datePicker.click()

    const currentMonth=page.locator(".ui-datepicker-title")
    await expect(currentMonth).toBeVisible()
    await expect(currentMonth).toHaveText("September 2026")

    function selectDate(page,targetMonth,targetYear,true)
    {

    }
})