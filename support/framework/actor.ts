import { Browser, Page } from "@playwright/test";
import { TodoPage } from "./todo.po";

export class Actor {

    public readonly todoPage: TodoPage;

    constructor(page: Page) {
        this.todoPage = new TodoPage(page);
    }

    public async goTo(): Promise<void>;
    public async goTo(url: string): Promise<void>;
    public async goTo(url?: string): Promise<void> {
        if (url) {
            await this.todoPage.goTo(url);
        } else {
            await this.todoPage.goTo();
        }
    }

    public async shutdown(browser: Browser, page: Page): Promise<void> {
        await page.close();
        await browser.close();
    }

    public async addTodoItem(todoItem: string): Promise<void> {
        await this.todoPage.todoInput.fill(todoItem)
            .then(async () => {
                await this.todoPage.todoInput.press("Enter");
            });
    }

    public async toggleAllTodosCompletion(): Promise<void> {
        await this.todoPage.toggleAll.click();
    }

    public async deleteTodoItem(todoItem: string): Promise<void> {
        const deleteButton = this.todoPage.getTodoItemDeleteButtonByText(todoItem);
        await deleteButton.dispatchEvent('click');
    }

    public async toggleTodoItemCompletion(todoItem: string): Promise<void> {
        const toggle = this.todoPage.getTodoItemToggleByText(todoItem);
        await toggle.click();
    }

    public async updateTodoItem(oldTodoItem: string, newTodoItem: string): Promise<void> {
        const itemLabel = this.todoPage.getTodoItemLabelByText(oldTodoItem);
        await itemLabel.dblclick();
        const inputLocator = this.todoPage.getLastTodoInput();
        await inputLocator.fill(newTodoItem);
        await inputLocator.press("Enter");
    }

    public async filterCompletedTodos(): Promise<void> {
        await this.todoPage.filterCompleted.click();
    }

    public async filterActiveTodos(): Promise<void> {
        await this.todoPage.filterActive.click();
    }

    public async filterAllTodos(): Promise<void> {
        await this.todoPage.filterAll.click();
    }

}