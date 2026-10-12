import { profileEnd } from "node:console"
import {test, expect} from "@playwright/test"



test("Practice",async({page})=>{
    // const browser=await playwrightConfig.    
    // const context=browser.newContext()
    // const newPage=context.newPage()    
    await page.keyboard.press("A")

    await page.locator(".css").selectOption({index:3})

    await page.locator("32").check()
    
    page.on("dialog",async dialog =>{
            await dialog.accept()
    })

    const fame= page.frameLocator("framename")
    fame.getByLabel("xyz").click()

    const starage=page.context().storageState({path:"./xyz.json"})

})


type user1={username:string,password:string}
type user2={email:string,mobile:string}
type user3={firstname:string,lastname:string}

type userDetails=user1 & user2 & user3 

const data:userDetails={
    username:"tejas123",
    password:"tejas@123",
    email:"tejas.landge@gmail.com",
    mobile:"7887878741",
    firstname:"Tejas",
    lastname:"landge"
}

interface user{
    username:string
    password:string

}
type user5={
    email:string
    mobilenum:number
}

const array:user[]=[{username:"tejas",password:"123"},{username:"shubham",password:"7198"}]
console.log("***********************")
enum Browser {
    Chromium="chromium",
    Firefox="firefox",
    Safari="safari"
}
console.log(Browser.Chromium)
/* function launchBrowser(browser:Browser)
{
    console.log(browser)
    return `${browser}`
}
launchBrowser(Browser.Chromium)
 */

type enviroment="QA"|"Dev"|"Prod"

let Enviroment:enviroment="Dev"