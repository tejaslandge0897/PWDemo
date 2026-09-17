import {test,expect} from "@playwright/test"

test("Drag and Drop",async({page})=>{
    await page.goto("http://demo.guru99.com/test/drag_drop.html")
    const frstDragElement=page.locator('a').filter({ hasText: '5000' }).first()
    const frstDrpLocation=page.locator("#amt7")
    
    const scndDragElement=page.getByText('BANK', { exact: true })
    const scndDropLocation=page.locator("#bank")

    await frstDragElement.dragTo(frstDrpLocation)
    await scndDragElement.dragTo(scndDropLocation)

    await page.waitForTimeout(2000)
})
test("Drag And Drop",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")
    const dragElement=page.getByText('Drag me', { exact: true })
    const dropLocation=page.getByText('Drop zone', { exact: true })
    page.on('dialog',async dialog=>{
    expect(dialog.message()).toContain("Dropped!")
    await dialog.accept()
    })
    await dragElement.focus()
    await dragElement.dragTo(dropLocation)
    await page.waitForTimeout(3000)
})