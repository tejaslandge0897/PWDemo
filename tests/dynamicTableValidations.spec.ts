import {test,expect} from "@playwright/test"

test.beforeEach(async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay.html")
    await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay")
})
test.afterEach(async({page})=>{
    await page.waitForTimeout(3000)
})
test("Test Case 1 : Chrome CPU Load Validation",async({page})=>{
    //1.Verify the page loads successfully.
    await expect(page.getByText("AutoPlay")).toBeVisible()
    //2.Verify the task table is displayed.
    await expect(page.locator("#taskTable")).toBeVisible()
    //3.Verify table contains multiple rows.
    const allRows=await page.locator("#taskTable tbody>tr").all()
    expect(allRows.length).toBeGreaterThan(0)
    //4.Verify each row has process name column.
    for(const value of allRows)
    {
            await expect(value.locator("td:nth-child(1)")).toBeVisible()
    }
    //5.Identify the row where process name = Chrome.
    let chromeFound=false
    for(const value of allRows)
    {
            const ProcessName=await value.locator("td:nth-child(1)").innerText()
            if(ProcessName==="Chrome")
            {
                expect(ProcessName).toEqual("Chrome")
                chromeFound=true
                break
            }
    }
    expect(chromeFound).toBe(true)
    //6.Extract CPU load value (should contain %).
    //7.Verify CPU load value is not empty.
    for(const value of allRows)
    {
            const ProcessName=await value.locator("td:nth-child(1)").innerText()
            if(ProcessName==="Chrome")
            {
                const cpuLoadFromTable=await value.locator("td",{hasText:"%"}).innerText()
                const cpuloadFromRedlabel=await page.locator("strong.chrome-cpu").innerText()
                expect(cpuLoadFromTable).toEqual(cpuloadFromRedlabel)
                console.log("From Table",cpuLoadFromTable)
                console.log("Red Lable",cpuloadFromRedlabel)
                await expect(value.locator("td",{hasText:"%"})).not.toBeEmpty()
                break
            }
    }
    //8.Verify yellow label (strong.chrome-cpu) is visible.
    await expect(page.locator("strong.chrome-cpu")).toBeVisible()

})
test("Test Case 2 : Firefox Memory Usage Validation",async({page})=>{
    //1.Verify the page loads successfully.
    await expect(page.getByText("AutoPlay")).toBeVisible()
    //2.Verify the table is present.
    await expect(page.locator("#taskTable")).toBeVisible()
    
    //3.Identify the row where process name = Firefox.
    //4.Extract memory value ending with MB.
    //5.Verify extracted value matches pattern (e.g., \d+ MB).
    //6.Verify memory value is not empty.
    //9.Validate case sensitivity of process name (Firefox vs firefox).
    const allRows=await page.locator("#taskTable tbody>tr").all()
    let memoryValuefrmTable
    for(const value of allRows)
    {   
        const ProcessName=await value.locator("td:nth-child(1)").innerText()
        if(ProcessName==="Firefox")
        {
        memoryValuefrmTable=await value.locator("td",{hasText:/MB$/}).innerText()
        expect(memoryValuefrmTable).toMatch(/^\d+(\.\d+)? MB$/)
        expect(value.locator("td",{hasText:/MB$/})).not.toBeEmpty()
        expect(ProcessName).toBe("Firefox")
        expect(ProcessName).not.toBe("firefox")
        break
        }
    }
    //7.Verify blue label (strong.firefox-memory) is visible.
    const memoryValuefrmLabel=page.locator("strong.firefox-memory")
    await expect(memoryValuefrmLabel).toBeVisible()
    //8.Compare extracted memory with label value.
    expect(memoryValuefrmTable).toEqual(await memoryValuefrmLabel.innerText())

})

test("Test Case 3: : Chrome Network Speed Validation",async({page})=>{
    //1.Verify table is loaded.
    await expect(page.locator("#taskTable")).toBeVisible()
    //2.Find row with process name = Chrome.
    const allRows=await page.locator("#taskTable tbody>tr").all()
    let chromeFound=false
    for(const value of allRows)
    {
            const ProcessName=await value.locator("td:nth-child(1)").innerText()
            if(ProcessName==="Chrome")
            {
                expect(ProcessName).toEqual("Chrome")
                chromeFound=true
                break
            }
    }
    expect(chromeFound).toBe(true)
    //3.Extract network speed value (should contain Mbps).
    //4.Verify value format (e.g., \d+ Mbps).
    //5.Ensure extracted value is not empty.
    let networkSpeedFromTabel
    for(let value of allRows)
    {
        const ProcessName=await value.locator("td:nth-child(1)").innerText()
        if(ProcessName==="Chrome")
        {
            networkSpeedFromTabel=await value.locator("td",{hasText:/Mbps$/}).innerText()
            expect(networkSpeedFromTabel).toMatch(/^\d+(\.\d+)? Mbps$/)
            await expect(value.locator("td",{hasText:/Mbps$/})).not.toBeEmpty()
            break
        }
    }
    //6.Verify orange label (strong.chrome-network) is visible.
    const networkSpeedFromLabel=await page.locator("strong.chrome-network").innerText()
    //7.Compare extracted value with label value.
    expect(networkSpeedFromTabel).toBe(networkSpeedFromLabel)
})
test("Test Case 4: Firefox Disk Space Validation",async({page})=>{
    //1.Verify table is displayed.
    await expect(page.locator("#taskTable")).toBeVisible()
    //2.Locate row with process name = Firefox.
    //3.Extract disk value containing MB/s.
    //4.Validate format (e.g., \d+ MB/s).
    //5.Ensure extracted value is not empty.
    //6.Verify violet label (strong.firefox-disk)
    const allRows=await page.locator("#taskTable tbody>tr").all()
    let discValueFrmTable
    for(let value of allRows)
    {
        const processnames=await value.locator("td:nth-child(1)").innerText()
        if(processnames==="Firefox")
        {
            expect(processnames).toEqual("Firefox")
            discValueFrmTable=await value.locator("td",{hasText:/MB\/s$/}).innerText()
             await expect(value.locator("td",{hasText:/MB\/s$/})).not.toBeEmpty()
            break
        }
    }
    const discValueFrmLabel=page.locator("strong.firefox-disk")
    await expect(discValueFrmLabel).toBeVisible()
    //7.Compare extracted disk value with label.
    expect(await discValueFrmLabel.innerText()).toEqual(discValueFrmTable)

})

