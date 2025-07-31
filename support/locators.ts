export class Locators {
    public readonly todoInput = '[data-testid="text-input"]';
    public readonly todoListContainer = '[data-testid="main"]';
    public readonly toggleAll = '[data-testid="toggle-all"]';
    public readonly todoItem = '[data-testid="todo-item"]';
    public readonly todoList = '[data-testid="todo-list"]';
    public readonly todoListFooter = '[data-testid="footer"]';
    public readonly todoItemCount = 'span[class="todo-count"]';
    public readonly clearCompletedButton = 'button[class="clear-completed"]';
    public readonly todoItemToggle = '[data-testid="todo-item-toggle"]';
    public readonly todoItemLabel = '[data-testid="todo-item-label"]';
    public readonly todoItemDeleteButton = '[data-testid="todo-item-button"]';
    public readonly filterAll = 'a[href="#/"]';
    public readonly filterActive = 'a[href="#/active"]';
    public readonly filterCompleted = 'a[href="#/completed"]';
}