'use strict'

const { test, trait } = use('Test/Suite')('Moondays')
trait("Test/ApiClient");

test('Succes new moons 2020', async ({ client }) => {
    const response = await client.get('/new-moons/2020').end()
    response.assertStatus(200)
})

test('Succes new moons 2010', async ({ client }) => {
    const response = await client.get('/new-moons/2010').end()
    response.assertStatus(200)
})

test('Succes new moons 2008', async ({ client }) => {
    const response = await client.get('/new-moons/2008').end()
    response.assertStatus(200)
})

test('Succes new moons 2025', async ({ client }) => {
    const response = await client.get('/new-moons/2025').end()
    response.assertStatus(200)
})

test('Succes new moons 2030', async ({ client }) => {
    const response = await client.get('/new-moons/2030').end()
    response.assertStatus(200)
})