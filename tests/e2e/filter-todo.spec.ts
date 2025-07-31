import { test } from '@playwright/test';
import { Asserter } from 'support/asserter';
import { Stepper } from 'support/stepper';
import { todoItemsFilter, pages } from 'support/test-data';

const stepper: Stepper = new Stepper();
const asserter: Asserter = new Asserter();

test.describe('Filter todos', () => {

  test.beforeEach(async ({ page }) => {
    await stepper.navigateTo(page, pages.todoList);
    for(const item of todoItemsFilter) {
      await stepper.addTodoItem(page, item);
    }
    await asserter.verifyActiveTodoCount(page, todoItemsFilter.length);
    await stepper.toggleTodoItemCompletion(page, todoItemsFilter[0]);
  });

  test.describe('Filter completed todos', () => {

    test('should filter completed todos', async ({ page }) => {
      await stepper.filterCompletedTodos(page);
      await asserter.verifyCompletedTodoItem(page, todoItemsFilter[0]);
      await asserter.verifyActiveTodoCount(page, 3);
      await asserter.verifyTotalTodoCount(page, 1);
    });

  });

  test.describe('Filter active todos', () => {

    test('should filter active todos', async ({ page }) => {
      await stepper.filterActiveTodos(page);
      await asserter.verifyActiveTodoItem(page, todoItemsFilter[1]);
      await asserter.verifyActiveTodoItem(page, todoItemsFilter[2]);
      await asserter.verifyActiveTodoItem(page, todoItemsFilter[3]);
      await asserter.verifyActiveTodoCount(page, 3);
      await asserter.verifyTotalTodoCount(page, 3);
    });

  });

  test.describe('Filter all todos', () => {

    test.beforeEach(async ({ page }) => {
        await stepper.filterActiveTodos(page);
    });

    test('should filter all todos', async ({ page }) => {
      await stepper.filterAllTodos(page);
      await asserter.verifyCompletedTodoItem(page, todoItemsFilter[0]);
      await asserter.verifyActiveTodoItem(page, todoItemsFilter[1]);
      await asserter.verifyActiveTodoItem(page, todoItemsFilter[2]);
      await asserter.verifyActiveTodoItem(page, todoItemsFilter[3]);
      await asserter.verifyActiveTodoCount(page, 3);
      await asserter.verifyTotalTodoCount(page, 4);
    });

  });

});