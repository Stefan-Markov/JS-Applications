const { chromium } = require('playwright');
const { expect } = require('chai');

const host = 'http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/02.Book-Library/index.html';

let browser;
let context;
let page;

describe('E2E tests', function(done) {
    this.timeout(600000);

    before(async() => {
        // browser = await chromium.launch({ headless: false, slowMo: 500 });
        browser = await chromium.launch();
    });

    after(async() => {
        await browser.close();
    });

    beforeEach(async() => {
        this.timeout(600000);
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(host);
    });

    afterEach(async() => {
        await page.close();
        await context.close();
    });

    describe('Home', () => {
        it('load all books', async() => {
            // Go to http://localhost:3000/
            await page.goto('http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/02.Book-Library/index.html');
            // Click text=LOAD ALL BOOKS
            await page.click('text=LOAD ALL BOOKS');
            await page.waitForSelector('tbody tr td');
            const firstBook = await page.$eval('tbody tr:first-child :first-child', (el) => el.textContent.trim());
            const firstAuthor = await page.$eval('tbody tr:first-child :nth-child(2)', (el) => el.textContent.trim());

            const secondBook = await page.$eval('tbody tr:nth-child(2) :first-child', (el) => el.textContent.trim());
            const secondAuthor = await page.$eval('tbody tr:nth-child(2) :nth-child(2)', (el) => el.textContent.trim());

            expect(firstBook).to.eql('Harry Potter and the Philosopher\'s Stone');
            expect(firstAuthor).to.eql('J.K.Rowling');

            expect(secondBook).to.eql('C# Fundamentals');
            expect(secondAuthor).to.eql('Svetlin Nakov');
        });

        it('create book', async() => {
            // Go to http://localhost:3000/
            await page.goto('http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/02.Book-Library/index.html?_ijt=hold5oijsdnktqk2tag6ctgk94/');
            // Click [placeholder="Title..."]
            await page.click('[placeholder="Title..."]');
            // Fill [placeholder="Title..."]
            await page.fill('[placeholder="Title..."]', 'JS');
            // Click [placeholder="Author..."]
            await page.click('[placeholder="Author..."]');
            // Fill [placeholder="Author..."]
            await page.fill('[placeholder="Author..."]', 'PAPAZOV');
            // Click text=Submit
            await page.click('text=Submit');
            // Click text=LOAD ALL BOOKS
            await page.click('text=LOAD ALL BOOKS');
            await page.waitForSelector('tbody tr td');

            const createdBook = await page.$eval('tbody tr:nth-child(3) :first-child', (el) => el.textContent.trim());
            const createdAuthor = await page.$eval('tbody tr:nth-child(3) :nth-child(2)', (el) => el.textContent.trim());

            expect(createdBook).to.eql('JS');
            expect(createdAuthor).to.eql('PAPAZOV');
        });

        it('edit book', async() => {

            // Go to http://localhost:3000/
            await page.goto('http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/02.Book-Library/index.html');
            // Click text=LOAD ALL BOOKS
            await page.click('text=LOAD ALL BOOKS');
            // Click text=Edit
            await page.click('text=Edit');
            // Click text=Edit FORM TITLE AUTHOR Save >> [placeholder="Title..."]
            await page.click('text=Edit FORM TITLE AUTHOR Save >> [placeholder="Title..."]');
            // Click text=Edit FORM TITLE AUTHOR Save >> [placeholder="Author..."]
            await page.click('text=Edit FORM TITLE AUTHOR Save >> [placeholder="Author..."]');
            // Fill text=Edit FORM TITLE AUTHOR Save >> [placeholder="Author..."]
            await page.fill('text=Edit FORM TITLE AUTHOR Save >> [placeholder="Author..."]', 'J.K.Rowling');
            // Click text=Save
            await page.click('text=Save');
            // Click text=LOAD ALL BOOKS
            await page.click('text=LOAD ALL BOOKS');
            // Click text=J.K.Rowlingaaaaaa
            await page.click('text=J.K.Rowling');
            await page.waitForSelector('tbody tr td');

            const firstBook = await page.$eval('tbody tr:first-child :first-child', (el) => el.textContent.trim());
            const firstAuthor = await page.$eval('tbody tr:first-child :nth-child(2)', (el) => el.textContent.trim());
            expect(firstBook).to.eql('Harry Potter and the Philosopher\'s Stone');
            expect(firstAuthor).to.eql('J.K.Rowling');
        });

        it('delete book', async() => {
            // Go to http://localhost:3000/
            await page.goto('http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/02.Book-Library/index.html');
            // Click text=LOAD ALL BOOKS
            await page.click('text=LOAD ALL BOOKS');
            // Click text=C# Fundamentals Svetlin Nakov Edit Delete >> :nth-match(button, 2)
            page.on('dialog', (dialog) => {
                dialog.accept();
            });

            await page.click('tbody tr:last-child .deleteBtn');
            await page.click('#loadBooks');
            // Click text=LOAD ALL BOOKS

            await page.waitForSelector('tbody tr td');

            const secondBook = await page.$eval('tbody tr:nth-child(2) :first-child', (el) => el.textContent.trim());
            const secondAuthor = await page.$eval('tbody tr:nth-child(2) :nth-child(2)', (el) => el.textContent.trim());

            expect(secondBook).to.eql('C# Fundamentals');
            expect(secondAuthor).to.eql('PAPAZOV');
        });

    });
});