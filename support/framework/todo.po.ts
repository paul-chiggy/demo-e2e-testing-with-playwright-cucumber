import { Locator, Page } from "@playwright/test";

export class TodoPage {

    public readonly page: Page;

    // Public locators for query purposes
    public readonly todoInput: Locator;
    public readonly todoListContainer: Locator;
    public readonly toggleAll: Locator;
    public readonly todoItem: Locator;
    public readonly todoList: Locator;
    public readonly todoListFooter: Locator;
    public readonly todoItemCount: Locator;
    public readonly clearCompletedButton: Locator;
    public readonly filterAll: Locator;
    public readonly filterActive: Locator;
    public readonly filterCompleted: Locator;

    constructor(page: Page) {
        this.page = page;
        // Selector definitions
        this.todoInput = page.locator('[data-testid="text-input"]');
        this.todoListContainer = page.locator('[data-testid="main"]');
        this.toggleAll = page.locator('[data-testid="toggle-all"]');
        this.todoItem = page.locator('[data-testid="todo-item"]');
        this.todoList = page.locator('[data-testid="todo-list"]');
        this.todoListFooter = page.locator('[data-testid="footer"]');
        this.todoItemCount = page.locator('span[class="todo-count"]');
        this.clearCompletedButton = page.locator('button[class="clear-completed"]');
        this.filterAll = page.locator('a[href="#/"]');
        this.filterActive = page.locator('a[href="#/active"]');
        this.filterCompleted = page.locator('a[href="#/completed"]');
    }

    /**
     * Navigate to the todo list page
     */
    public async goTo(): Promise<void> {
        await this.page.goto('/examples/react/dist');
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Get a todo item container by its text label
     */
    public getTodoItemByLabel(text: string): Locator {
        return this.page.locator('[data-testid="todo-item"]', { hasText: text });
    }

    /**
     * Get a todo item label (text element) by its text
     */
    public getTodoItemLabelByText(text: string): Locator {
        return this.page.locator('[data-testid="todo-item-label"]', { hasText: text });
    }

    /**
     * Get the delete button for a specific todo item by its text label
     */
    public getTodoItemDeleteButtonByText(text: string): Locator {
        const itemLocator = this.getTodoItemByLabel(text);
        return itemLocator.locator('[data-testid="todo-item-button"]');
    }

    /**
     * Get the toggle checkbox for a specific todo item by its text label
     */
    public getTodoItemToggleByText(text: string): Locator {
        const itemLocator = this.getTodoItemByLabel(text);
        return itemLocator.locator('[data-testid="todo-item-toggle"]');
    }

    /**
     * Get the last todo input field (used during edit mode)
     */
    public getLastTodoInput(): Locator {
        return this.todoInput.last();
    }
}