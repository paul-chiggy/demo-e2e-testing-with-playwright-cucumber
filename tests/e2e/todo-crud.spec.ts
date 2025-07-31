import { test } from '@playwright/test';
import { Asserter } from 'support/asserter';
import { Stepper } from 'support/stepper';
import { todoItemsCrud, pages } from 'support/test-data';

const stepper: Stepper = new Stepper();
const asserter: Asserter = new Asserter();

test.describe('Todo CRUD operations', () => {

  test.beforeEach(async ({ page }) => {
    await stepper.navigateTo(page, pages.todoList);
  });

  test.describe('Add todos', () => {

    test('should add a new todo item', async ({ page }) => {
      await asserter.verifyEmptyTodoList(page);
      await stepper.addTodoItem(page, todoItemsCrud[0]);
      await asserter.verifyActiveTodoItem(page, todoItemsCrud[0]);
      await asserter.verifyActiveTodoCount(page, 1);
      await asserter.verifyTotalTodoCount(page, 1);
    });

  });

  test.describe('Update todos', () => {

    test.beforeEach(async ({ page }) => {
      await stepper.addTodoItem(page, todoItemsCrud[0]);
    });

    test('should update an existing todo item', async ({ page }) => {      
      await asserter.verifyActiveTodoItem(page, todoItemsCrud[0]);
      await stepper.updateTodoItem(page, todoItemsCrud[0], todoItemsCrud[1]);
      await asserter.verifyActiveTodoItem(page, todoItemsCrud[1]);
      await asserter.verifyActiveTodoCount(page, 1);
      await asserter.verifyTotalTodoCount(page, 1);
    });

  });

  test.describe('Complete & Revert completion of todos', () => {

    test.beforeEach(async ({ page }) => {
      await stepper.addTodoItem(page, todoItemsCrud[0]);
      await stepper.addTodoItem(page, todoItemsCrud[1]);
      await asserter.verifyActiveTodoItem(page, todoItemsCrud[0]);      
      await asserter.verifyActiveTodoItem(page, todoItemsCrud[1]);
    });

    test.describe('Complete todos', () => {

      test('should complete all todos at once', async ({ page }) => {
        await stepper.toggleAllTodosCompletion(page);
        await asserter.verifyCompletedTodoItem(page, todoItemsCrud[0]);
        await asserter.verifyCompletedTodoItem(page, todoItemsCrud[1]);
        await asserter.verifyActiveTodoCount(page, 0);
        await asserter.verifyTotalTodoCount(page, 2);
      });

      test('should complete a todo item', async ({ page }) => {
        await stepper.toggleTodoItemCompletion(page, todoItemsCrud[0]);
        await asserter.verifyCompletedTodoItem(page, todoItemsCrud[0]);
        await asserter.verifyActiveTodoItem(page, todoItemsCrud[1]);
        await asserter.verifyActiveTodoCount(page, 1);
        await asserter.verifyTotalTodoCount(page, 2);
      });

    });

    test.describe('Revert completion of todos', () => {

      test.beforeEach(async ({ page }) => {
        await stepper.toggleAllTodosCompletion(page);
      });

      test('should revert completion of all todos', async ({ page }) => {
        await stepper.toggleAllTodosCompletion(page);
        await asserter.verifyActiveTodoItem(page, todoItemsCrud[0]);
        await asserter.verifyActiveTodoItem(page, todoItemsCrud[1]);
        await asserter.verifyActiveTodoCount(page, 2);
        await asserter.verifyTotalTodoCount(page, 2);
      });

      test('should revert completion of a todo item', async ({ page }) => {
        await stepper.toggleTodoItemCompletion(page, todoItemsCrud[0]);
        await asserter.verifyCompletedTodoItem(page, todoItemsCrud[1]);
        await asserter.verifyActiveTodoItem(page, todoItemsCrud[0]);
        await asserter.verifyActiveTodoCount(page, 1);
        await asserter.verifyTotalTodoCount(page, 2);
      });

    });

  });

  test.describe('Delete todos', () => {

      test.beforeEach(async ({ page }) => {
        await stepper.addTodoItem(page, todoItemsCrud[0]);
        await stepper.addTodoItem(page, todoItemsCrud[1]);
        await asserter.verifyTotalTodoCount(page, 2);
      });

      test('should delete a todo item', async ({ page }) => {
        await stepper.deleteTodoItem(page, todoItemsCrud[0]);
        await asserter.verifyTotalTodoCount(page, 1);
      });

      test('should delete completed todos by "Clear completed" button', async ({ page }) => {
        await stepper.toggleTodoItemCompletion(page, todoItemsCrud[0]);
        await stepper.toggleTodoItemCompletion(page, todoItemsCrud[1]);
        await stepper.deleteTodoItem(page, todoItemsCrud[0]);
        await asserter.verifyTotalTodoCount(page, 1);
        await asserter.verifyActiveTodoCount(page, 0);
      });

  });
});

