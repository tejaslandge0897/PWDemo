import {test,expect,Page} from "@playwright/test"

test.describe("Booking.Com Date Picker Handling",()=>{
    
    test.beforeEach("Login Validation",async({page})=>{
        await page.goto("https://www.booking.com/")
        await expect(page.getByText("Find your next stay")).toBeVisible()
    })
    test.afterEach(async({page})=>{
        await page.waitForTimeout(3000)
    })
    test("Test Case 1",async({page})=>{
        await expect(page.getByText("Sign in or register")).toBeVisible()
        const closeButton=page.locator('button[aria-label="Dismiss sign-in info."]')
        await closeButton.click()
        await expect(page.getByText("Sign in or register")).not.toBeVisible()
        const destinationList = page.locator('input[placeholder="Where are you going?"]')
        await expect(destinationList).toBeVisible()
        await destinationList.click()
        await expect(page.locator('ul[role="group"]')).toBeVisible()
        await destinationList.fill("Chennai")
        const dropdonwList=await page.locator('[role="listbox"] li>div>div div>div[class="b08850ce41 f675b6298f"]').all()
        for(let i=0;i<dropdonwList.length;i++)
        {
            const listValue=await dropdonwList[i].innerText()
            if(listValue==="Chennai")
            {
               await dropdonwList[i].click()
               break
            }
        }

        
    const datePicker=page.getByTestId("searchbox-dates-container")
    await expect(datePicker).toBeVisible()
    await datePicker.click()
    const today = new Date()
    
    const currentMonth = today.toLocaleString('default',{month:"long"})
    const currentYear = today.getFullYear()
    const checkInMonth=page.locator('div[class="d7bd90e008"]>h3').first()
    const defaultCurrentMonth=await checkInMonth.innerText()
    expect(defaultCurrentMonth).toBe(`${currentMonth} ${currentYear}`)
    
    //****************************************************************************************/
    const targetDate="10"
    const targetMonth="November"
    const targetYear="2027"
    const nextMonth=page.locator('[aria-label="Next month"]')
    let defaultLoop=true
    while(defaultLoop)
        {
            const currentMonth=await checkInMonth.innerText()
            if(currentMonth!==`${targetMonth} ${targetYear}`)
            {
                await nextMonth.click()
                
            }
            else if(currentMonth===`${targetMonth} ${targetYear}`)
            {
                const allDates=await page.locator('table tbody>tr>td[aria-selected="false"]>span').all()
                for(let i=0;i<allDates.length;i++)
                 {
                        let day=allDates[i]
                        await expect(day).toBeVisible()
                        const date=await day.innerText()

                    if(date===targetDate)
                    {
                        await allDates[i].click()
                        defaultLoop=false
                        break
                    }
                 }
            }          
        }
    })
})