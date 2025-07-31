Feature: Filter todo items
  As a user
  I want to be able to filter todo items
  So that I can easily find tasks based on their status

  Background: User has todos with different statuses
    Given User has todos with different statuses

  Scenario: Filter todo items by active status
    When User applies the Active status filter
    Then Only active todo items should be displayed

  Scenario: Filter todo items by completed status
    When User applies the Completed status filter
    Then Only completed todo items should be displayed

  Scenario: Filter todo items by all statuses
    When User applies the All statuses filter
    Then Todo items with all statuses should be displayed