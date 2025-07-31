Feature: Complete todo item
  As a user
  I want to be able to complete a todo item
  So that I can keep track of my active and completed tasks

  Background: User has an active todo item
    Given User has a todo item "Buy groceries"

  Scenario: Complete a todo item
    When User completes the todo item "Buy groceries"
    Then User should see the todo item "Buy groceries" marked as completed