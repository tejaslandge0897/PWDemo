import {test,expect} from "@playwright/test"

test("File Upload",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")

    const singleFileUpload=page.locator("#singleFileInput")
    await singleFileUpload.setInputFiles("D:/Workspace/PWDemo/FilesUpload/Test1.txt")
    await page.getByRole('button', { name: 'Upload Single File' }).click()
    const fileStatus=page.locator("#singleFileStatus")
    await expect(fileStatus).toContainText("Test1.txt")

})
test("Multiple File Uploads",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")

    const multiFile=page.locator("#multipleFilesInput")
    await multiFile.setInputFiles(["D:/Workspace/PWDemo/FilesUpload/Test1.txt" ,
                                   "D:/Workspace/PWDemo/FilesUpload/Test2.txt"])
    await page.getByRole('button', { name: 'Upload Multiple Files' }).click()
    const fileStatus=page.locator("#multipleFilesStatus")
    await expect(fileStatus).toContainText("Test1.txt")
    await expect(fileStatus).toContainText("Test2.txt")
})
test("Download Files",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")
    const downloadPromise=page.waitForEvent("download")
    await page.locator('button:has-text("Download File")').click()
    const download=await downloadPromise
    await download.saveAs("D:/Workspace/PWDemo/FilesDownload/sample.txt")

})
