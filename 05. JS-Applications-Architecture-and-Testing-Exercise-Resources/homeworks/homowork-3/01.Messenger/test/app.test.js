const {chromium} = require('playwright');
const {expect} = require('chai');

let route = 'http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/homeworks/homowork-3/01.Messenger/index.html?_ijt=t7eg4ucf7hmaqr5i05v5d886hs';
let browser;
let page;

// Тестове се пуснат директно с F5, след като пуснете html-a с Live-server
function fakeResponse(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

let createMassage = {
    3: {
        author: 'Pesho',
        content: 'Pesho Massage',
        _id: 3
    }
}

let testMassages = {
    1: {
        author: 'Misho',
        content: 'Massage'
    },
    2: {
        author: 'Gosho',
        content: 'My Massage'
    }
}

describe('Test', () => {

    before(async () => {
        browser = await chromium.launch({headless: false, slowMo: 200})
    });

    after(async () => {
        await browser.close()
    });

    beforeEach(async () => {
        page = await browser.newPage()
    });

    afterEach(async () => {
        await page.close()
    });

    describe('load massages', () => {

        it('should call server', async () => {

            await page.route('**/jsonstore/messenger', route => route.fulfill(fakeResponse(testMassages)));

            await page.goto(route)
            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'),
                page.click('#refresh')
            ]);
            let result = await response.json();
            expect(result).to.eql(testMassages)

        })

        it('should show text in textarea', async () => {

            await page.route('**/jsonstore/messenger', route => route.fulfill(fakeResponse(testMassages)));

            await page.goto(route)
            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'),
                page.click('#refresh')
            ]);
            let textAreaText = await page.$eval('#messages', (textArea) => textArea.value);
            let text = Object.values(testMassages)
                .map(x => `${x.author}: ${x.content}`)
                .join('\n');
            expect(textAreaText).to.eql(text);

        })
    });

    describe('create massage', () => {

        it('should call server with correct data', async () => {
            let requestData = undefined;
            let expected = {
                author: 'Pesho',
                content: 'Pesho Massage'
            }
            await page.route('**/jsonstore/messenger', (route, request) => {

                if (request.method().toLowerCase() === 'post') {
                    requestData = request.postData();
                    route.fulfill(fakeResponse(createMassage));
                }

            });

            await page.goto(route);

            await page.fill('#author', expected.author);
            await page.fill('#content', expected.content);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'),
                page.click('#submit')
            ]);

            let result = JSON.parse(requestData);
            expect(result).to.eql(expected);

        })

        it('should clear input form', async () => {
            let requestData = undefined;
            let expected = {
                author: 'Pesho',
                content: 'Pesho Massage'
            }
            await page.route('**/jsonstore/messenger', (route, request) => {

                if (request.method().toLowerCase() === 'post') {
                    requestData = request.postData();
                    route.fulfill(fakeResponse(createMassage));
                }

            });

            await page.goto(route);

            await page.fill('#author', expected.author);
            await page.fill('#content', expected.content);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'),
                page.click('#submit')
            ]);
            let authorValue = await page.$eval('#author', a => a.value);
            let contentValue = await page.$eval('#content', c => c.value);


            expect(authorValue).to.eql('');
            expect(contentValue).to.eql('');

        })
    })
})