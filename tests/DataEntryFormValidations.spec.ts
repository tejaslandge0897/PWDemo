import {test,expect} from "@playwright/test"

test.describe("Data Entry Page Validations",()=>{

    test.beforeEach(async({page})=>{
        await page.goto("https://sdetqa.vercel.app/autoplay")
       
    })
    test("Page Load Validation",async({page})=>{
        await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay")
        await expect(page.getByText("AutoPlay")).toBeVisible()
    })
    test("Input Field Validations",async({page})=>{
        const fullName= page.getByLabel("Full name")
        //Locate Full name field--->> Field should be visible & enabled
        await expect(fullName).toBeVisible()
        await expect(fullName).toBeEnabled()
        //Check maxlength attribute of Full name--> Max length should be 15
        await expect(fullName).toHaveAttribute("maxlength","15")
        await fullName.fill("ABCDEFGHIGKLMNOPQR")
        await expect(fullName).toHaveValue("ABCDEFGHIGKLMNO")
        //Enter "John Canedy" in Full name-->Value should be entered correctly
        await fullName.clear()
        await fullName.fill("John Canedy")
        await expect(fullName).toHaveValue("John Canedy")
        await page.waitForTimeout(3000)
        //Locate Email field --> Field should be visible
        const emailID=page.getByPlaceholder("john@example.com")
        await expect(emailID).toBeVisible()
        //Enter "tester@example.com"-->Value shoul
        // d match input
        await emailID.fill("tester@example.com")
        await expect(emailID).toHaveValue("tester@example.com")
        await page.waitForTimeout(3000)
        //Locate Phone field-->Field should be visible
        const phone=page.getByLabel("Phone")
        await expect(phone).toBeVisible()
        //Enter "+91 1234567898"-->Value should match input
        await phone.fill("+91 1234567898")
        await expect(phone).toHaveValue("+91 1234567898")
        await page.waitForTimeout(3000)
        //Locate Address field-->Field should be visible
        const adress=page.getByLabel("Address")
        await expect(adress).toBeVisible()
        //Enter multi-line address-->value should accept newline input
        await adress.fill("ABC Road, \n Pune, 411057")
        await expect(adress).toHaveValue("ABC Road, \n Pune, 411057")
        await page.waitForTimeout(3000)
    })
    test("Radio Button (Gender) Validation",async({page})=>{
        //Locate Male & Female radio buttons-->Both should be visible
        const male=page.getByRole("radio",{name:"Male",exact:true})
        const female=page.getByRole("radio",{name:"Female",exact:true})
        await expect(male).toBeVisible()
        await expect(female).toBeVisible()
        //Select Female radio button-->Female should be selected
        await female.check()
        //Verify Male radio button-->Male should NOT be selected
        await expect(male).not.toBeChecked()
      })
      test("Checkbox (Days) Validation",async({page})=>{
        //Select Sun checkbox-->Sun should be checked
        const sunday=page.getByRole("checkbox",{name:"Sun"})
        await sunday.check()
        await expect(sunday).toBeChecked()
        await sunday.uncheck()
        await page.waitForTimeout(3000)
        //Select all checkboxes (Mon–Sun)-->All should be checked
        let allDay =[  page.getByRole("checkbox",{name:"Mon"}),
                       page.getByRole("checkbox",{name:"Tue"}),
                       page.getByRole("checkbox",{name:"Wed"}),
                       page.getByRole("checkbox",{name:"Thu"}),
                       page.getByRole("checkbox",{name:"Fri"}),
                       page.getByRole("checkbox",{name:"Sat"}),
                       page.getByRole("checkbox",{name:"Sun"})]
        for(const day of allDay){
            await day.check()
        }
        for(const day of allDay){
            await expect(day).toBeChecked()
        }
        await page.waitForTimeout(3000)
        //Uncheck last 3 (Fri, Sat, Sun)-->These should be unchecked
        const lastthree=[page.getByRole("checkbox",{name:"Fri"}),
                        page.getByRole("checkbox",{name:"Sat"}),
                        page.getByRole("checkbox",{name:"Sun"})]
        for(let day of lastthree){
            await day.uncheck()
        }
        await page.waitForTimeout(3000)
        
        //Toggle all checkboxes-->Checked → unchecked, unchecked → checked
        for(let day of allDay){
            if(await day.isChecked())
            {
                await day.uncheck()
            }
            else
            {
                await day.check()
            }
        }
        for(let day of allDay){
            if(await day.isChecked())
            {
                await day.uncheck()
            }
        }
        //Select checkboxes using index (1,3,6 → Tue, Thu, Sun)-->Only those indexes should be checked
        for( let i in allDay){
            if(Number(i)==1||Number(i)==3||Number(i)==6)
            {
                await allDay[i].check()
            }
        }
        await page.waitForTimeout(3000)

        //Select checkbox with label "Fri"-->Friday checkbox should be checked
        await page.getByLabel("Fri").check()
        await expect(page.getByLabel("Fri")).toBeChecked()
        await page.waitForTimeout(3000)
    })

    test("5. Submit Button Validation",async({page})=>{
        const submitBtn=page.locator('button[type="submit"]').first()
        await expect(submitBtn).toBeVisible()
        await submitBtn.click()
        await expect(submitBtn).toBeEnabled()
        await page.waitForTimeout(3000)
    })
    test("Additional Test Cases",async({page})=>{
    // Leave all fields empty and click Submit-->Validation message should appear (if implemented)
    const fullName= page.getByLabel("Full name")
    await fullName.fill("ABCDERTHDJUTETQWEW")
    await expect(fullName).toHaveValue("ABCDERTHDJUTETQ")
    await page.getByPlaceholder("john@example.com").fill("gdvf#com")
    const phone=page.getByLabel("Phone")
    await phone.fill("ABCDEFG")
    await expect(page.locator("[class=input-error]")).toBeVisible()
    const submitBtn=page.locator('button[type="submit"]').first()
    await submitBtn.click()
    const errorMSg=page.locator("#formErrors")
    await expect(errorMSg).toHaveText('Please fix the following:Please enter a valid email address.Phone is required.Please select a gender.Please select at least one day.')
    //Enter invalid email format-->Error should be shown

})
})