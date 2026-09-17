import {test,expect} from "@playwright/test"

test("Frame Handling",async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/")
    const farme1= page.frameLocator('[src="frame_1.html"]')
    const input1=farme1.locator('[name="mytext1"]')
    await input1.fill("Welcome")
    await expect(input1).toHaveValue("Welcome")

    const farme2=page.frameLocator('[src="frame_2.html"]')
    const input2=farme2.locator('[name="mytext2"]')
    await input2.fill("Suneel")
    await expect(input2).toHaveValue("Suneel")

    const farme3=page.frameLocator('[src="frame_3.html"]')
    const input3=farme3.locator('[name="mytext3"]')
    await input3.fill("You are in Frame 3 - Teal")
    await expect(input3).toHaveValue("You are in Frame 3 - Teal")

    const insideFrame=farme3.frameLocator("iframe")
    const formMesg=await insideFrame.getByText("Form Filling Demo Page").innerText()
    expect(formMesg).toBe("Form Filling Demo Page")

    const radioBtn=insideFrame.getByRole('radio',{name:"Hi, I am the UI.Vision IDE"})
    await radioBtn.check()
    await page.waitForTimeout(2000)
    await expect(radioBtn).toBeChecked()
})
