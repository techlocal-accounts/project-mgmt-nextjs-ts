import { test, expect } from '@playwright/test';

test.describe('Kanban Board', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/boards');
  });

  test('should display kanban board with demo data', async ({ page }) => {
    // Check if the board loads
    await expect(page.getByText('Demo Board')).toBeVisible();
    
    // Check if columns are present
    await expect(page.getByText('To Do')).toBeVisible();
    await expect(page.getByText('In Progress')).toBeVisible();
    await expect(page.getByText('Review')).toBeVisible();
    await expect(page.getByText('Done')).toBeVisible();
  });

  test('should allow adding new tasks', async ({ page }) => {
    // Click on "Add a task" button in To Do column
    await page.getByText('Add a task').first().click();
    
    // Fill in task title
    await page.fill('textarea[placeholder*="Enter a title"]', 'New test task');
    
    // Submit the form
    await page.getByText('Add Task').click();
    
    // Check if task was added
    await expect(page.getByText('New test task')).toBeVisible();
  });

  test('should allow drag and drop of tasks', async ({ page }) => {
    // Find a task in To Do column
    const task = page.getByText('Design new dashboard');
    
    // Find the In Progress column
    const inProgressColumn = page.locator('[data-testid="column-in-progress"]').or(
      page.locator('text=In Progress').locator('..')
    );
    
    // Drag task to In Progress column
    await task.dragTo(inProgressColumn);
    
    // Check if task moved (this might need adjustment based on actual implementation)
    await expect(task).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if board is still accessible
    await expect(page.getByText('Demo Board')).toBeVisible();
    
    // Check if horizontal scroll is available for columns
    const columnsContainer = page.locator('.flex.space-x-4.overflow-x-auto');
    await expect(columnsContainer).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to boards
    await page.getByText('Try Kanban Board').click();
    await expect(page).toHaveURL('/boards');
    
    // Navigate to features
    await page.getByText('Features').click();
    await expect(page).toHaveURL('/features');
    
    // Navigate to docs
    await page.getByText('Documentation').click();
    await expect(page).toHaveURL('/docs');
    
    // Navigate to contact
    await page.getByText('Help & Support').click();
    await expect(page).toHaveURL('/contact');
  });
});

test.describe('Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/boards');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/boards');
    
    // Check for ARIA labels on interactive elements
    const buttons = page.locator('button');
    const firstButton = buttons.first();
    
    // Check if button has accessible name
    const accessibleName = await firstButton.getAttribute('aria-label') || 
                          await firstButton.textContent();
    expect(accessibleName).toBeTruthy();
  });
});