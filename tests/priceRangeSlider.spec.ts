import {test,expect} from "@playwright/test"

test("Automating Price Range Slider",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")
    await expect(page.getByText("Autoplay")).toBeVisible()

    //•Minimum slider handle
    //•Maximum slider handle
    //•Price range textbox
    const minSlider=page.locator(".ui-slider-handle.ui-corner-all").first()
    const maxSlider=page.locator(".ui-slider-handle.ui-corner-all").last()
    const priceText=page.locator('#amount:visible')
   
    //Move the minimum slider to $0 using the keyboard.
    //•Move the maximum slider to $500 using the keyboard.
    await minSlider.focus()
    await minSlider.press("Home")
    await maxSlider.focus()
    await maxSlider.press("End")

    //Move the minimum slider until it reaches $100.

    const priceRange=await priceText.textContent()
    console.log(priceRange)
    await page.waitForTimeout(3000)
})