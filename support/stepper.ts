import { Browser, Page } from "@playwright/test";
import { Locators } from "./locators";

export class Stepper {

    private readonly locators = new Locators();

    constructor() {}

    public async navigateTo(page: Page, url: string): Promise<void> {
        await page.goto(url);
    }

    public async shutdown(browser: Browser, page: Page): Promise<void> {
        await page.close();
        await browser.close();
    }

    public async addTodoItem(page: Page, todoItem: string): Promise<void> {
        await page.locator(this.locators.todoInput).fill(todoItem)
            .then(async () => {
                await page.locator(this.locators.todoInput).press("Enter");
            });
    }

    public async toggleAllTodosCompletion(page: Page): Promise<void> {
        await page.locator(this.locators.toggleAll).click();
    }

    public async deleteTodoItem(page: Page, todoItem: string): Promise<void> {
        const itemLocator = page.locator(this.locators.todoItem, { hasText: todoItem });
        await itemLocator.locator(this.locators.todoItemDeleteButton).dispatchEvent('click');
    }

    public async toggleTodoItemCompletion(page: Page, todoItem: string): Promise<void> {
        const itemLocator = page.locator(this.locators.todoItem, { hasText: todoItem });
        await itemLocator.locator(this.locators.todoItemToggle).click();
    }

    public async updateTodoItem(page: Page, oldTodoItem: string, newTodoItem: string): Promise<void> {
        const itemLocator = page.locator(this.locators.todoItemLabel, { hasText: oldTodoItem });
        await itemLocator.dblclick();
        const inputLocator = page.locator(this.locators.todoInput).last();
        await inputLocator.fill(newTodoItem);
        await inputLocator.press("Enter");
    }

    public async filterCompletedTodos(page: Page): Promise<void> {
        await page.locator(this.locators.filterCompleted).click();
    }

    public async filterActiveTodos(page: Page): Promise<void> {
        await page.locator(this.locators.filterActive).click();
    }

    public async filterAllTodos(page: Page): Promise<void> {
        await page.locator(this.locators.filterAll).click();
    }

}