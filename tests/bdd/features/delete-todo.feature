Feature: Delete todo item
  As a user
  I want to be able to delete a todo item
  So that I can keep track of my current tasks

  Background: User has todos with different statuses
    Given User has todos with different statuses

  Scenario: Delete an active todo item
    When User deletes an active todo item
    Then Deleted active todo item should not be present in the todo list

  Scenario: Delete a completed todo item
    When User deletes a completed todo item
    Then Deleted completed todo item should not be present in the todo list