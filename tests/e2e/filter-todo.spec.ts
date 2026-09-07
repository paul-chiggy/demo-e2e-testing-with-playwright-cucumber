import { test } from '@playwright/test';
import { Asserter } from '../../support/framework/asserter';
import { Actor } from '../../support/framework/actor';
import { todoItems } from '../../support/test-data';

let actor: Actor;
let asserter: Asserter;

test.describe('Filter todos', () => {

  test.beforeEach(async ({ page }) => {
    actor = new Actor(page);
    asserter = new Asserter(page);

    // Arrange
    await actor.goTo();
    for(const item of todoItems) {
      await actor.addTodoItem(item);
    }
    await asserter.verifyActiveTodoCount(todoItems.length);
    await actor.toggleTodoItemCompletion(todoItems[0]);
  });

  test.describe('Filter completed todos', () => {

    test('should filter completed todos', async () => {
      // Act
      await actor.filterCompletedTodos();

      // Assert
      await asserter.verifyCompletedTodoItem(todoItems[0]);
      await asserter.verifyActiveTodoCount(3);
      await asserter.verifyTotalTodoCount(1);
    });

  });

  test.describe('Filter active todos', () => {

    test('should filter active todos', async () => {
      // Act
      await actor.filterActiveTodos();

      // Assert
      await asserter.verifyActiveTodoItem(todoItems[1]);
      await asserter.verifyActiveTodoItem(todoItems[2]);
      await asserter.verifyActiveTodoItem(todoItems[3]);
      await asserter.verifyActiveTodoCount(3);
      await asserter.verifyTotalTodoCount(3);
    });

  });

  test.describe('Filter all todos', () => {

    test.beforeEach(async () => {
      // Arrange
      await actor.filterActiveTodos();
    });

    test('should filter all todos', async () => {
      // Act
      await actor.filterAllTodos();

      // Assert
      await asserter.verifyCompletedTodoItem(todoItems[0]);
      await asserter.verifyActiveTodoItem(todoItems[1]);
      await asserter.verifyActiveTodoItem(todoItems[2]);
      await asserter.verifyActiveTodoItem(todoItems[3]);
      await asserter.verifyActiveTodoCount(3);
      await asserter.verifyTotalTodoCount(4);
    });

  });

});