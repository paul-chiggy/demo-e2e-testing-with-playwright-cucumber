import { expect, Page } from "@playwright/test";
import { TodoPage } from "./todo.po";

export class Asserter {
    private readonly todoPage: TodoPage;

    constructor(page: Page) {
        this.todoPage = new TodoPage(page);
    }

    public async verifyActiveTodoItem(todoItem: string): Promise<void> {
        const itemLabel = this.todoPage.getTodoItemLabelByText(todoItem);
        const itemContainer = this.todoPage.getTodoItemByLabel(todoItem);
        
        await expect(itemLabel).toBeVisible();
        await expect(itemContainer).not.toHaveClass(/completed/);
    }

    public async verifyCompletedTodoItem(todoItem: string): Promise<void> {
        const itemLabel = this.todoPage.getTodoItemLabelByText(todoItem);
        const itemContainer = this.todoPage.getTodoItemByLabel(todoItem);
        
        await expect(itemLabel).toBeVisible();
        await expect(itemContainer).toHaveClass(/completed/);
    }

    public async verifyEmptyTodoList(): Promise<void> {
        const todoListContainer = this.todoPage.todoList;
        expect(todoListContainer).not.toBe("visible");
    }

    public async verifyActiveTodoCount(count: number): Promise<void> {
        const todoCountText = await this.todoPage.todoItemCount.textContent();
        const activeCount = Number.parseInt(todoCountText?.match(/\d+/)?.[0] || "0", 10);
        expect(activeCount).toBe(count);
    }

    public async verifyTotalTodoCount(expectedCount: number): Promise<void> {
        const actualCount = await this.todoPage.todoItem.count();
        expect(actualCount).toBe(expectedCount);
    }
}