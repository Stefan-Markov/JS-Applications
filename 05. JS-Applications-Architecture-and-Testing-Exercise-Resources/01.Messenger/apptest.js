const { chromium } = require("playwright");
const { assert, expect } = require("chai");

let browser, page;

describe("test", () => {
    before(async () => {
        browser = await chromium.launch();
    });
    after(async () => {
        browser = await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    describe("send", () => {
        let mockBaseContent = {
            abc: { _id: "абв", author: "паскал", content: "алгебра" },
            1: { _id: "1", author: "питагор", content: "математика" },
            2: { _id: "2", author: "евклипис", content: "геометрия" },
        };
        let fakeRes = {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mockBaseContent[2]),
        };

        it("call", async () => {
            await page.route("**/jsonstore/messenger", (route) => route.fulfill(fakeRes));
            await page.goto("http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/01.Messenger/index.html?_ijt=ru0oh60j81t2rg3r0pugudg98i");
            await page.fill("#author", "12");
            await page.fill("#content", "21");

            let [res] = await Promise.all([
                page.waitForResponse("**/jsonstore/messenger"),
                page.click("#submit"),
            ]);

            res = await res.json();
            assert.deepEqual(res, mockBaseContent[2]);
        });
    });

    describe("load Message", () => {
        let testData = {
            abc: { _id: "вба", author: "лаксап", content: "арбегра" },
            1: { _id: "вба", author: "паскал", content: "алгебра" },
        };
        let fakeRes = {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testData),
        };

        it("should call server", async () => {
            await page.route("**/jsonstore/messenger", (route) => route.fulfill(fakeRes));
            await page.goto("http://localhost:63342/js-applications/05.%20JS-Applications-Architecture-and-Testing-Exercise-Resources/01.Messenger/index.html?_ijt=ru0oh60j81t2rg3r0pugudg98i");

            let [res] = await Promise.all([
                page.waitForResponse("**/jsonstore/messenger"),
                page.click("#refresh"),
            ]);

            res = await res.json();
            assert.deepEqual(res, testData);
        });
    });
});