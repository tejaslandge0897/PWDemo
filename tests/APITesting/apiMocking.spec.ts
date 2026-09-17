import { test, expect } from "@playwright/test"

test.describe.configure({ timeout: 30000 })
test("Mocking API", async ({ page }) => {

    await page.route("**/api/v1/fruits", async (route) => {
        const fakerResponse = [
            { name: "XYZ", id: 1 },
            { name: "ABC", id: 2 }
        ]
        await route.fulfill(
            {
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(fakerResponse)
            }
        )
    })
    await page.goto("https://demo.playwright.dev/api-mocking")
    await expect(page.getByText("XYZ")).toBeVisible()
    await expect(page.getByText("ABC")).toBeVisible()
    await page.waitForTimeout(2000)
})