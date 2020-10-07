'use strict'

const { test, trait } = use('Test/Suite')('Moondays')
trait("Test/ApiClient");

test('Succes month phases oct 2020', async ({ client }) => {
    const response = await client.get('/month-phases/month/10/year/2020').end()
    response.assertStatus(200)
})

test('Succes month phases sept 2002', async ({ client }) => {
    const response = await client.get('/month-phases/month/9/year/2002').end()
    response.assertStatus(200)
})

test('Succes month phases aug 1985', async ({ client }) => {
    const response = await client.get('/month-phases/month/8/year/1985').end()
    response.assertStatus(200)
})

test('Succes month phases jun 2040', async ({ client }) => {
    const response = await client.get('/month-phases/month/6/year/2040').end()
    response.assertStatus(200)
})

