import {test,expect} from "@playwright/test"

test.beforeEach("Launch the application",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")
    await expect(page.getByText("Autoplay")).toBeVisible()
})
test("Simple Alert",async({page})=>{

    page.on('dialog',async dialog =>{
        expect(dialog.type()).toBe("alert")
        expect(dialog.message()).toContain("Simple alert!")
        dialog.accept()
    })
   
    await page.getByRole('button', { name: 'Simple' }).click()
})
test("Confirm Alert",async({page})=>{
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toBe("confirm")
        expect(dialog.message()).toContain("Confirm?")
        dialog.dismiss()
    })
    await page.getByRole('button', { name: 'Confirm' }).click()
})
test("Prompt Alert",async({page})=>{
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toBe("prompt")
        expect(dialog.message()).toContain("Enter name")
        dialog.accept("Tejas")
    })
    await page.getByRole('button', { name: 'Prompt' }).click()
})
