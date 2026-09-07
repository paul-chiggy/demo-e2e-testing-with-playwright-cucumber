import { test } from '@playwright/test';
import { Asserter } from '../../support/framework/asserter';
import { Actor } from '../../support/framework/actor';
import { todoItems } from '../../support/test-data';

let actor: Actor;
let asserter: Asserter;

test.describe('Todo CRUD operations', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    actor = new Actor(page);
    asserter = new Asserter(page);
    await actor.goTo();
  });

  test.describe('Add todos', () => {

    test('should add a new todo item', async () => {
      // Arrange
      await asserter.verifyEmptyTodoList();

      // Act
      await actor.addTodoItem(todoItems[0]);

      // Assert
      await asserter.verifyActiveTodoItem(todoItems[0]);
      await asserter.verifyActiveTodoCount(1);
      await asserter.verifyTotalTodoCount(1);
    });

  });

  test.describe('Update todos', () => {

    test.beforeEach(async () => {
      // Arrange
      await actor.addTodoItem(todoItems[0]);
    });

    test('should update an existing todo item', async () => {
      // Arrange
      await asserter.verifyActiveTodoItem(todoItems[0]);

      // Act
      await actor.updateTodoItem(todoItems[0], todoItems[1]);
      await asserter.verifyActiveTodoItem(todoItems[1]);
      await asserter.verifyActiveTodoCount(1);
      await asserter.verifyTotalTodoCount(1);
    });

  });

  test.describe('Complete & Revert completion of todos', () => {

    test.beforeEach(async () => {
      // Arrange
      await actor.addTodoItem(todoItems[0]);
      await actor.addTodoItem(todoItems[1]);
      await asserter.verifyActiveTodoItem(todoItems[0]);      
      await asserter.verifyActiveTodoItem(todoItems[1]);
    });

    test.describe('Complete todos', () => {

      test('should complete all todos at once', async () => {
        // Act
        await actor.toggleAllTodosCompletion();

        // Assert
        await asserter.verifyCompletedTodoItem(todoItems[0]);
        await asserter.verifyCompletedTodoItem(todoItems[1]);
        await asserter.verifyActiveTodoCount(0);
        await asserter.verifyTotalTodoCount(2);
      });

      test('should complete a todo item', async () => {
        // Act
        await actor.toggleTodoItemCompletion(todoItems[0]);

        // Assert
        await asserter.verifyCompletedTodoItem(todoItems[0]);
        await asserter.verifyActiveTodoItem(todoItems[1]);
        await asserter.verifyActiveTodoCount(1);
        await asserter.verifyTotalTodoCount(2);
      });

    });

    test.describe('Revert completion of todos', () => {

      test.beforeEach(async () => {
        // Arrange
        await actor.toggleAllTodosCompletion();
      });

      test('should revert completion of all todos', async () => {
        // Act
        await actor.toggleAllTodosCompletion();

        // Assert
        await asserter.verifyActiveTodoItem(todoItems[0]);
        await asserter.verifyActiveTodoItem(todoItems[1]);
        await asserter.verifyActiveTodoCount(2);
        await asserter.verifyTotalTodoCount(2);
      });

      test('should revert completion of a todo item', async () => {
        // Act
        await actor.toggleTodoItemCompletion(todoItems[0]);

        // Assert
        await asserter.verifyCompletedTodoItem(todoItems[1]);
        await asserter.verifyActiveTodoItem(todoItems[0]);
        await asserter.verifyActiveTodoCount(1);
        await asserter.verifyTotalTodoCount(2);
      });

    });

  });

  test.describe('Delete todos', () => {

      test.beforeEach(async () => {
        // Arrange
        await actor.addTodoItem(todoItems[0]);
        await actor.addTodoItem(todoItems[1]);
        await asserter.verifyTotalTodoCount(2);
      });

      test('should delete a todo item', async () => {
        // Act
        await actor.deleteTodoItem(todoItems[0]);

        // Assert
        await asserter.verifyTotalTodoCount(1);
      });

      test('should delete completed todos by "Clear completed" button', async () => {
        // Act
        await actor.toggleTodoItemCompletion(todoItems[0]);
        await actor.toggleTodoItemCompletion(todoItems[1]);
        await actor.deleteTodoItem(todoItems[0]);

        // Assert
        await asserter.verifyTotalTodoCount(1);
        await asserter.verifyActiveTodoCount(0);
      });

  });
});

