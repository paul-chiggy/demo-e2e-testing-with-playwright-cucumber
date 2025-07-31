import { Browser, BrowserContext, BrowserType, Page } from "@playwright/test";

export class Setup {

    private readonly _browser: Browser;
    public get browser(): Browser {
        return this._browser;
    }

    private readonly _page: Page;
    public get page(): Page {
        return this._page;
    }

    private readonly _context: BrowserContext;
    public get context(): BrowserContext {
        return this._context;
    }

    private constructor(
        browser: Browser,
        page: Page,
        context: BrowserContext
    ) {
        this._browser = browser;
        this._page = page;
        this._context = context;
    }

    public static async create(
        browserType: BrowserType<unknown>,
        headless: boolean = true
    ): Promise<Setup> {
        const browser = await browserType.launch({ headless: headless });
        const page = await browser.newPage();
        const context = await browser.newContext();
        return new Setup(browser, page, context);
    }

    public async shutdown(): Promise<void> {
        await this._page.close();
        await this._browser.close();
    }

}