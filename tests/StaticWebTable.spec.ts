import {test,expect} from "@playwright/test"

test("Functional Validation on Static Web Tabel",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay.html")
    await expect(page.getByText("AutoPlay")).toBeVisible()

    const tabel=page.locator("table").first()
    const column=tabel.locator("thead th")
    const rows=tabel.locator("tbody tr")
    // 1.Count number of rows in the table → Expected: 4
    // 2.Count number of columns in the table → Expected: 5
    const rowsCount=await rows.count()
    const columnCount=await column.count()
    console.log("Number of rows",rowsCount)
    console.log("Number of column",columnCount)
    expect(rowsCount).toBe(4)
    expect(columnCount).toBe(5)

    // Read all data from 2nd row (index 2 → 3rd row including header) → 
    // Expected: Keyboard | Electronics | $79 | 0 | Out of Stock
    const rowData=await rows.nth(2).locator("td").allTextContents()
    console.log("Third Row Data",rowData)
    // Read all data from the table (excluding header) 
    // → Expected: 4 rows of product data
    const tabelData:string[][]=[]
    for(let r=0;r<rowsCount;r++)
    {
        const cellValues=await rows.nth(r).locator("td").allTextContents()
        tabelData.push(cellValues)
        console.log(`Row ${r+1} :-`,cellValues)
      }
    //Print all product names → 
    //Expected: Laptop, Mouse, Keyboard, Monitor
    const productNames=[]
    for(let r=0;r<tabelData.length;r++)
    {
        const product=tabelData[r][0]
        productNames.push(product)
    }
    console.log("Product Names:-->",productNames)
    expect(productNames).toEqual( ["Laptop", "Mouse", "Keyboard", "Monitor"])
    //Print products where Stock = 0 → Expected: Keyboard
    const outOfStock=[]
     for(let r=0;r<tabelData.length;r++)
    {   
        if(tabelData[r][3]=="0")
        {
            outOfStock.push(tabelData[r][0])
        }
    }
    console.log("Out of stock Products:-->",outOfStock)
    expect(outOfStock).toEqual(['Keyboard'])

    //Print products where Status = "In Stock" → Expected: Laptop, Mouse, Monitor
    const inStock=[]
    for(let r=0;r<tabelData.length;r++)
    {
        if(tabelData[r][3]!="0")
        {
            inStock.push(tabelData[r][0])
        }
    }
    console.log("In Stock Products",inStock)
    expect(inStock).toEqual([ 'Laptop', 'Mouse', 'Monitor' ])

    //Count number of products "In Stock" → Expected: 3
    let inStockCount=0;
    for(let r=0;r<tabelData.length;r++)
    {
        if(tabelData[r][3]!="0")
        {
            inStockCount+=1
        }
    }
    expect(inStock.length).toBe(3)
    console.log("In Stock Count:-",inStockCount)

    //Count number of products "Out of Stock" → Expected: 1
    let outOfStockCount=0
     for(let r=0;r<tabelData.length;r++)
    {
        if(tabelData[r][3]=="0")
        {
            outOfStockCount+=1
        }
    }
     expect(outOfStock.length).toBe(1)
    console.log("Out of Stock Count:-",outOfStockCount)

    //Get price of a specific product (e.g., Mouse) → Expected: $29
    let price=""
    for(let r=0;r<tabelData.length;r++)
    {
        if(tabelData[r][0]=="Mouse")
        {
            price=tabelData[r][2]
        }
    }
    console.log("Price of Mouse-->",price)

    //Calculate total price of all products → Expected: 999 + 29 + 79 + 349 = 1456
    let totalPrice=0
    let allPrices=[]
    let greaterThn100=[]
    for(let r=0;r<tabelData.length;r++)
    {
        price=tabelData[r][2].replace("$","")
        totalPrice+=Number(price)
        allPrices.push(Number(price))
        if(Number(price)>100)
        {
            greaterThn100.push(tabelData[r][0])
        }
    }
    console.log("All Product Price is",totalPrice)
    //Find product with highest price → Expected: Laptop ($999)
   const highestPrice=Math.max(...allPrices)
   //Find product with lowest price → Expected: Mouse ($29)
   const lowestPrice=Math.min(...allPrices)
   //Print products with price greater than $100 → Expected: Laptop, Monitor
   console.log("Products greater than $100:-->",greaterThn100)
   expect(greaterThn100).toEqual([ 'Laptop', 'Monitor' ])

})
