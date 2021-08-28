const {chromium} = require('playwright');
let expect = require('chai').expect;
let assert = require('assert');


describe('test for message app', function () {
    this.timeout(10000);
    it('should check empty inputs', function () {
        (async () => {
            const browser = await chromium.launch({headless: false, slowMo: 50});

            let page = await browser.newPage();
            await page.goto('http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/01.Messenger/index.html?_ijt=nrr1o6dq5f8avlnqd2dgtuvg1h');

            let inputAuthor = document.getElementById('author');
            let inputMessage = document.getElementById('content');

            expect(inputAuthor.textContent, '');
            assert(inputMessage.textContent ,'');
            await browser.close();
        })();
    });

    it('should check full inputs', function () {
        (async () => {
            const browser = await chromium.launch({headless: false, slowMo: 50});
            let page = await browser.newPage();
            await page.goto('http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/01.Messenger/index.html?_ijt=nrr1o6dq5f8avlnqd2dgtuvg1h');

            let inputAuthor = document.getElementById('author');
            let inputMessage = document.getElementById('content');
            await page.fill('#author', 'Author');
            await page.fill('#content','Content')
            expect(inputAuthor.textContent, 'Author');
            assert(inputMessage.textContent ,'Content');
            await browser.close();
        })();
    });

    it('should click and load info', async function () {

            const browser = await chromium.launch({headless: false, slowMo: 50});
            let page = await browser.newPage();
            await page.goto('http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/01.Messenger/index.html?_ijt=986ko3jbuf4ve3vnl0512utqu');

            let messages = document.getElementById('messages');

            await page.click('input .refresh');

            expect(messages.textContent !== '' );

            await browser.close();
    });
})
