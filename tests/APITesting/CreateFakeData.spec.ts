import {test,expect} from "@playwright/test"
import { faker, Faker } from "@faker-js/faker"
import { request } from "http"

test("Using Faker Data",async({request})=>{
       
    const payload={
        firstname:faker.person.firstName(),
        lastname:faker.person.lastName()
    }
console.log(payload)
})