const { expect } = require('chai');
const { chromium } = require('playwright');

let browser, page; // Declare reusable variables
let url = 'http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/01.Messenger/index.html?_ijt=ru0oh60j81t2rg3r0pugudg98i/';

function fakeResponse(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
}

let testMessages = {
    1: {
        author: 'Kalo',
        content: 'My message'
    },
    2: {
        author: 'Misho',
        content: 'Misho posted a message'
    }
};

let testNewMessage = {
    3: {
        author: 'Ivo',
        content: 'Ivo message'
    },
};

describe('E2E tests', function() {
    this.timeout(100000);

    before(async() => {
        browser = await chromium.launch({ headless: false, slowMo: 500 }); // visualizing the actions
        //browser = await chromium.launch();
    });

    after(async() => {
        await browser.close();
    });

    beforeEach(async() => {
        page = await browser.newPage();
    });

    afterEach(async() => {
        await page.close();
    });

    describe('Tests', (done) => {
        this.timeout(100000);
        it('loads messages when refreshBtn is clicked', async() => {
            await page.route('**/jsonstore/messenger', route => {
                route.fulfill(fakeResponse(testMessages));
            });

            await page.goto(url);

            await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'),
                page.click('#refresh'),
            ]);

            let textArea = await page.$eval('#messages', (textArea) => textArea.value);

            let text = Object.values(testMessages).map(x => `${x.author}: ${x.content}`).join('\n');
            expect(textArea).to.eql(text);
        });

        it('creates new message when sendBtn is clicked', async() => {

            await page.route('**/jsonstore/messenger', (route) => {
                route.fulfill(fakeResponse(testNewMessage));
            });

            let expected = {
                author: 'Lyubo',
                content: 'New message'
            };

            await page.goto(url);

            await page.fill('#author', expected.author);
            await page.fill('#content', expected.content);

            await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'),
                page.click('#submit'),
            ]);

            let authorInput = await page.$eval('#author', a => a.value);
            let contentInput = await page.$eval('#content', c => c.value);

            expect(authorInput).to.equal('');
            expect(contentInput).to.equal('');
        });
    });
});