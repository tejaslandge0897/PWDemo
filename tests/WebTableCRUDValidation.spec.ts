import {test,expect} from "@playwright/test"
test.afterEach(async({page})=>{
    await page.waitForTimeout(5000)
})
test("Web Table with CRUD Validation",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")
    //The page opens successfully and the Web Table with CRUD section is displayed.
    await expect(page.getByText("Web Table with CRUD ")).toBeVisible()

    //The table is visible with the headers #, Name, Role, Action.
    const headers=await page.locator("#dynamicTable thead th").allInnerTexts()
    console.log("Headers are:",headers)
    expect(headers).toEqual(['#','Name','Role','Action'])
    
    //Name, Role, Add, + Dynamic, and Search fields are visible and enabled.
    const nameField=page.locator("#newName")
    const roleField=page.locator("#newRole")
    const addButton=page.locator("[onclick='addRow()']")
    const dynamicButton=page.locator(".btn.btn-outline").first()
    const searchTable=page.getByPlaceholder("Search table...")
    await expect(nameField).toBeVisible()
    await expect(nameField).toBeEnabled()
    await expect(roleField).toBeVisible()
    await expect(roleField).toBeEnabled()
    await expect(addButton).toBeVisible()
    await expect(addButton).toBeEnabled()
    await expect(dynamicButton).toBeVisible()
    await expect(dynamicButton).toBeEnabled()
    await expect(searchTable).toBeVisible()
    await expect(searchTable).toBeEnabled()

    //The table contains two records: Alice and Bob.
    const rows=page.locator("#dynamicTable tbody tr")
    const names=await rows.locator("td:nth-child(2)").allInnerTexts()
    expect(names).toEqual(['Alice','Bob'])
    
    //A new row for Sam Tester with role QA Lead is added to the table.
    await nameField.fill("Sam Tester")
    await roleField.fill("QA Lead")
    await addButton.click()
    
    //The table now contains 3 rows.
    const rowsAfterAdd=page.locator("#dynamicTable tbody tr")
    expect(await rowsAfterAdd.count()).toBe(3)
    const newRowData=rowsAfterAdd.filter({hasText:"Sam Tester"})
    await expect(newRowData).toBeVisible()
    await expect(newRowData).toContainText("QA Lead")

    //Search for Alice in the search box.
    //Only the Alice record is visible, and other rows are hidden.
    await searchTable.fill("Alice")
    const rowsAfterSearch=page.locator("#dynamicTable tbody tr")
    await expect(rowsAfterAdd.filter({hasText:"Alice"})).toBeVisible()
    await expect(rowsAfterAdd.filter({hasText:"Bob"})).not.toBeVisible()
    await expect(rowsAfterAdd.filter({hasText:"Sam Tester"})).not.toBeVisible()

    //Clear the search box.
    //All table rows become visible again.
    await searchTable.clear()
    const clearedNames=page.locator("#dynamicTable tbody tr")
    const namesAfterClear=clearedNames.locator("td:nth-child(2)")
    expect(await namesAfterClear.allInnerTexts()).toEqual(['Alice','Bob','Sam Tester'])
    
})