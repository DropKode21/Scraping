// import playwright from 'playwright'
const { chromium } = require('playwright')

export default async function login(req, res) {
	try {
        const browser = await chromium.launch({ headless: false })
        // const browser = await playwright.launchChromium({ headless: false })
        const page = await browser.newPage();
        await page.goto(`${req.body.providerURL}`);
        // await page.goto('https://account.apps.progressive.com/access/login?cntgrp=A');
        // await page.waitForTimeout(9000);
        await page.click("text=Log In");
        await page.fill("input[formcontrolname=userName]", req.body.username);
        await page.fill('input[formcontrolname=password]', req.body.password);
        await page.click('text="Log In"');
        await page.waitForTimeout(5000);
        res.status(200).json({ meesage: 'hi'})
        console.log({req})
	} catch (error) {
		
	}
}
