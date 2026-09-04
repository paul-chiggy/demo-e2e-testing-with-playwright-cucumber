import { test } from '@playwright/test';
import { Asserter } from '../../support/framework/asserter';
import { Actor } from '../../support/framework/actor';
import { todoItemsFilter } from '../../support/test-data';

let actor: Actor;
let asserter: Asserter;

test.describe('Filter todos', () => {

  test.beforeEach(async ({ page }) => {
    actor = new Actor(page);
    asserter = new Asserter(page);

    // Arrange
    await actor.goTo();
    for(const item of todoItemsFilter) {
      await actor.addTodoItem(item);
    }
    await asserter.verifyActiveTodoCount(todoItemsFilter.length);
    await actor.toggleTodoItemCompletion(todoItemsFilter[0]);
  });

  test.describe('Filter completed todos', () => {

    test('should filter completed todos', async () => {
      // Act
      await actor.filterCompletedTodos();

      // Assert
      await asserter.verifyCompletedTodoItem(todoItemsFilter[0]);
      await asserter.verifyActiveTodoCount(3);
      await asserter.verifyTotalTodoCount(1);
    });

  });

  test.describe('Filter active todos', () => {

    test('should filter active todos', async () => {
      // Act
      await actor.filterActiveTodos();

      // Assert
      await asserter.verifyActiveTodoItem(todoItemsFilter[1]);
      await asserter.verifyActiveTodoItem(todoItemsFilter[2]);
      await asserter.verifyActiveTodoItem(todoItemsFilter[3]);
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
      await asserter.verifyCompletedTodoItem(todoItemsFilter[0]);
      await asserter.verifyActiveTodoItem(todoItemsFilter[1]);
      await asserter.verifyActiveTodoItem(todoItemsFilter[2]);
      await asserter.verifyActiveTodoItem(todoItemsFilter[3]);
      await asserter.verifyActiveTodoCount(3);
      await asserter.verifyTotalTodoCount(4);
    });

  });

});