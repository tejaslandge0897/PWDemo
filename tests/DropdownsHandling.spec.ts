import {test,expect} from "@playwright/test"

test.describe("Handling Dropdown",()=>{

test.beforeEach("Launch Dropdowns",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")
    await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay")
})
test("Single Select Dropdown (Country)",async({page})=>{
    const countrySelect=page.locator("#country")
    await expect(countrySelect).toBeVisible()
    await expect(countrySelect).toHaveValue("india")
    await countrySelect.selectOption({label:"USA"})
    await page.waitForTimeout(3000)
    await countrySelect.selectOption({value:"uk"})
    await page.waitForTimeout(3000)
    await countrySelect.selectOption({index:3})
    await page.waitForTimeout(3000)
    await countrySelect.selectOption({value:"france",label:"France"})
    await page.waitForTimeout(3000)
    const drpOptions=countrySelect.locator("option")
    expect(await drpOptions.count()).toBe(5)
    const dropDwnValues=await drpOptions.allTextContents()
    for(const option of dropDwnValues){
        console.log(option)
    }
    expect(dropDwnValues).toContain("Germany")
})
test("Multi Select Dropdown (Colors)",async({page})=>{
    const colorsDrpDwn=page.locator("#colors")
    await expect(colorsDrpDwn).toBeVisible()
    await expect(colorsDrpDwn).toHaveValue("blue")

    await colorsDrpDwn.selectOption([{label:"Red"}, {label:"Green"}, {label:"Yellow"}])
    await expect(colorsDrpDwn).toHaveValues(["red","green","yellow"])
    await page.reload()

    await colorsDrpDwn.selectOption([{value:"red"}, {value:"green"}, {value:"yellow"}])
    await page.waitForTimeout(3000)
    await expect(colorsDrpDwn).toHaveValues(["red","green","yellow"])
    await page.reload()

    await colorsDrpDwn.selectOption([{index:0}, {index:2}, {index:3}])
    await page.waitForTimeout(3000)
    await expect(colorsDrpDwn).toHaveValues(["red","green","yellow"])
})
test("Test Cases-Sorted Dropdown Validation",async({page})=>{
    const drpDwnSorted= page.locator("#sorted")
    await expect(drpDwnSorted).toBeVisible()

    const allListItems= await drpDwnSorted.locator("option").allTextContents()
    const originalList=[...allListItems]
    const sortedList=[...allListItems].sort()
    
    console.log("Original List",originalList)
    console.log("Sorted List",sortedList)
    expect(originalList).toEqual(sortedList)
})
})