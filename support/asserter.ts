import { expect, Page } from "@playwright/test";
import { Locators } from "./locators";

export class Asserter {
    private readonly locators = new Locators();

    constructor() {}

    public async verifyActiveTodoItem(page: Page, todoItem: string): Promise<void> {
        await expect(page.locator(this.locators.todoItemLabel, { hasText: todoItem }))
            .toBeVisible();
        await expect(page.locator(this.locators.todoItemLabel, { hasText: todoItem })
            .locator("..").locator("..")).not.toHaveClass(/completed/);
    }

    public async verifyCompletedTodoItem(page: Page, todoItem: string): Promise<void> {
        await expect(page.locator(this.locators.todoItemLabel, { hasText: todoItem }))
            .toBeVisible();
        await expect(page.locator(this.locators.todoItemLabel, { hasText: todoItem })
            .locator("..").locator("..")).toHaveClass(/completed/);
    }

    public async verifyEmptyTodoList(page: Page): Promise<void> {
        const todoListContainer = page.locator(this.locators.todoList);
        expect(todoListContainer).not.toBe("visible");
    }

    public async verifyActiveTodoCount(page: Page, count: number): Promise<void> {
        const todoCountText = await page.textContent(this.locators.todoItemCount);
        const activeCount = parseInt(todoCountText?.match(/\d+/)?.[0] || "0", 10);
        expect(activeCount).toBe(count);
    }

    public async verifyTotalTodoCount(page: Page, expectedCount: number): Promise<void> {
        const actualCount = await page.locator(this.locators.todoItem).count();
        expect(actualCount).toBe(expectedCount);
    }
}