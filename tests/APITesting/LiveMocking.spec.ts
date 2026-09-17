import { test, expect } from "@playwright/test"

test.describe.configure({timeout:30000})
test("Live data Mocking", async ({ page }) => {

    await page.route("**/api/v1/fruits", async (route) => {
        const response = await route.fetch()
        const json = await response.json()

        json.push({ name: "Tejas", id: 181 })

        await route.fulfill(
            {
                json
            })
    })
    await page.goto("https://demo.playwright.dev/api-mocking")
    await expect(page.getByText("Tejas")).toBeVisible()
    await page.waitForTimeout(2000)
})