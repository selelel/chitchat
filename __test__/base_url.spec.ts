import { mock_values, pw_id } from '@/constants/pw_test_id'
import { test, expect } from '@playwright/test'

test.describe("LoginPage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await expect(page).toHaveTitle('ChitChat - Sign In to Connect')
  })

  test("should have metadata and elements", async({page}) => {
    for(const id of Object.values(pw_id.login)) await expect(page.getByTestId(id)).toBeVisible()
  })

  test("should log-in user", async({ page }) => {
    await page.getByTestId(pw_id.login.eml_inp).fill(mock_values.login_1.valid.eml)
    await page.getByTestId(pw_id.login.pass_inp).fill(mock_values.login_1.valid.pass)
    await page.getByTestId(pw_id.login.sub_btn).click()

    await page.waitForURL('http://localhost:3000');
    await expect(page).toHaveTitle('ChitChat')
  })

})

test.describe("HomePage", () => {
  test("should have correct title", async({page}) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle('ChitChat')
  })
})
