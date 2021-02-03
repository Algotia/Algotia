#!/bin/env node

const puppeteer = require("puppeteer-core");
const which = require("which");
(async () => {
    if (!process.env["BROWSER"]) throw "No $BROWSER environment variable";
    const browserExecutable = await which(process.env["BROWSER"]);
    const browser = await puppeteer.launch({
        executablePath: browserExecutable,
        headless: false,
    });
    const page = await browser.newPage();
    const res = await page.goto("http://localhost:3000/backtest");
    const strategySelector = await page.$("#strategy-selector");
    await strategySelector.click();
    const firstStrategy = await page.$("#select-strategy-0");
    await firstStrategy.click();
})().catch((err) => {
    console.log(err);
});
