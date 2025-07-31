Feature: Add todo item
  As a user
  I want to be able to add a todo item
  So that I can keep track of my tasks

  Rule: User can add any todo with a minimum of 2 characters
    Background: Users want to add new todos
      Given User is on the todo list page

    Scenario Outline: Add a new todo item
      When User enters the todo item <name> and presses Enter
      Then User should see the todo item <name> in the list

      Examples:
      | name          |
      | "12324235234" |
      | ".."          |
      | "`!"          |
      | "Test todo"   |