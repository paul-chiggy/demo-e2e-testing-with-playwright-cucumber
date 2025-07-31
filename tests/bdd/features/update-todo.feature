Feature: Update todo item
  As a user
  I want to be able to update a todo item
  So that I can keep my todo list up to date

  Background: User has todos with different statuses
    Given User has todos with different statuses

  Scenario: Update an active todo item
    When User updates an active todo item to "Go for a walk"
    Then User should see the updated active todo item "Go for a walk" in the list

  Scenario: Update a completed todo item
    When User updates a completed todo item to "Go for a walk"
    Then User should see the updated completed todo item "Go for a walk" in the list